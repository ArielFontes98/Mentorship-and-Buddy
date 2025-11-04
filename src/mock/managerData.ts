import type { TeamMember, TeamSnapshot, ProgramParticipation, MobilityItem } from "../types";
import { rotationOpportunities } from "./rotationData";

// Extended team members for manager dashboard
export const teamMembers: TeamMember[] = [
  {
    id: "user_ariel_fontes",
    name: "Ariel Fontes",
    email: "ariel.fontes@nubank.com",
    function: "Program Manager",
    level: "IC6",
    bu: "Analytics Brazil",
    chapter: "Analytics (BA & DS)",
    country: "Brazil",
    managerId: "manager_henrique",
    skills: [
      { name: "SQL", currentLevel: 5, expectedLevel: 4 },
      { name: "Decision Making", currentLevel: 5, expectedLevel: 5 },
      { name: "Leadership", currentLevel: 4, expectedLevel: 5 },
      { name: "Experimentation", currentLevel: 4, expectedLevel: 4 },
      { name: "Communication", currentLevel: 5, expectedLevel: 5 },
    ],
    buddyStatus: "completed",
    mentorshipStatus: "active",
    rotationInterest: {
      declared: true,
      priority: "high",
      next12Months: true,
    },
    tenure: 68, // months
    startDate: "2020-03-15",
  },
  {
    id: "nj_lucas_moda",
    name: "Lucas Moda",
    email: "lucas.moda@nubank.com",
    function: "BA",
    level: "IC4",
    bu: "Lending Brazil",
    chapter: "Business Analytics",
    country: "Brazil",
    managerId: "manager_henrique",
    skills: [
      { name: "SQL", currentLevel: 3, expectedLevel: 4 },
      { name: "Decision Making", currentLevel: 2, expectedLevel: 3 },
      { name: "Experimentation", currentLevel: 3, expectedLevel: 3 },
      { name: "Communication", currentLevel: 3, expectedLevel: 3 },
      { name: "Storytelling", currentLevel: 2, expectedLevel: 3 },
    ],
    buddyStatus: "active",
    mentorshipStatus: "not_started",
    rotationInterest: {
      declared: false,
      priority: null,
      next12Months: false,
    },
    tenure: 0, // just joined
    startDate: "2025-11-18",
  },
  {
    id: "member_ana_silva",
    name: "Ana Silva",
    email: "ana.silva@nubank.com",
    function: "DS",
    level: "IC5",
    bu: "Analytics Brazil",
    chapter: "Data Science",
    country: "Brazil",
    managerId: "manager_henrique",
    skills: [
      { name: "Python", currentLevel: 5, expectedLevel: 5 },
      { name: "ML", currentLevel: 4, expectedLevel: 4 },
      { name: "SQL", currentLevel: 5, expectedLevel: 5 },
      { name: "Decision Making", currentLevel: 3, expectedLevel: 4 },
      { name: "Communication", currentLevel: 3, expectedLevel: 4 },
    ],
    buddyStatus: "completed",
    mentorshipStatus: "active",
    rotationInterest: {
      declared: true,
      priority: "medium",
      next12Months: true,
    },
    tenure: 24,
    startDate: "2023-11-01",
  },
  {
    id: "member_carlos_santos",
    name: "Carlos Santos",
    email: "carlos.santos@nubank.com",
    function: "BA",
    level: "IC4",
    bu: "Analytics Brazil",
    chapter: "Business Analytics",
    country: "Brazil",
    managerId: "manager_henrique",
    skills: [
      { name: "SQL", currentLevel: 4, expectedLevel: 4 },
      { name: "Decision Making", currentLevel: 2, expectedLevel: 3 },
      { name: "Experimentation", currentLevel: 3, expectedLevel: 3 },
      { name: "Communication", currentLevel: 4, expectedLevel: 3 },
      { name: "Product Thinking", currentLevel: 3, expectedLevel: 3 },
    ],
    buddyStatus: "active",
    mentorshipStatus: "planned",
    rotationInterest: {
      declared: false,
      priority: null,
      next12Months: false,
    },
    tenure: 12,
    startDate: "2024-11-01",
  },
];

