import type { UserProfile, RotationOpportunity } from "../types";

export function calculateRotationMatch(
  userProfile: UserProfile,
  opportunity: RotationOpportunity
): {
  score: number;
  explanation: string[];
} {
  let score = 0;
  const explanation: string[] = [];

  // Skills match (required skills)
  const userSkillsLower = userProfile.skills.map((s) => s.toLowerCase());
  const requiredSkillsLower = opportunity.requiredSkills.map((s) => s.toLowerCase());
  
  const requiredSkillsMatch = requiredSkillsLower.filter((skill) =>
    userSkillsLower.some((userSkill) => 
      userSkill.includes(skill) || skill.includes(userSkill)
    )
  );
  
  const requiredMatchScore = (requiredSkillsMatch.length / requiredSkillsLower.length) * 40;
  score += requiredMatchScore;
  explanation.push(
    `Required skills match: ${requiredSkillsMatch.length}/${requiredSkillsLower.length} (${Math.round(requiredMatchScore)}/40)`
  );

  // Preferred skills match
  const preferredSkillsLower = opportunity.preferredSkills.map((s) => s.toLowerCase());
  const preferredSkillsMatch = preferredSkillsLower.filter((skill) =>
    userSkillsLower.some((userSkill) => 
      userSkill.includes(skill) || skill.includes(userSkill)
    )
  );
  
  const preferredMatchScore = (preferredSkillsMatch.length / preferredSkillsLower.length) * 20;
  score += preferredMatchScore;
  if (preferredSkillsMatch.length > 0) {
    explanation.push(
      `Preferred skills match: ${preferredSkillsMatch.length}/${preferredSkillsLower.length} (+${Math.round(preferredMatchScore)})`
    );
  }

  // Level match
  const userLevel = parseInt(userProfile.currentLevel.replace(/[^0-9]/g, "")) || 0;
  const oppLevel = parseInt(opportunity.level.replace(/[^0-9]/g, "")) || 0;
  const levelDiff = Math.abs(userLevel - oppLevel);
  
  if (levelDiff === 0) {
    score += 15;
    explanation.push("Exact level match (+15)");
  } else if (levelDiff === 1) {
    score += 10;
    explanation.push(`Level close match: ${levelDiff} level difference (+10)`);
  } else if (levelDiff <= 2) {
    score += 5;
    explanation.push(`Level acceptable match: ${levelDiff} level difference (+5)`);
  }

  // Function match
  if (userProfile.currentFunction === opportunity.function || 
      userProfile.interests.some(i => i.toLowerCase().includes(opportunity.function.toLowerCase()))) {
    score += 10;
    explanation.push(`Function match or interest (+10)`);
  }

  // BU/Chapter match with history
  const hasBuHistory = userProfile.buHistory.some(
    (bu) => bu.bu === opportunity.bu
  );
  const hasChapterHistory = userProfile.chapterHistory.some(
    (ch) => ch.chapter === opportunity.chapter
  );
  
  if (hasBuHistory) {
    score += 10;
    explanation.push("Previous experience in this BU (+10)");
  }
  
  if (hasChapterHistory) {
    score += 5;
    explanation.push("Previous experience in this chapter (+5)");
  }

  // Country match
  if (userProfile.country === opportunity.country) {
    score += 5;
    explanation.push("Same country (+5)");
  }

  // Interests alignment
  const interestsText = userProfile.interests.join(" ").toLowerCase();
  const oppDescription = opportunity.description.toLowerCase();
  
  if (interestsText.includes(oppDescription.substring(0, 20)) || 
      oppDescription.includes(interestsText.substring(0, 20))) {
    score += 10;
    explanation.push("Interests align with opportunity (+10)");
  }

  return {
    score: Math.round(score),
    explanation,
  };
}

export function getRotationMatches(
  userProfile: UserProfile,
  opportunities: RotationOpportunity[]
): Array<{
  opportunity: RotationOpportunity;
  match: {
    score: number;
    explanation: string[];
  };
}> {
  const matches = opportunities
    .filter((opp) => opp.status === "open")
    .map((opportunity) => ({
      opportunity,
      match: calculateRotationMatch(userProfile, opportunity),
    }))
    .sort((a, b) => b.match.score - a.match.score);

  return matches;
}

