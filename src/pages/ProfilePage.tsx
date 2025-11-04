import { useState } from "react";
import { userProfile } from "../mock/profileData";
import { courses } from "../mock/coursesData";
import { mentors } from "../mock/mentorshipData";
import { ProfileCard } from "../components/ProfileCard";
import { Building2, Calendar, TrendingUp, Award, BookOpen, Users, CheckCircle2, XCircle, Minus } from "lucide-react";

export function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "performance" | "history" | "courses" | "mentorships">("overview");

  const completedCoursesList = courses.filter((c) =>
    userProfile.completedCourses.includes(c.id)
  );

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "exceeds":
        return "bg-green-100 text-green-700 border-green-200";
      case "meets":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "below":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "active":
        return <TrendingUp className="w-4 h-4 text-primary-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "performance", label: "Performance", icon: Award },
    { id: "history", label: "History", icon: Calendar },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "mentorships", label: "Mentorships", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Profile & History
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            {userProfile.name}
          </p>
          <p className="text-sm text-gray-500">
            Member since {new Date(userProfile.startDate).toLocaleDateString()}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-2 border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors border-b-2 ${
                    isActive
                      ? "border-primary-500 text-primary-700"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="space-y-6">
            <ProfileCard
              name={userProfile.name}
              email={userProfile.email}
              bu={userProfile.currentBU}
              function={userProfile.currentFunction}
              country={userProfile.country}
              timeZone={userProfile.timeZone}
              skills={userProfile.skills}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary-600" />
                  Current Role
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">BU</p>
                    <p className="font-medium text-gray-900">{userProfile.currentBU}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chapter</p>
                    <p className="font-medium text-gray-900">{userProfile.currentChapter}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Function & Level</p>
                    <p className="font-medium text-gray-900">
                      {userProfile.currentFunction} ({userProfile.currentLevel})
                    </p>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completed Courses</span>
                    <span className="font-semibold text-gray-900">
                      {userProfile.completedCourses.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mentorships</span>
                    <span className="font-semibold text-gray-900">
                      {userProfile.mentorshipHistory.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">BUs Participated</span>
                    <span className="font-semibold text-gray-900">
                      {userProfile.buHistory.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Chapters</span>
                    <span className="font-semibold text-gray-900">
                      {userProfile.chapterHistory.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {userProfile.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-lg text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {selectedTab === "performance" && (
          <div className="space-y-6">
            {userProfile.performanceHistory.map((record) => (
              <div key={record.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {record.period}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getRatingColor(record.rating)}`}
                    >
                      {record.rating === "exceeds" ? "Exceeds Expectations" :
                       record.rating === "meets" ? "Meets Expectations" :
                       "Below Expectations"}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">Feedback</p>
                  <p className="text-sm text-gray-600">{record.feedback}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Goals</p>
                    <ul className="space-y-1">
                      {record.goals.map((goal, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Achievements</p>
                    <ul className="space-y-1">
                      {record.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* History Tab */}
        {selectedTab === "history" && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary-600" />
                BU History
              </h3>
              <div className="space-y-4">
                {userProfile.buHistory.map((bu) => (
                  <div
                    key={bu.id}
                    className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{bu.bu}</p>
                      <p className="text-sm text-gray-600">{bu.function}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(bu.startDate).toLocaleDateString()}
                        {bu.endDate && ` - ${new Date(bu.endDate).toLocaleDateString()}`}
                        {bu.isCurrent && " (Current)"}
                      </p>
                    </div>
                    {bu.isCurrent && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600" />
                Chapter History
              </h3>
              <div className="space-y-4">
                {userProfile.chapterHistory.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{chapter.chapter}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(chapter.startDate).toLocaleDateString()}
                        {chapter.endDate && ` - ${new Date(chapter.endDate).toLocaleDateString()}`}
                        {chapter.isCurrent && " (Current)"}
                      </p>
                    </div>
                    {chapter.isCurrent && (
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {selectedTab === "courses" && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary-600" />
                Completed Courses ({completedCoursesList.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedCoursesList.map((course) => (
                  <div key={course.id} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{course.category}</span>
                      <span>•</span>
                      <span>{course.estimatedMinutes} min</span>
                      <span>•</span>
                      <span className="capitalize">{course.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mentorships Tab */}
        {selectedTab === "mentorships" && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600" />
                Mentorship History ({userProfile.mentorshipHistory.length})
              </h3>
              <div className="space-y-4">
                {userProfile.mentorshipHistory.map((mentorship) => {
                  const mentor = mentors.find((m) => m.id === mentorship.mentorId);
                  return (
                    <div
                      key={mentorship.id}
                      className="p-4 bg-gray-50 rounded-lg border-l-4 border-primary-500"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{mentorship.mentorName}</h4>
                          <p className="text-sm text-gray-600">
                            {mentor?.function} • {mentor?.level}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(mentorship.status)}
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {mentorship.status}
                          </span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Period</p>
                        <p className="text-sm text-gray-700">
                          {new Date(mentorship.startDate).toLocaleDateString()}
                          {mentorship.endDate && ` - ${new Date(mentorship.endDate).toLocaleDateString()}`}
                          {mentorship.status === "active" && " (Active)"}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Focus Areas</p>
                        <div className="flex flex-wrap gap-2">
                          {mentorship.focusAreas.map((area, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

