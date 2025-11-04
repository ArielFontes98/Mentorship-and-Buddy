import { useState } from "react";
import { newJoiners, buddies, buddyJourneyItems } from "../mock/buddyData";
import { ProfileCard } from "../components/ProfileCard";
import { JourneyTimeline } from "../components/JourneyTimeline";
import { FeedbackForm } from "../components/FeedbackForm";
import { useStore } from "../store/useStore";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export function BuddyBuddyPage() {
  const { completedItems } = useStore();
  const [buddy] = useState(buddies[0]); // Thiago Fontes
  const [assignedNewJoiners] = useState(
    newJoiners.filter((nj) => nj.buddyId === buddy.id)
  );
  const [selectedNewJoiner, setSelectedNewJoiner] = useState(assignedNewJoiners[0]);
  
  // Get items for the selected new joiner
  const newJoinerItems = selectedNewJoiner
    ? buddyJourneyItems.filter(
        (item) =>
          item.audience === "new_joiner" || item.owner === "new_joiner"
      )
    : [];
  
  // Get items for the buddy
  const buddyItems = buddyJourneyItems.filter(
    (item) => item.audience === "buddy" || item.owner === "buddy"
  );
  
  // Calculate journey progress for selected new joiner
  const getJourneyProgress = (newJoinerId: string) => {
    const requiredItems = buddyJourneyItems.filter(
      (item) => item.audience === "new_joiner" && item.required
    );
    const completedRequiredItems = requiredItems.filter((item) =>
      completedItems.includes(`${item.id}_${newJoinerId}`)
    );
    return requiredItems.length > 0
      ? Math.round((completedRequiredItems.length / requiredItems.length) * 100)
      : 0;
  };
  
  const getStatusPill = (newJoinerId: string) => {
    const progress = getJourneyProgress(newJoinerId);
    if (progress === 0) {
      return {
        label: "Not started",
        color: "bg-gray-100 text-gray-700",
        icon: AlertCircle,
      };
    } else if (progress >= 80) {
      return {
        label: "On track",
        color: "bg-green-100 text-green-700",
        icon: CheckCircle2,
      };
    } else {
      return {
        label: "At risk",
        color: "bg-yellow-100 text-yellow-700",
        icon: Clock,
      };
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Buddy Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Welcome, {buddy.name}!
          </p>
          <p className="text-sm text-gray-500">
            Support your new joiners through their onboarding journey
          </p>
        </div>
        
        {/* Capacity Card */}
        <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Your Capacity
              </h3>
              <p className="text-sm text-gray-600">
                {buddy.activeNewJoiners} of {buddy.maxActiveNewJoiners} slots active
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">
                {buddy.maxActiveNewJoiners - buddy.activeNewJoiners}
              </div>
              <div className="text-sm text-gray-600">Available slots</div>
            </div>
          </div>
        </div>
        
        {/* Your New Joiners */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your New Joiners
          </h2>
          {assignedNewJoiners.length === 0 ? (
            <div className="card">
              <p className="text-gray-600">No new joiners assigned yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedNewJoiners.map((newJoiner) => {
                const status = getStatusPill(newJoiner.id);
                const StatusIcon = status.icon;
                const progress = getJourneyProgress(newJoiner.id);
                
                return (
                  <div
                    key={newJoiner.id}
                    className={`card cursor-pointer transition-all hover:shadow-md ${
                      selectedNewJoiner?.id === newJoiner.id
                        ? "ring-2 ring-primary-500"
                        : ""
                    }`}
                    onClick={() => setSelectedNewJoiner(newJoiner)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{newJoiner.name}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${status.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {newJoiner.bu} • {newJoiner.function}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      Started: {new Date(newJoiner.startDate).toLocaleDateString()}
                    </p>
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Journey Progress</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-primary-600 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        {/* Selected New Joiner Details */}
        {selectedNewJoiner && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedNewJoiner.name}'s Journey
            </h2>
            <div className="mb-6">
              <ProfileCard
                name={selectedNewJoiner.name}
                email={selectedNewJoiner.email}
                bu={selectedNewJoiner.bu}
                function={selectedNewJoiner.function}
                country={selectedNewJoiner.country}
                timeZone={selectedNewJoiner.timeZone}
                skills={selectedNewJoiner.skills}
              />
            </div>
          </div>
        )}
        
        {/* Buddy Journey */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Buddy Journey
          </h2>
          <JourneyTimeline
            items={buddyItems}
            userId={buddy.id}
            groupBy="week"
            showOwner={true}
          />
        </div>
        
        {/* New Joiner Journey (if selected) */}
        {selectedNewJoiner && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedNewJoiner.name}'s Journey Items
            </h2>
            <JourneyTimeline
              items={newJoinerItems}
              userId={selectedNewJoiner.id}
              groupBy="week"
              showOwner={true}
            />
          </div>
        )}
        
        {/* Buddy Feedback */}
        {selectedNewJoiner && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Buddy Feedback
            </h2>
            <FeedbackForm
              type="buddy_buddy"
              fromUserId={buddy.id}
              toUserId={selectedNewJoiner.id}
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

