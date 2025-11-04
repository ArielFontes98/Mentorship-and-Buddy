import type { RotationOpportunity, RotationApplication, RotationInterest, ChapterChangeApplication, ChapterChangeStep } from "../types";

export const rotationOpportunities: RotationOpportunity[] = [
  {
    id: "rot_opp_1",
    bu: "Lending Brazil",
    chapter: "Data Science",
    function: "DS",
    level: "IC6",
    country: "Brazil",
    title: "Senior Data Scientist - Credit Analytics",
    description: "Lead credit analytics initiatives using advanced ML models. Work on decision-making under ambiguity and strategic data science projects.",
    requiredSkills: ["SQL", "Python", "Credit analytics", "Experiment design", "ML"],
    preferredSkills: ["Statistics", "A/B testing", "Strategic thinking"],
    managerEmail: "manager@nubank.com",
    postedDate: "2025-11-01",
    deadline: "2025-12-15",
    status: "open",
    slotsAvailable: 2,
  },
  {
    id: "rot_opp_2",
    bu: "Payments Brazil",
    chapter: "Business Analytics",
    function: "BA",
    level: "IC6",
    country: "Brazil",
    title: "Senior Business Analyst - Payments Growth",
    description: "Drive payments growth initiatives through data analysis, experimentation, and strategic insights.",
    requiredSkills: ["SQL", "Analytics", "Product thinking", "Stakeholder management"],
    preferredSkills: ["Experiment design", "Growth strategy"],
    managerEmail: "payments@nubank.com",
    postedDate: "2025-11-05",
    deadline: "2025-12-20",
    status: "open",
    slotsAvailable: 1,
  },
  {
    id: "rot_opp_3",
    bu: "Analytics Brazil",
    chapter: "Data Science",
    function: "DS",
    level: "IC7",
    country: "Brazil",
    title: "Principal Data Scientist - Strategic Analytics",
    description: "Lead strategic analytics initiatives across multiple BUs. Focus on decision governance and cross-BU analytics projects.",
    requiredSkills: ["SQL", "Python", "Strategic thinking", "Decision governance", "Leadership"],
    preferredSkills: ["ML", "Statistics", "Cross-BU collaboration"],
    managerEmail: "strategic@nubank.com",
    postedDate: "2025-10-20",
    deadline: "2025-12-10",
    status: "open",
    slotsAvailable: 1,
  },
  {
    id: "rot_opp_4",
    bu: "Lending Brazil",
    chapter: "Business Analytics",
    function: "BA",
    level: "IC5",
    country: "Brazil",
    title: "Business Analyst - Credit Strategy",
    description: "Support credit strategy through data analysis, experimentation, and business insights.",
    requiredSkills: ["SQL", "Analytics", "Credit knowledge"],
    preferredSkills: ["Experiment design", "Storytelling"],
    managerEmail: "credit@nubank.com",
    postedDate: "2025-11-10",
    deadline: "2025-12-30",
    status: "open",
    slotsAvailable: 3,
  },
];

export const rotationApplications: RotationApplication[] = [];

export const rotationInterests: RotationInterest[] = [];

// Chapter Change data
export const chapterChangeApplications: ChapterChangeApplication[] = [];

export const availableChapters = [
  { id: "ch_analytics_ba_ds", name: "Analytics (BA & DS)", bu: "Analytics Brazil" },
  { id: "ch_data_science", name: "Data Science", bu: "Analytics Brazil" },
  { id: "ch_business_analytics", name: "Business Analytics", bu: "Lending Brazil" },
  { id: "ch_product", name: "Product", bu: "Payments Brazil" },
];

export function getChapterChangeSteps(application: ChapterChangeApplication): ChapterChangeStep[] {
  const steps: ChapterChangeStep[] = [
    {
      stepNumber: 1,
      title: "Application Submitted",
      description: "Your chapter change application has been submitted and is under review.",
      status: application.status === "pending_review" ? "in_progress" : "completed",
      completedDate: application.appliedDate,
    },
    {
      stepNumber: 2,
      title: "Manager Interview",
      description: "Interview with the manager of the target chapter to assess fit and alignment.",
      status: 
        application.status === "manager_interview" ? "in_progress" :
        ["chapter_review", "approved", "onboarding"].includes(application.status) ? "completed" :
        application.status === "pending_review" ? "pending" : "completed",
      completedDate: application.managerInterviewDate,
      requiredActions: ["Schedule interview", "Prepare for interview", "Complete interview"],
    },
    {
      stepNumber: 3,
      title: "Chapter Review",
      description: "The chapter leadership reviews your application and makes a decision.",
      status:
        application.status === "chapter_review" ? "in_progress" :
        ["approved", "onboarding"].includes(application.status) ? "completed" :
        application.status === "rejected" ? "blocked" : "pending",
      completedDate: application.chapterDecisionDate,
    },
    {
      stepNumber: 4,
      title: "Approval & Onboarding",
      description: "Application approved. Start onboarding process with new chapter.",
      status:
        application.status === "onboarding" ? "in_progress" :
        application.status === "approved" ? "pending" : "pending",
      requiredActions: [
        "Complete onboarding trainings",
        "Meet new mentor",
        "Attend chapter welcome session",
        "Update access and tools",
      ],
    },
  ];
  
  return steps;
}