// Manager ID (assume Henrique Lopes is the manager)
export const managerId = "manager_henrique";

// Calculate team snapshot
export function getTeamSnapshot(members: TeamMember[]): TeamSnapshot {
  const countries = Array.from(new Set(members.map((m) => m.country)));
  const chapters = Array.from(new Set(members.map((m) => m.chapter)));
  
  const activeBuddyCount = members.filter((m) => m.buddyStatus === "active").length;
  const activeMentorshipCount = members.filter((m) => m.mentorshipStatus === "active").length;
  const rotationInterestCount = members.filter(
    (m) => m.rotationInterest?.next12Months === true
  ).length;

  return {
    teamSize: members.length,
    countries,
    chapters,
    activeBuddyPercentage: members.length > 0 ? Math.round((activeBuddyCount / members.length) * 100) : 0,
    activeMentorshipPercentage: members.length > 0 ? Math.round((activeMentorshipCount / members.length) * 100) : 0,
    rotationInterestPercentage: members.length > 0 ? Math.round((rotationInterestCount / members.length) * 100) : 0,
  };
}

// Get program participation for all team members
export function getProgramParticipation(members: TeamMember[]): ProgramParticipation[] {
  return members.map((member) => {
    const alerts: string[] = [];
    
    // Check buddy progress (mock data)
    let buddyProgress = 0;
    if (member.buddyStatus === "active") {
      buddyProgress = member.id === "nj_lucas_moda" ? 40 : 60;
      if (member.id === "nj_lucas_moda") {
        alerts.push("Lucas is late on 2 Buddy missions");
      }
    } else if (member.buddyStatus === "completed") {
      buddyProgress = 100;
    }

    // Check mentorship progress (mock data)
    let mentorshipProgress = 0;
    if (member.mentorshipStatus === "active") {
      mentorshipProgress = member.id === "user_ariel_fontes" ? 80 : 50;
      if (member.id === "user_ariel_fontes") {
        alerts.push("Ariel is 80% through their Mentorship journey tasks");
      }
    } else if (member.mentorshipStatus === "completed") {
      mentorshipProgress = 100;
    }

    return {
      memberId: member.id,
      buddyStatus: member.buddyStatus || "not_assigned",
      buddyProgress,
      mentorshipStatus: member.mentorshipStatus || "not_started",
      mentorshipProgress,
      keyCourses: [
        { courseId: "course_analytics_intro", status: "completed", progress: 100 },
        { courseId: "course_decision_making", status: member.id === "user_ariel_fontes" ? "completed" : "in_progress", progress: member.id === "user_ariel_fontes" ? 100 : 60 },
      ],
      alerts,
    };
  });
}

// Get mobility items with top matches
export function getMobilityItems(
  members: TeamMember[],
  opportunities: typeof rotationOpportunities
): MobilityItem[] {
  return members
    .filter((m) => m.rotationInterest?.declared)
    .map((member) => {
      // Calculate readiness based on tenure
      let readiness: "ready_soon" | "exploring" | "early_days" = "early_days";
      if (member.tenure >= 24) {
        readiness = "ready_soon";
      } else if (member.tenure >= 12) {
        readiness = "exploring";
      }

      // Get top 3 matches (mock - would use actual matching engine)
      const topMatches = opportunities
        .slice(0, 3)
        .map((opp, idx) => ({
          opportunityId: opp.id,
          matchScore: 85 - idx * 5,
          title: opp.title,
          bu: opp.bu,
          chapter: opp.chapter,
        }));

      return {
        memberId: member.id,
        memberName: member.name,
        rotationInterest: member.rotationInterest
          ? {
              id: `interest_${member.id}`,
              userId: member.id,
              bu: member.bu,
              chapter: member.chapter,
              function: member.function,
              level: member.level,
              reason: "Career growth and exploration",
              priority: member.rotationInterest.priority || "medium",
              createdAt: new Date().toISOString(),
            }
          : null,
        topMatches,
        readiness,
      };
    });
}

