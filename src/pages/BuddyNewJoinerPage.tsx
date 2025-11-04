import { useState, useEffect } from "react";
import { newJoiners, buddies, buddyJourneyItems } from "../mock/buddyData";
import { suggestBuddiesForNewJoiner } from "../lib/buddyMatching";
import { ProfileCard } from "../components/ProfileCard";
import { JourneyTimeline } from "../components/JourneyTimeline";
import { MatchingExplanationCard } from "../components/MatchingExplanationCard";
import { FeedbackForm } from "../components/FeedbackForm";
import { useStore } from "../store/useStore";

export function BuddyNewJoinerPage() {
  const { completedItems } = useStore();
  const [newJoiner] = useState(newJoiners[0]); // Lucas Moda
  const [buddy] = useState(buddies.find((b) => b.id === newJoiner.buddyId));
  const [suggestions, setSuggestions] = useState<{ buddyId: string; score: number; explanation: string[] }[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  
  useEffect(() => {
    // Get buddy suggestions
    const suggs = suggestBuddiesForNewJoiner(newJoiner, buddies);
    setSuggestions(suggs);
  }, [newJoiner]);
  
  // Calculate journey completion percentage
  const requiredItems = buddyJourneyItems.filter(
    (item) => item.audience === "new_joiner" && item.required
  );
  const completedRequiredItems = requiredItems.filter((item) =>
    completedItems.includes(`${item.id}_${newJoiner.id}`)
  );
  const completionPercentage = requiredItems.length > 0
    ? Math.round((completedRequiredItems.length / requiredItems.length) * 100)
    : 0;
  
  // Show feedback form when 80%+ completed
  useEffect(() => {
    if (completionPercentage >= 80 && !showFeedback) {
      setShowFeedback(true);
    }
  }, [completionPercentage]);
  
  const newJoinerItems = buddyJourneyItems.filter(
    (item) => item.audience === "new_joiner" || item.owner === "new_joiner"
  );
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {newJoiner.name}!
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Meet your Buddy and your first 90 days
          </p>
          <p className="text-sm text-gray-500">
            This page guides your Buddy journey at Nubank
          </p>
        </div>
        
        {/* Journey Progress */}
        <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Your Journey Progress
              </h3>
              <p className="text-sm text-gray-600">
                {completedRequiredItems.length} of {requiredItems.length} required items completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">
                {completionPercentage}%
              </div>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-primary-600 rounded-full transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Your Buddy */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Buddy</h2>
          {buddy ? (
            <ProfileCard
              name={buddy.name}
              email={buddy.email}
              bu={buddy.bu}
              function={buddy.function}
              country={buddy.country}
              timeZone={buddy.timeZone}
              skills={buddy.skills}
              description="Your assigned Buddy who will support you during your onboarding journey."
            />
          ) : (
            <div className="card">
              <p className="text-gray-600">No buddy assigned yet.</p>
            </div>
          )}
        </div>
        
        {/* Buddy Allocation Explanation */}
        {suggestions.length > 0 && (
          <div className="mb-8">
            <MatchingExplanationCard
              title="Buddy Allocation Explanation"
              suggestions={suggestions.map((s) => ({
                id: s.buddyId,
                score: s.score,
                explanation: s.explanation,
              }))}
              selectedId={buddy?.id}
            />
          </div>
        )}
        
        {/* Your Journey (90 days) */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Journey (90 days)
          </h2>
          <JourneyTimeline
            items={newJoinerItems}
            userId={newJoiner.id}
            groupBy="week"
            showOwner={true}
          />
        </div>
        
        {/* Feedback Form */}
        {showFeedback && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Journey Feedback
            </h2>
            <FeedbackForm
              type="buddy_new_joiner"
              fromUserId={newJoiner.id}
              toUserId={buddy?.id}
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

