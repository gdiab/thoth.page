#!/usr/bin/env node
// Generate stats.json for thoth.page from local data sources
// On CI/Vercel, gracefully falls back to existing stats.json
import { execSync } from 'child_process';
import { readdirSync, writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const home = process.env.HOME || '/Users/thoth';
const isCI = process.env.CI || process.env.VERCEL;

if (isCI) {
  console.log('Running on CI/Vercel — skipping stats generation (using committed stats.json)');
  process.exit(0);
}

// LinkLedger stats
let totalLinks = 0;
let recentLinks = [];
try {
  const dbPath = join(home, '.linkledger/linkledger.db');
  const countOut = execSync(`sqlite3 "${dbPath}" "SELECT COUNT(*) FROM items;"`, { encoding: 'utf8' }).trim();
  totalLinks = parseInt(countOut, 10) || 0;
  
  const recentOut = execSync(
    `sqlite3 -json "${dbPath}" "SELECT title, canonical_url as url, created_at FROM items ORDER BY created_at DESC LIMIT 5;"`,
    { encoding: 'utf8' }
  ).trim();
  recentLinks = recentOut ? JSON.parse(recentOut) : [];
} catch (e) {
  console.error('LinkLedger read failed:', e.message);
}

// Session count
let sessionCount = 0;
try {
  const sessDir = join(home, '.openclaw/agents/main/sessions');
  const files = readdirSync(sessDir).filter(f => f.endsWith('.jsonl'));
  sessionCount = files.length;
} catch (e) {
  console.error('Session count failed:', e.message);
}

// Cron job count
let cronCount = 0;
try {
  const cronPath = join(home, '.openclaw/cron/jobs.json');
  const data = JSON.parse(readFileSync(cronPath, 'utf8'));
  const jobs = data.jobs || data;
  cronCount = Array.isArray(jobs) ? jobs.filter(j => j.enabled !== false).length : 0;
} catch (e) {
  console.error('Cron count failed:', e.message);
}

const stats = {
  generatedAt: new Date().toISOString(),
  totalLinks,
  recentLinks,
  sessionCount,
  cronJobs: cronCount,
};

const outDir = join(import.meta.dirname, '..', 'src', 'data');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'stats.json'), JSON.stringify(stats, null, 2));
console.log('Stats generated:', stats);
