import type { Mentee, Mentor, ActionPlanItem, JourneyItem, RotationSuggestion } from "../types";

export const mentees: Mentee[] = [
  {
    id: "mentee_ariel_fontes",
    name: "Ariel Fontes",
    email: "ariel.fontes@nubank.com",
    currentFunction: "Program Manager",
    currentLevel: "IC6",
    bu: "Analytics Brazil",
    chapter: "Analytics (BA & DS)",
    country: "Brazil",
    timeZone: "UTC-03:00",
    currentSkills: [
      "Decision governance",
      "Analytics program management",
      "Hiring & onboarding",
      "Automation / AI workflows",
    ],
    ambitions: [
      "Strengthen data-informed decision making",
      "Explore rotation towards DS/AE chapter",
      "Grow as senior IC / strategic leader",
    ],
    targetFunction: "BA/DS hybrid",
    targetLevel: "IC7",
    targetChapter: "Analytics",
    mentorshipStatus: "active",
    mentorId: "mentor_henrique_lopes",
  },
];

export const mentors: Mentor[] = [
  {
    id: "mentor_henrique_lopes",
    name: "Henrique Lopes",
    email: "henrique.lopes@nubank.com",
    function: "DS",
    level: "M3",
    bu: "Analytics Brazil",
    chapter: "Data Science",
    country: "Brazil",
    timeZone: "UTC-03:00",
    strengths: [
      "Decision making under ambiguity",
      "Career navigation for DS/BA",
      "Scaling analytics orgs",
    ],
    maxMentees: 3,
    activeMentees: 1,
  },
  {
    id: "mentor_emilio_gonzalez",
    name: "Emilio Gonzalez",
    email: "emilio.gonzalez@nubank.com",
    function: "BA",
    level: "M3",
    bu: "Lending Brazil",
    chapter: "Business Analytics",
    country: "Brazil",
    timeZone: "UTC-03:00",
    strengths: [
      "Credit & collections strategy",
      "Leadership development",
      "Cross-country scaling",
    ],
    maxMentees: 2,
    activeMentees: 0,
  },
];

// Example mentorship journey items for Ariel + Henrique
export const mentorshipJourneyItems: JourneyItem[] = [
  {
    id: "mj_1",
    type: "checkin",
    title: "Kick-off: define mentorship goals",
    description: "Align on ambitions, focus areas, and expectations for the mentorship cycle.",
    dueDate: "2025-11-20",
    audience: "both",
    owner: "both",
    required: true,
    completedByIds: [],
  },
  {
    id: "mj_2",
    type: "training",
    title: "Course: Data-Informed Decision Making",
    description: "Complete the core module on frameworks and ambiguity handling.",
    estimatedMinutes: 90,
    dueDate: "2025-12-01",
    audience: "mentee",
    owner: "mentee",
    required: true,
    relatedCourseId: "course_decision_making",
    completedByIds: [],
  },
  {
    id: "mj_3",
    type: "mission",
    title: "Prepare and present one decision memo",
    description: "Structure and present a high-impact decision memo to your BU leadership.",
    estimatedMinutes: 180,
    dueDate: "2025-12-15",
    audience: "both",
    owner: "mentee",
    required: true,
    completedByIds: [],
  },
  {
    id: "mj_4",
    type: "checkin",
    title: "Monthly 1:1 check-in",
    description: "Monthly alignment session to review progress and adjust goals if needed.",
    dueDate: "2025-12-20",
    audience: "both",
    owner: "both",
    required: true,
    completedByIds: [],
  },
];

export const actionPlanItems: ActionPlanItem[] = [
  {
    id: "ap_1",
    mentorshipId: "mentorship_ariel_henrique",
    title: "Own a cross-BU decision governance pilot",
    description: "Lead one pilot that connects decision governance across at least 2 BUs.",
    owner: "mentee",
    status: "open",
  },
  {
    id: "ap_2",
    mentorshipId: "mentorship_ariel_henrique",
    title: "Shadow DS/AE cross-chapter forum",
    description: "Join and later co-lead one DS/AE forum to explore rotation possibilities.",
    owner: "both",
    status: "open",
  },
  {
    id: "ap_3",
    mentorshipId: "mentorship_ariel_henrique",
    title: "Lead a small analytics initiative in BU X",
    description: "Take ownership of a small analytics initiative to demonstrate strategic thinking.",
    owner: "mentee",
    status: "in_progress",
  },
  {
    id: "ap_4",
    mentorshipId: "mentorship_ariel_henrique",
    title: "Present outcomes in chapter meeting",
    description: "Share the results of your initiative in the next chapter meeting.",
    owner: "mentee",
    status: "open",
  },
];

// Rotation suggestions data
export const rotationDestinations = [
  {
    id: "rot_ds_credit_analytics",
    bu: "Lending Brazil",
    chapter: "Data Science",
    function: "DS",
    country: "Brazil",
    requiredSkills: ["SQL", "Python", "Credit analytics", "Experiment design"],
  },
  {
    id: "rot_ba_payments",
    bu: "Payments Brazil",
    chapter: "Business Analytics",
    function: "BA",
    country: "Brazil",
    requiredSkills: ["SQL", "Analytics", "Product thinking", "Stakeholder management"],
  },
];

export const rotationSuggestions: RotationSuggestion[] = [];
