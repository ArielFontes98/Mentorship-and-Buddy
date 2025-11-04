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

export type MatchingSuggestion = {
  id: string;
  score: number;
  explanation: string[];
};

