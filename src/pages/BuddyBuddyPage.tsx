import { useState } from "react";
import { newJoiners, buddies, buddyJourneyItems } from "../mock/buddyData";
import { courses } from "../mock/coursesData";
import { ProfileCard } from "../components/ProfileCard";
import { JourneyTimeline } from "../components/JourneyTimeline";
import { FeedbackForm } from "../components/FeedbackForm";
import { CourseCard } from "../components/CourseCard";
import { useStore } from "../store/useStore";
import { CheckCircle2, Clock, AlertCircle, BookOpen, Plus } from "lucide-react";

export function BuddyBuddyPage() {
  const { completedItems, buddyCourseAllocations, allocateCourse } = useStore();
  const [buddy] = useState(buddies[0]); // Thiago Fontes
  const [assignedNewJoiners] = useState(
    newJoiners.filter((nj) => nj.buddyId === buddy.id)
  );
  const [selectedNewJoiner, setSelectedNewJoiner] = useState(assignedNewJoiners[0]);
  const [showCourseAllocation, setShowCourseAllocation] = useState(false);
  
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
        
        {/* Allocate Courses to New Joiner */}
        {selectedNewJoiner && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                Allocate Courses to {selectedNewJoiner.name}
              </h2>
              <button
                onClick={() => setShowCourseAllocation(!showCourseAllocation)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                {showCourseAllocation ? "Hide" : "Allocate Course"}
              </button>
            </div>
            
            {showCourseAllocation && (
              <div className="card mb-4">
                <h3 className="font-semibold text-gray-900 mb-4">Available Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.map((course) => {
                    const isAllocated = buddyCourseAllocations.some(
                      (alloc) =>
                        alloc.courseId === course.id &&
                        alloc.newJoinerId === selectedNewJoiner.id &&
                        alloc.buddyId === buddy.id
                    );
                    
                    return (
                      <div key={course.id} className="relative">
                        <CourseCard
                          course={course}
                          showActions={false}
                        />
                        {isAllocated ? (
                          <div className="absolute top-2 right-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            Allocated
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              const allocation = {
                                id: `alloc_${Date.now()}`,
                                buddyId: buddy.id,
                                newJoinerId: selectedNewJoiner.id,
                                courseId: course.id,
                                allocatedAt: new Date().toISOString(),
                                status: "pending" as const,
                              };
                              allocateCourse(allocation);
                              alert(`Course "${course.title}" allocated to ${selectedNewJoiner.name}`);
                            }}
                            className="absolute bottom-2 right-2 left-2 btn-primary text-sm"
                          >
                            Allocate Course
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Allocated Courses */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Allocated Courses</h3>
              {buddyCourseAllocations
                .filter(
                  (alloc) =>
                    alloc.newJoinerId === selectedNewJoiner?.id &&
                    alloc.buddyId === buddy.id
                )
                .length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No courses allocated yet. Click "Allocate Course" to assign courses.
                </p>
              ) : (
                <div className="space-y-3">
                  {buddyCourseAllocations
                    .filter(
                      (alloc) =>
                        alloc.newJoinerId === selectedNewJoiner?.id &&
                        alloc.buddyId === buddy.id
                    )
                    .map((alloc) => {
                      const course = courses.find((c) => c.id === alloc.courseId);
                      if (!course) return null;
                      
                      return (
                        <div
                          key={alloc.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5 text-primary-600" />
                            <div>
                              <h4 className="font-medium text-gray-900">{course.title}</h4>
                              <p className="text-sm text-gray-600">
                                Allocated on {new Date(alloc.allocatedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              alloc.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : alloc.status === "in_progress"
                                ? "bg-primary-100 text-primary-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {alloc.status === "completed"
                              ? "Completed"
                              : alloc.status === "in_progress"
                              ? "In Progress"
                              : "Pending"}
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
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

