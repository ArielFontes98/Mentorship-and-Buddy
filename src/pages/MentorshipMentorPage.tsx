import { useState } from "react";
import { mentees, mentors, mentorshipJourneyItems, actionPlanItems } from "../mock/mentorshipData";
import { ProfileCard } from "../components/ProfileCard";
import { JourneyTimeline } from "../components/JourneyTimeline";
import { ActionPlanTable } from "../components/ActionPlanTable";
import { FeedbackForm } from "../components/FeedbackForm";
import { useStore } from "../store/useStore";
import { CheckCircle2, AlertCircle, Target } from "lucide-react";

export function MentorshipMentorPage() {
  const { completedItems, actionPlanItems: storeActionPlanItems, addActionPlanItem } = useStore();
  const [mentor] = useState(mentors[0]); // Henrique Lopes
  const [assignedMentees] = useState(
    mentees.filter((m) => m.mentorId === mentor.id)
  );
  const [selectedMentee, setSelectedMentee] = useState(assignedMentees[0]);
  const [newActionItem, setNewActionItem] = useState({ title: "", description: "", owner: "mentee" as "mentee" | "mentor" | "both" });
  
  // Merge store action plan items with mock data
  const allActionPlanItems = selectedMentee
    ? [
        ...actionPlanItems.filter((item) => item.mentorshipId === "mentorship_ariel_henrique"),
        ...storeActionPlanItems.filter((item) => item.mentorshipId === "mentorship_ariel_henrique"),
      ]
    : [];
  
  // Get items for selected mentee
  const menteeItems = selectedMentee
    ? mentorshipJourneyItems.filter(
        (item) =>
          item.audience === "mentee" || item.owner === "mentee" || item.owner === "both"
      )
    : [];
  
  // Get items for mentor
  const mentorItems = mentorshipJourneyItems.filter(
    (item) => item.audience === "mentor" || item.owner === "mentor" || item.owner === "both"
  );
  
  // Calculate journey progress for selected mentee
  const getJourneyProgress = (menteeId: string) => {
    const requiredItems = mentorshipJourneyItems.filter((item) => item.required);
    const completedRequiredItems = requiredItems.filter((item) =>
      completedItems.includes(`${item.id}_${menteeId}`)
    );
    return requiredItems.length > 0
      ? Math.round((completedRequiredItems.length / requiredItems.length) * 100)
      : 0;
  };
  
  const getStatusPill = (mentee: typeof mentees[0]) => {
    switch (mentee.mentorshipStatus) {
      case "not_started":
        return {
          label: "Planned",
          color: "bg-gray-100 text-gray-700",
          icon: AlertCircle,
        };
      case "active":
        return {
          label: "Active",
          color: "bg-green-100 text-green-700",
          icon: CheckCircle2,
        };
      case "completed":
        return {
          label: "Completed",
          color: "bg-blue-100 text-blue-700",
          icon: CheckCircle2,
        };
      default:
        return {
          label: "Unknown",
          color: "bg-gray-100 text-gray-700",
          icon: AlertCircle,
        };
    }
  };
  
  const handleAddActionItem = () => {
    if (newActionItem.title.trim() && selectedMentee) {
      const item = {
        id: `ap_${Date.now()}`,
        mentorshipId: "mentorship_ariel_henrique",
        title: newActionItem.title,
        description: newActionItem.description,
        owner: newActionItem.owner,
        status: "open" as const,
      };
      addActionPlanItem(item);
      setNewActionItem({ title: "", description: "", owner: "mentee" });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mentor Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Welcome, {mentor.name}!
          </p>
          <p className="text-sm text-gray-500">
            Guide your mentees through their career development journey
          </p>
        </div>
        
        {/* Mentor Capacity */}
        <div className="card bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Your Mentor Capacity
              </h3>
              <p className="text-sm text-gray-600">
                {mentor.activeMentees} of {mentor.maxMentees} mentees active
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">
                {mentor.maxMentees - mentor.activeMentees}
              </div>
              <div className="text-sm text-gray-600">Available slots</div>
            </div>
          </div>
        </div>
        
        {/* Your Mentees */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Mentees
          </h2>
          {assignedMentees.length === 0 ? (
            <div className="card">
              <p className="text-gray-600">No mentees assigned yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignedMentees.map((mentee) => {
                const status = getStatusPill(mentee);
                const StatusIcon = status.icon;
                const progress = getJourneyProgress(mentee.id);
                
                return (
                  <div
                    key={mentee.id}
                    className={`card cursor-pointer transition-all hover:shadow-md ${
                      selectedMentee?.id === mentee.id
                        ? "ring-2 ring-primary-500"
                        : ""
                    }`}
                    onClick={() => setSelectedMentee(mentee)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{mentee.name}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${status.color}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {mentee.bu} • {mentee.currentFunction} ({mentee.currentLevel})
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      Chapter: {mentee.chapter}
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
        
        {/* Selected Mentee Details */}
        {selectedMentee && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedMentee.name}'s Profile
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProfileCard
                name={selectedMentee.name}
                email={selectedMentee.email}
                bu={selectedMentee.bu}
                function={selectedMentee.currentFunction}
                country={selectedMentee.country}
                timeZone={selectedMentee.timeZone}
                skills={selectedMentee.currentSkills}
              />
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary-600" />
                  Ambitions
                </h3>
                <ul className="space-y-2">
                  {selectedMentee.ambitions.map((ambition, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <span>{ambition}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Target</h4>
                  <p className="text-sm text-gray-600">
                    {selectedMentee.targetFunction} • {selectedMentee.targetLevel} • {selectedMentee.targetChapter}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Mentor Journey */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Mentor Journey
          </h2>
          <JourneyTimeline
            items={mentorItems}
            userId={mentor.id}
            groupBy="month"
            showOwner={true}
          />
        </div>
        
        {/* Mentee Journey (if selected) */}
        {selectedMentee && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedMentee.name}'s Journey Items
            </h2>
            <JourneyTimeline
              items={menteeItems}
              userId={selectedMentee.id}
              groupBy="month"
              showOwner={true}
            />
          </div>
        )}
        
        {/* Action Plan Management */}
        {selectedMentee && (
          <div className="mb-8">
            <ActionPlanTable
              items={allActionPlanItems}
              mentorshipId="mentorship_ariel_henrique"
              canEdit={true}
            />
            
            {/* Add New Action Item */}
            <div className="card mt-4">
              <h3 className="font-semibold text-gray-900 mb-4">Add New Action Item</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newActionItem.title}
                    onChange={(e) => setNewActionItem({ ...newActionItem, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter action item title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newActionItem.description}
                    onChange={(e) => setNewActionItem({ ...newActionItem, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Owner
                  </label>
                  <select
                    value={newActionItem.owner}
                    onChange={(e) => setNewActionItem({ ...newActionItem, owner: e.target.value as "mentee" | "mentor" | "both" })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="mentee">Mentee</option>
                    <option value="mentor">Mentor</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <button onClick={handleAddActionItem} className="btn-primary">
                  Add Action Item
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* End-of-Cycle Recommendations */}
        {selectedMentee && selectedMentee.mentorshipStatus === "completed" && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              End-of-Cycle Recommendations
            </h2>
            <div className="card">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="rec1" className="w-4 h-4" />
                  <label htmlFor="rec1" className="text-sm text-gray-700">
                    Ready for larger scope in current BU
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="rec2" className="w-4 h-4" />
                  <label htmlFor="rec2" className="text-sm text-gray-700">
                    Recommended for rotation to [BU/Chapter]
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="rec3" className="w-4 h-4" />
                  <label htmlFor="rec3" className="text-sm text-gray-700">
                    Needs more time in current role
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Mentor Feedback */}
        {selectedMentee && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Mentor Feedback
            </h2>
            <FeedbackForm
              type="mentor"
              fromUserId={mentor.id}
              toUserId={selectedMentee.id}
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

