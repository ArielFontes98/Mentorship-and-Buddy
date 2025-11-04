import { useState, useEffect } from "react";
import { mentees, mentors, mentorshipJourneyItems, actionPlanItems, rotationDestinations } from "../mock/mentorshipData";
import { suggestMentorsForMentee, suggestRotationsForMentee } from "../lib/mentorshipMatching";
import { ProfileCard } from "../components/ProfileCard";
import { JourneyTimeline } from "../components/JourneyTimeline";
import { ActionPlanTable } from "../components/ActionPlanTable";
import { MatchingExplanationCard } from "../components/MatchingExplanationCard";
import { FeedbackForm } from "../components/FeedbackForm";
import { useStore } from "../store/useStore";
import { Target, Calendar, TrendingUp } from "lucide-react";

export function MentorshipMenteePage() {
  const { completedItems, actionPlanItems: storeActionPlanItems } = useStore();
  const [mentee] = useState(mentees[0]); // Ariel Fontes
  const [mentor] = useState(
    mentors.find((m) => m.id === mentee.mentorId)
  );
  const [mentorSuggestions, setMentorSuggestions] = useState<
    { mentorId: string; score: number; explanation: string[] }[]
  >([]);
  const [rotationSuggestions, setRotationSuggestions] = useState<
    { destinationId: string; score: number; explanation: string[] }[]
  >([]);
  const [goals, setGoals] = useState<string[]>(mentee.ambitions);
  const [newGoal, setNewGoal] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Merge store action plan items with mock data
  const allActionPlanItems = [
    ...actionPlanItems.filter((item) => item.mentorshipId === "mentorship_ariel_henrique"),
    ...storeActionPlanItems.filter((item) => item.mentorshipId === "mentorship_ariel_henrique"),
  ];
  
  useEffect(() => {
    // Get mentor suggestions if no mentor assigned
    if (!mentee.mentorId) {
      const suggs = suggestMentorsForMentee(mentee, mentors);
      setMentorSuggestions(suggs);
    }
    
    // Get rotation suggestions
    const rotSuggs = suggestRotationsForMentee(mentee, rotationDestinations);
    setRotationSuggestions(rotSuggs);
  }, [mentee]);
  
  // Calculate journey completion
  const requiredItems = mentorshipJourneyItems.filter((item) => item.required);
  const completedRequiredItems = requiredItems.filter((item) =>
    completedItems.includes(`${item.id}_${mentee.id}`)
  );
  const completionPercentage = requiredItems.length > 0
    ? Math.round((completedRequiredItems.length / requiredItems.length) * 100)
    : 0;
  
  // Show feedback when mentorship is completed
  useEffect(() => {
    if (mentee.mentorshipStatus === "completed" && !showFeedback) {
      setShowFeedback(true);
    }
  }, [mentee.mentorshipStatus]);
  
  const menteeItems = mentorshipJourneyItems.filter(
    (item) => item.audience === "mentee" || item.owner === "mentee" || item.owner === "both"
  );
  
  const handleAddGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, newGoal.trim()]);
      setNewGoal("");
    }
  };
  
  const handleRemoveGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };
  
  const getStatusLabel = () => {
    switch (mentee.mentorshipStatus) {
      case "not_started":
        return { label: "Planned", color: "bg-gray-100 text-gray-700" };
      case "active":
        return { label: "Active", color: "bg-green-100 text-green-700" };
      case "completed":
        return { label: "Completed", color: "bg-blue-100 text-blue-700" };
      default:
        return { label: "Unknown", color: "bg-gray-100 text-gray-700" };
    }
  };
  
  const status = getStatusLabel();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {mentee.name}!
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Your Mentorship Journey
          </p>
          <p className="text-sm text-gray-500">
            Grow your career with structured mentorship support
          </p>
        </div>
        
        {/* Mentorship Snapshot */}
        <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Mentorship Snapshot
              </h3>
              <div className="flex items-center gap-3 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                  {status.label}
                </span>
                {mentor && (
                  <span className="text-sm text-gray-600">
                    Mentor: <span className="font-medium">{mentor.name}</span>
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">
                {completionPercentage}%
              </div>
              <div className="text-sm text-gray-600">Journey Progress</div>
            </div>
          </div>
          {mentor && (
            <div className="mt-4 pt-4 border-t border-primary-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Cycle: {mentee.mentorshipStatus === "active" ? "Active" : "Not started"}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Current Mentor */}
        {mentor ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Mentor</h2>
            <ProfileCard
              name={mentor.name}
              email={mentor.email}
              bu={mentor.bu}
              function={mentor.function}
              country={mentor.country}
              timeZone={mentor.timeZone}
              skills={mentor.strengths}
              description="Your assigned mentor who will guide you through your career development journey."
            />
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Mentor Suggestions</h2>
            {mentorSuggestions.length > 0 ? (
              <MatchingExplanationCard
                title="Suggested Mentors"
                suggestions={mentorSuggestions.map((s) => ({
                  id: s.mentorId,
                  score: s.score,
                  explanation: s.explanation,
                }))}
              />
            ) : (
              <div className="card">
                <p className="text-gray-600">No mentor suggestions available.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Your Goals & Ambitions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">Your Goals & Ambitions</h2>
            <Target className="w-6 h-6 text-primary-600" />
          </div>
          <div className="card">
            <div className="space-y-3 mb-4">
              {goals.map((goal, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <p className="text-sm text-gray-700 flex-1">{goal}</p>
                  <button
                    onClick={() => handleRemoveGoal(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddGoal()}
                placeholder="Add a new goal..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button onClick={handleAddGoal} className="btn-primary">
                Add Goal
              </button>
            </div>
          </div>
        </div>
        
        {/* Your Mentorship Journey */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Mentorship Journey
          </h2>
          <JourneyTimeline
            items={menteeItems}
            userId={mentee.id}
            groupBy="month"
            showOwner={true}
          />
        </div>
        
        {/* Action Plan */}
        <div className="mb-8">
          <ActionPlanTable
            items={allActionPlanItems}
            mentorshipId="mentorship_ariel_henrique"
            canEdit={false}
          />
        </div>
        
        {/* Rotation & Next Steps Suggestions */}
        {rotationSuggestions.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Rotation & Next Steps Suggestions
              </h2>
            </div>
            <MatchingExplanationCard
              title="Suggested Rotations"
              suggestions={rotationSuggestions.map((s) => ({
                id: s.destinationId,
                score: s.score,
                explanation: s.explanation,
              }))}
            />
          </div>
        )}
        
        {/* Feedback Form */}
        {showFeedback && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              End-of-Cycle Feedback
            </h2>
            <FeedbackForm
              type="mentee"
              fromUserId={mentee.id}
              toUserId={mentor?.id}
              onSubmit={() => {
                alert("Thank you for your feedback!");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

