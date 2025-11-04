import type { Mentee, Mentor } from "../types";

export function suggestMentorsForMentee(
  mentee: Mentee,
  mentors: Mentor[]
): {
  mentorId: string;
  score: number;
  explanation: string[];
}[] {
  const results: {
    mentorId: string;
    score: number;
    explanation: string[];
  }[] = [];

  for (const mentor of mentors) {
    // Filter out mentors who are at capacity
    if (mentor.activeMentees >= mentor.maxMentees) {
      continue;
    }

    let score = 0;
    const explanation: string[] = [];

    // Same/compatible chapter & function: up to +30
    if (mentor.chapter === mentee.chapter || mentee.targetChapter === mentor.chapter) {
      score += 30;
      explanation.push("Same/compatible chapter (+30)");
    } else if (mentor.chapter.includes(mentee.chapter) || mentee.chapter.includes(mentor.chapter)) {
      score += 20;
      explanation.push("Related chapter (+20)");
    }

    // Function compatibility
    if (mentor.function === mentee.currentFunction || mentor.function === mentee.targetFunction) {
      score += 15;
      explanation.push("Same/compatible function (+15)");
    }

    // Mentor >= 1 level above mentee, but not >3 levels: up to +20
    const menteeLevel = parseInt(mentee.currentLevel.replace(/[^0-9]/g, "")) || 0;
    const mentorLevel = parseInt(mentor.level.replace(/[^0-9]/g, "")) || 0;
    const levelDiff = mentorLevel - menteeLevel;
    
    if (levelDiff >= 1 && levelDiff <= 3) {
      score += 20;
      explanation.push(`Appropriate level gap: ${levelDiff} levels (+20)`);
    } else if (levelDiff > 3) {
      score += 10;
      explanation.push(`Large level gap: ${levelDiff} levels (+10)`);
    } else if (levelDiff === 0) {
      score += 5;
      explanation.push("Same level (+5)");
    }

    // Overlap between mentee ambitions and mentor strengths: up to +30
    const menteeAmbitionsLower = mentee.ambitions.map(a => a.toLowerCase());
    const mentorStrengthsLower = mentor.strengths.map(s => s.toLowerCase());
    
    let overlapCount = 0;
    for (const ambition of menteeAmbitionsLower) {
      for (const strength of mentorStrengthsLower) {
        if (ambition.includes(strength) || strength.includes(ambition)) {
          overlapCount++;
        }
      }
    }
    
    const ambitionScore = Math.min(30, overlapCount * 10);
    score += ambitionScore;
    if (ambitionScore > 0) {
      explanation.push(`Ambition-strength alignment: ${overlapCount} matches (+${ambitionScore})`);
    }

    // BU/country/timezone proximity: up to +20
    if (mentor.bu === mentee.bu) {
      score += 15;
      explanation.push("Same Business Unit (+15)");
    }
    
    if (mentor.country === mentee.country) {
      score += 5;
      explanation.push("Same country/timezone (+5)");
    }

    // Capacity bonus
    const freeSlots = mentor.maxMentees - mentor.activeMentees;
    if (freeSlots > 0) {
      score += Math.min(5, freeSlots * 2);
      explanation.push(`Available capacity: ${freeSlots} slots (+${Math.min(5, freeSlots * 2)})`);
    }

    results.push({
      mentorId: mentor.id,
      score,
      explanation,
    });
  }

  // Sort by score descending and return top 3
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function suggestRotationsForMentee(
  mentee: Mentee,
  destinations: {
    id: string;
    bu: string;
    chapter: string;
    function: string;
    country: string;
    requiredSkills: string[];
  }[]
): {
  destinationId: string;
  score: number;
  explanation: string[];
}[] {
  const results: {
    destinationId: string;
    score: number;
    explanation: string[];
  }[] = [];

  for (const destination of destinations) {
    let score = 0;
    const explanation: string[] = [];

    // Chapter/function alignment with ambitions
    if (mentee.targetChapter === destination.chapter) {
      score += 30;
      explanation.push("Matches target chapter (+30)");
    }
    
    if (mentee.targetFunction === destination.function) {
      score += 25;
      explanation.push("Matches target function (+25)");
    }

    // Current skills vs required skills
    const menteeSkillsLower = mentee.currentSkills.map(s => s.toLowerCase());
    const requiredSkillsLower = destination.requiredSkills.map(s => s.toLowerCase());
    
    const skillsIntersection = menteeSkillsLower.filter(s => 
      requiredSkillsLower.some(rs => s.includes(rs) || rs.includes(s))
    );
    
    const skillsScore = Math.min(30, (skillsIntersection.length / requiredSkillsLower.length) * 30);
    score += skillsScore;
    if (skillsScore > 0) {
      explanation.push(`Skills match: ${skillsIntersection.length}/${requiredSkillsLower.length} required skills (+${Math.round(skillsScore)})`);
    }

    // Ambition alignment
    const ambitionsText = mentee.ambitions.join(" ").toLowerCase();
    if (ambitionsText.includes(destination.chapter.toLowerCase()) || 
        ambitionsText.includes(destination.function.toLowerCase())) {
      score += 15;
      explanation.push("Aligns with mentee ambitions (+15)");
    }

    // Country preference
    if (destination.country === mentee.country) {
      score += 10;
      explanation.push("Same country (+10)");
    }

    results.push({
      destinationId: destination.id,
      score,
      explanation,
    });
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

