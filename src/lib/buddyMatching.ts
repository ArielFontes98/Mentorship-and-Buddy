import type { NewJoiner, Buddy } from "../types";

export function suggestBuddiesForNewJoiner(
  newJoiner: NewJoiner,
  buddies: Buddy[]
): {
  buddyId: string;
  score: number;
  explanation: string[];
}[] {
  const results: {
    buddyId: string;
    score: number;
    explanation: string[];
  }[] = [];

  for (const buddy of buddies) {
    // Filter out buddies who are at capacity
    if (buddy.activeNewJoiners >= buddy.maxActiveNewJoiners) {
      continue;
    }

    let score = 0;
    const explanation: string[] = [];

    // Same BU: +30
    if (buddy.bu === newJoiner.bu) {
      score += 30;
      explanation.push("Same Business Unit (+30)");
    }

    // Same function: +25
    if (buddy.function === newJoiner.function) {
      score += 25;
      explanation.push("Same function (" + buddy.function + ") (+25)");
    }

    // Skills overlap (Jaccard similarity): up to +25
    const newJoinerSkillsSet = new Set(newJoiner.skills.map(s => s.toLowerCase()));
    const buddySkillsSet = new Set(buddy.skills.map(s => s.toLowerCase()));
    
    const intersection = new Set(
      [...newJoinerSkillsSet].filter(s => buddySkillsSet.has(s))
    );
    const union = new Set([...newJoinerSkillsSet, ...buddySkillsSet]);
    
    const jaccardSimilarity = union.size > 0 ? intersection.size / union.size : 0;
    const skillsScore = Math.round(jaccardSimilarity * 25);
    score += skillsScore;
    if (skillsScore > 0) {
      explanation.push(`Skills overlap: ${intersection.size} common skills (+${skillsScore})`);
    }

    // Same country/timeZone (±3h): +10
    if (buddy.country === newJoiner.country) {
      score += 10;
      explanation.push("Same country/timezone (+10)");
    } else {
      // Check timezone difference (simple approximation)
      const newJoinerTZ = parseInt(newJoiner.timeZone.replace("UTC", "").trim());
      const buddyTZ = parseInt(buddy.timeZone.replace("UTC", "").trim());
      const tzDiff = Math.abs(newJoinerTZ - buddyTZ);
      if (tzDiff <= 3) {
        score += 10;
        explanation.push("Compatible timezone (±3h) (+10)");
      }
    }

    // Capacity (more free slots = better): up to +10
    const freeSlots = buddy.maxActiveNewJoiners - buddy.activeNewJoiners;
    const capacityScore = Math.min(10, freeSlots * 5);
    score += capacityScore;
    if (capacityScore > 0) {
      explanation.push(`Available capacity: ${freeSlots} slots (+${capacityScore})`);
    }

    results.push({
      buddyId: buddy.id,
      score,
      explanation,
    });
  }

  // Sort by score descending and return top 3
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

