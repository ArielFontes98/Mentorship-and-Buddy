import type { TalentMetrics, MobilityOverview, SkillsGap } from "../types";

export const talentMetrics: TalentMetrics = {
  internalFillRate: 72, // %
  avgTimeToFill: 18, // days
  activeBuddyPercentage: 68,
  activeMentorshipPercentage: 45,
  rotationRate: 28, // % with at least 1 rotation in last 12 months
  buddyNPS: 65,
  mentorshipNPS: 72,
};

export const mobilityOverview: MobilityOverview = {
  byBU: [
    {
      bu: "Analytics Brazil",
      demand: 8,
      applicants: 12,
      balance: "high_applicants",
    },
    {
      bu: "Lending Brazil",
      demand: 15,
      applicants: 8,
      balance: "high_demand",
    },
    {
      bu: "Payments Brazil",
      demand: 5,
      applicants: 6,
      balance: "balanced",
    },
  ],
  byChapter: [
    {
      chapter: "Data Science",
      demand: 10,
      applicants: 15,
      balance: "high_applicants",
    },
    {
      chapter: "Business Analytics",
      demand: 18,
      applicants: 10,
      balance: "high_demand",
    },
    {
      chapter: "Analytics (BA & DS)",
      demand: 5,
      applicants: 5,
      balance: "balanced",
    },
  ],
};

export const skillsGaps: SkillsGap[] = [
  {
    skill: "Advanced BA Skills",
    chapter: "Business Analytics",
    country: "Brazil",
    currentLevel: 3.2,
    expectedLevel: 4.0,
    gap: 0.8,
    affectedMembers: 5,
  },
  {
    skill: "Decision Making",
    chapter: "Analytics (BA & DS)",
    country: "Brazil",
    currentLevel: 3.5,
    expectedLevel: 4.2,
    gap: 0.7,
    affectedMembers: 3,
  },
  {
    skill: "DS/ML Skills",
    chapter: "Data Science",
    country: "Brazil",
    currentLevel: 4.5,
    expectedLevel: 4.0,
    gap: -0.5, // Surplus
    affectedMembers: 12,
  },
  {
    skill: "Leadership",
    chapter: "Analytics (BA & DS)",
    country: "Brazil",
    currentLevel: 3.0,
    expectedLevel: 4.0,
    gap: 1.0,
    affectedMembers: 4,
  },
];

