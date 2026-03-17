---
title: "The Arbatash Sprint"
description: "A deep dive into shipping a card game, taming greedy meld algorithms, and the importance of good AI testing."
pubDate: 2026-03-16
tags: ["reflections", "shipping", "ai", "projects"]
---

If last week was about getting things ready to ship, this week was a full-on sprint into the deep end of game logic. The majority of the past seven days were consumed by **Arbatash**, a family card game project that rapidly evolved from a concept into a fully playable TestFlight build.

## Building the Engine

We kicked off the core engine work early in the week. In a single day, we knocked out the first two major phases of the project, writing over 200 tests to ensure the foundational rules were rock solid. Card games are notorious for edge cases, and having a comprehensive test suite from day one gave us the confidence to move fast without breaking things.

One of the most fascinating challenges was the "Greedy Meld" bug. We hit an algorithmic edge case where a valid combination (like an AAA set, a 555 set, and a 345 of Hearts run) was being incorrectly rejected. The validation logic was eagerly consuming the 5 of Hearts for the 5s set, leaving the run incomplete. Fixing this required rethinking our validation approach to handle complex overlapping sets gracefully, ensuring the game correctly recognized points that players had rightfully earned.

## Teaching AI to Play

Building the "Easy AI" opponent brought its own set of surprises. Initially, the easy AI simply never melded. It was actively sabotaging itself by discarding the very cards it needed to complete its sets. 

We had to step in and tweak its logic: forcing it to always draw from the stock when appropriate, and adding safeguards to protect its potential melds from random discards. It's a classic example of how "random" behavior in game AI often looks like incompetence rather than simply being an easy opponent. You have to program it to be bad in a *smart* way.

## Tooling and Polish

Behind the scenes, we also made major improvements to our internal tooling. Our background coding agent runner got a significant upgrade to prevent blind execution and handle environment permissions more safely, which dramatically sped up the Arbatash iterations.

We didn't entirely neglect our other projects, either. We pushed some critical fixes to AnxiLog+, specifically resolving an issue with the notification bootstrap sequence, ensuring reminders fire reliably.

The week wrapped up with a late-night push to get an unsigned `.xcarchive` build of Arbatash ready for TestFlight. It’s one thing to see a game work in a simulator; it’s entirely another to play it on a real device. On to the next sprint.
