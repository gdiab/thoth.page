#!/usr/bin/env node
/**
 * generate-stats.js
 * Generates src/data/stats.json with live stats from various sources
 * Run before build to get fresh data
 */

import { readFile, readdir, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Database from 'better-sqlite3';
import { homedir } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const homeDir = homedir();

async function getStats() {
  const stats = {
    generatedAt: new Date().toISOString(),
    linkledger: {
      totalLinks: 0,
      recentLinks: []
    },
    sessions: {
      totalSessions: 0
    },
    cron: {
      totalJobs: 0
    }
  };

  // LinkLedger stats
  try {
    const dbPath = join(homeDir, '.linkledger', 'linkledger.db');
    const db = new Database(dbPath, { readonly: true });
    
    // Get total count
    const countResult = db.prepare('SELECT COUNT(*) as total FROM items').get();
    stats.linkledger.totalLinks = countResult.total;
    
    // Get recent links with tags
    const recentItems = db.prepare(`
      SELECT id, canonical_url, title, created_at
      FROM items
      ORDER BY created_at DESC
      LIMIT 5
    `).all();
    
    // Get tags for each item
    stats.linkledger.recentLinks = recentItems.map(item => {
      const tags = db.prepare(`
        SELECT DISTINCT tag FROM tags WHERE item_id = ?
      `).all(item.id).map(t => t.tag);
      
      return {
        title: item.title || 'Untitled',
        url: item.canonical_url,
        tags: tags,
        savedAt: item.created_at
      };
    });
    
    db.close();
  } catch (err) {
    console.error('Error reading LinkLedger DB:', err.message);
  }

  // Session count
  try {
    const sessionsDir = join(homeDir, '.openclaw', 'agents', 'main', 'sessions');
    const files = await readdir(sessionsDir);
    stats.sessions.totalSessions = files.length;
  } catch (err) {
    console.error('Error counting sessions:', err.message);
  }

  // Cron jobs count
  try {
    const cronPath = join(homeDir, '.openclaw', 'cron', 'jobs.json');
    const cronData = JSON.parse(await readFile(cronPath, 'utf-8'));
    // Handle nested structure: {jobs: [...]} or flat array
    const jobs = cronData.jobs || cronData;
    stats.cron.totalJobs = Array.isArray(jobs) ? jobs.filter(j => j.enabled !== false).length : 0;
  } catch (err) {
    console.error('Error reading cron jobs:', err.message);
  }

  return stats;
}

async function main() {
  console.log('Generating stats...');
  const stats = await getStats();
  
  const outputPath = join(projectRoot, 'src', 'data', 'stats.json');
  await writeFile(outputPath, JSON.stringify(stats, null, 2));
  
  console.log(`✓ Stats written to ${outputPath}`);
  console.log(`  - ${stats.linkledger.totalLinks} links in LinkLedger`);
  console.log(`  - ${stats.sessions.totalSessions} session files`);
  console.log(`  - ${stats.cron.totalJobs} cron jobs`);
}

main().catch(err => {
  console.error('Failed to generate stats:', err);
  process.exit(1);
});
