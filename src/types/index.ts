// Buddy module
export type NewJoiner = {
  id: string;
  name: string;
  email: string;
  bu: string;
  function: string;
  subfunction?: string;
  country: string;
  timeZone: string;
  startDate: string; // ISO
  skills: string[];
  interests: string[];
  journeyStatus: "not_started" | "in_progress" | "completed";
  buddyId?: string;
};

export type Buddy = {
  id: string;
  name: string;
  email: string;
  bu: string;
  function: string;
  country: string;
  timeZone: string;
  skills: string[];
  maxActiveNewJoiners: number;
  activeNewJoiners: number;
};

// Mentorship module
export type Mentee = {
  id: string;
  name: string;
  email: string;
  currentFunction: string;
  currentLevel: string;
  bu: string;
  chapter: string;
  country: string;
  timeZone: string;
  currentSkills: string[];
  ambitions: string[];
  targetFunction?: string;
  targetLevel?: string;
  targetChapter?: string;
  mentorshipStatus: "not_started" | "active" | "completed";
  mentorId?: string;
};

export type Mentor = {
  id: string;
  name: string;
  email: string;
  function: string;
  level: string;
  bu: string;
  chapter: string;
  country: string;
  timeZone: string;
  strengths: string[];
  maxMentees: number;
  activeMentees: number;
};

export type JourneyItem = {
  id: string;
  type: "training" | "mission" | "reflection" | "checkin";
  title: string;
  description: string;
  estimatedMinutes?: number;
  dueDay?: number; // for Buddy
  dueDate?: string; // for Mentorship
  audience: "new_joiner" | "buddy" | "mentee" | "mentor" | "both";
  owner: "new_joiner" | "buddy" | "mentee" | "mentor" | "both";
  required: boolean;
  relatedCourseId?: string;
  completedByIds: string[]; // user IDs who completed
};

export type Feedback = {
  id: string;
  type: "buddy_new_joiner" | "buddy_buddy" | "mentee" | "mentor";
  fromUserId: string;
  toUserId?: string;
  ratingOverall: number;
  ratingSupport?: number;
  ratingClarity?: number;
  comments: string;
};

export type ActionPlanItem = {
  id: string;
  mentorshipId: string;
  title: string;
  description: string;
  owner: "mentee" | "mentor" | "both";
  status: "open" | "in_progress" | "done";
};

// Courses module
export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[]; // Skills this course develops
  estimatedMinutes: number;
  level: "beginner" | "intermediate" | "advanced";
  format: "video" | "reading" | "interactive" | "workshop";
  thumbnail?: string;
};

export type OnboardingPath = {
  id: string;
  title: string;
  description: string;
  courses: string[]; // Course IDs in order
  estimatedTotalMinutes: number;
};

export type RotationSuggestion = {
  id: string;
  mentorshipId: string;
  suggestedBy: string; // mentor ID
  suggestedTo: string; // mentee ID
  destination: {
    bu: string;
    chapter: string;
    function: string;
    country: string;
  };
  reason: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
};

export type BuddyCourseAllocation = {
  id: string;
  buddyId: string;
  newJoinerId: string;
  courseId: string;
  allocatedAt: string;
  dueDate?: string;
  status: "pending" | "in_progress" | "completed";
};

export type MatchingSuggestion = {
  id: string;
  score: number;
  explanation: string[];
};

// Profile & History module
export type UserProfile = {
  id: string;
  name: string;
  email: string;
  currentFunction: string;
  currentLevel: string;
  currentBU: string;
  currentChapter: string;
  country: string;
  timeZone: string;
  startDate: string; // When they joined Nubank
  skills: string[];
  interests: string[];
  performanceHistory: PerformanceRecord[];
  buHistory: BUHistory[];
  chapterHistory: ChapterHistory[];
  completedCourses: string[]; // Course IDs
  mentorshipHistory: MentorshipHistory[];
};

export type PerformanceRecord = {
  id: string;
  period: string; // e.g., "2024 Q1", "2024 H1"
  rating: "exceeds" | "meets" | "below";
  feedback: string;
  goals: string[];
  achievements: string[];
};

export type BUHistory = {
  id: string;
  bu: string;
  function: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
};

export type ChapterHistory = {
  id: string;
  chapter: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
};

export type MentorshipHistory = {
  id: string;
  mentorId: string;
  mentorName: string;
  startDate: string;
  endDate?: string;
  status: "completed" | "active" | "cancelled";
  focusAreas: string[];
};

// Rotation module
export type RotationOpportunity = {
  id: string;
  bu: string;
  chapter: string;
  function: string;
  level: string;
  country: string;
  title: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  managerEmail?: string;
  postedDate: string;
  deadline?: string;
  status: "open" | "closed" | "filled";
  slotsAvailable: number;
};

export type RotationApplication = {
  id: string;
  opportunityId: string;
  userId: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "accepted" | "rejected";
  coverLetter?: string;
  matchScore?: number;
  matchExplanation?: string[];
};

export type RotationInterest = {
  id: string;
  userId: string;
  bu?: string;
  chapter?: string;
  function?: string;
  level?: string;
  reason: string;
  priority: "high" | "medium" | "low";
  createdAt: string;
};
