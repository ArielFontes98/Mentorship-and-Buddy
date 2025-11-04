import type { UserProfile } from "../types";

export const userProfile: UserProfile = {
  id: "user_ariel_fontes",
  name: "Ariel Fontes",
  email: "ariel.fontes@nubank.com",
  currentFunction: "Program Manager",
  currentLevel: "IC6",
  currentBU: "Analytics Brazil",
  currentChapter: "Analytics (BA & DS)",
  country: "Brazil",
  timeZone: "UTC-03:00",
  startDate: "2020-03-15",
  skills: [
    "Decision governance",
    "Analytics program management",
    "Hiring & onboarding",
    "Automation / AI workflows",
    "SQL",
    "Python",
    "Stakeholder management",
    "Strategic thinking",
  ],
  interests: [
    "Data-informed decision making",
    "DS/AE chapter exploration",
    "Senior IC / strategic leadership",
  ],
  performanceHistory: [
    {
      id: "perf_2024_q2",
      period: "2024 Q2",
      rating: "exceeds",
      feedback: "Strong performance in decision governance initiatives. Excellent leadership in cross-BU projects.",
      goals: [
        "Lead decision governance pilot across 2 BUs",
        "Improve analytics program efficiency by 20%",
      ],
      achievements: [
        "Successfully launched decision governance pilot",
        "Improved analytics program efficiency by 25%",
        "Mentored 3 new joiners",
      ],
    },
    {
      id: "perf_2024_q1",
      period: "2024 Q1",
      rating: "exceeds",
      feedback: "Outstanding work on automation initiatives. Great collaboration skills.",
      goals: [
        "Automate 3 manual processes",
        "Complete DS fundamentals course",
      ],
      achievements: [
        "Automated 4 manual processes",
        "Completed DS fundamentals course",
        "Contributed to chapter hiring process",
      ],
    },
    {
      id: "perf_2023_h2",
      period: "2023 H2",
      rating: "meets",
      feedback: "Solid performance. Good progress on analytics program management.",
      goals: [
        "Take ownership of analytics program",
        "Develop stakeholder management skills",
      ],
      achievements: [
        "Took ownership of analytics program",
        "Completed stakeholder management training",
      ],
    },
  ],
  buHistory: [
    {
      id: "bu_1",
      bu: "Analytics Brazil",
      function: "Program Manager",
      startDate: "2022-06-01",
      endDate: undefined,
      isCurrent: true,
    },
    {
      id: "bu_2",
      bu: "Lending Brazil",
      function: "Business Analyst",
      startDate: "2020-03-15",
      endDate: "2022-05-31",
      isCurrent: false,
    },
  ],
  chapterHistory: [
    {
      id: "ch_1",
      chapter: "Analytics (BA & DS)",
      startDate: "2022-06-01",
      endDate: undefined,
      isCurrent: true,
    },
    {
      id: "ch_2",
      chapter: "Business Analytics",
      startDate: "2020-03-15",
      endDate: "2022-05-31",
      isCurrent: false,
    },
  ],
  completedCourses: [
    "course_analytics_intro",
    "course_decision_making",
    "course_sql_fundamentals",
    "course_storytelling_data",
    "course_feedback_101",
  ],
  mentorshipHistory: [
    {
      id: "mh_1",
      mentorId: "mentor_henrique_lopes",
      mentorName: "Henrique Lopes",
      startDate: "2024-01-15",
      endDate: undefined,
      status: "active",
      focusAreas: [
        "Decision making under ambiguity",
        "Career navigation for DS/BA",
        "Scaling analytics orgs",
      ],
    },
    {
      id: "mh_2",
      mentorId: "mentor_emilio_gonzalez",
      mentorName: "Emilio Gonzalez",
      startDate: "2022-06-01",
      endDate: "2023-12-31",
      status: "completed",
      focusAreas: [
        "Analytics program management",
        "Leadership development",
      ],
    },
  ],
};

