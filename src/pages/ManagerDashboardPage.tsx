import { useMemo } from "react";
import { teamMembers, getTeamSnapshot, getProgramParticipation, getMobilityItems } from "../mock/managerData";
import { rotationOpportunities } from "../mock/rotationData";
import { courses } from "../mock/coursesData";
import { 
  Users, Building2, Globe, TrendingUp, AlertCircle, CheckCircle2, Clock, 
  BookOpen, ArrowRightLeft, BarChart3
} from "lucide-react";

export function ManagerDashboardPage() {
  const snapshot = useMemo(() => getTeamSnapshot(teamMembers), []);
  const participation = useMemo(() => getProgramParticipation(teamMembers), []);
  const mobility = useMemo(() => getMobilityItems(teamMembers, rotationOpportunities), []);

  // Get all unique skills
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    teamMembers.forEach((member) => {
      member.skills.forEach((skill) => skillsSet.add(skill.name));
    });
    return Array.from(skillsSet).sort();
  }, []);

  // Calculate skill gaps
  const skillGaps = useMemo(() => {
    const gaps: { skill: string; members: string[]; count: number }[] = [];
    
    allSkills.forEach((skillName) => {
      const membersWithGap = teamMembers.filter((member) => {
        const skill = member.skills.find((s) => s.name === skillName);
        return skill && skill.currentLevel < skill.expectedLevel;
      });
      
      if (membersWithGap.length > 0) {
        gaps.push({
          skill: skillName,
          members: membersWithGap.map((m) => m.name),
          count: membersWithGap.length,
        });
      }
    });
    
    return gaps;
  }, [allSkills]);

  const getSkillLevelColor = (current: number, expected: number) => {
    if (current >= expected) return "bg-green-100 text-green-700";
    if (current >= expected - 0.5) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  const getSkillLevelIcon = (current: number, expected: number) => {
    if (current >= expected) return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    if (current >= expected - 0.5) return <Clock className="w-4 h-4 text-yellow-600" />;
    return <AlertCircle className="w-4 h-4 text-red-600" />;
  };

  const getReadinessTag = (readiness: string) => {
    switch (readiness) {
      case "ready_soon":
        return { label: "Ready Soon", color: "bg-green-100 text-green-700" };
      case "exploring":
        return { label: "Exploring", color: "bg-yellow-100 text-yellow-700" };
      default:
        return { label: "Early Days", color: "bg-gray-100 text-gray-700" };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manager Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Team overview and talent management
          </p>
          <p className="text-sm text-gray-500">
            Comprehensive view of your team's progress, skills, and development
          </p>
        </div>

        {/* Team Snapshot */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary-600" />
            Team Snapshot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Team Size</p>
                  <p className="text-3xl font-bold text-primary-700">{snapshot.teamSize}</p>
                </div>
                <Users className="w-8 h-8 text-primary-600 opacity-50" />
              </div>
            </div>
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Countries</p>
                  <p className="text-3xl font-bold text-blue-700">{snapshot.countries.length}</p>
                </div>
                <Globe className="w-8 h-8 text-blue-600 opacity-50" />
              </div>
            </div>
            <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Chapters</p>
                  <p className="text-3xl font-bold text-purple-700">{snapshot.chapters.length}</p>
                </div>
                <Building2 className="w-8 h-8 text-purple-600 opacity-50" />
              </div>
            </div>
            <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Buddy</p>
                  <p className="text-3xl font-bold text-green-700">{snapshot.activeBuddyPercentage}%</p>
                </div>
                <Users className="w-8 h-8 text-green-600 opacity-50" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Active Mentorship</p>
                <TrendingUp className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-primary-600 rounded-full transition-all"
                    style={{ width: `${snapshot.activeMentorshipPercentage}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {snapshot.activeMentorshipPercentage}%
                </span>
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Rotation Interest (Next 12M)</p>
                <ArrowRightLeft className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-yellow-600 rounded-full transition-all"
                    style={{ width: `${snapshot.rotationInterestPercentage}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {snapshot.rotationInterestPercentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Leveling Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary-600" />
            Skills & Leveling Overview
          </h2>
          
          {/* Skill Gaps Alert */}
          {skillGaps.length > 0 && (
            <div className="card bg-yellow-50 border-yellow-200 mb-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-yellow-900 mb-1">Skill Gaps Detected</p>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    {skillGaps.map((gap, idx) => (
                      <li key={idx}>
                        • {gap.count} {gap.count === 1 ? "member" : "members"} below expected level in <strong>{gap.skill}</strong>
                        {gap.members.length <= 3 && ` (${gap.members.join(", ")})`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Skills Table */}
          <div className="card overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Member</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Level</th>
                  {allSkills.map((skill) => (
                    <th key={skill} className="text-center py-3 px-2 text-xs font-medium text-gray-700">
                      {skill}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.function}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                        {member.level}
                      </span>
                    </td>
                    {allSkills.map((skillName) => {
                      const skill = member.skills.find((s) => s.name === skillName);
                      if (!skill) {
                        return (
                          <td key={skillName} className="py-3 px-2 text-center">
                            <span className="text-gray-400">-</span>
                          </td>
                        );
                      }
                      return (
                        <td key={skillName} className="py-3 px-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {getSkillLevelIcon(skill.currentLevel, skill.expectedLevel)}
                            <span className={`text-xs font-medium ${getSkillLevelColor(skill.currentLevel, skill.expectedLevel)}`}>
                              {skill.currentLevel.toFixed(1)}/{skill.expectedLevel}
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Programs Participation */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-600" />
            Programs Participation
          </h2>
          <div className="space-y-4">
            {participation.map((part) => {
              const member = teamMembers.find((m) => m.id === part.memberId);
              if (!member) return null;

              return (
                <div key={part.memberId} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">
                        {member.function} • {member.level} • {member.bu}
                      </p>
                    </div>
                    {part.alerts.length > 0 && (
                      <div className="flex items-center gap-2 text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                        <AlertCircle className="w-3 h-3" />
                        <span>{part.alerts.length} alert{part.alerts.length > 1 ? "s" : ""}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Buddy Status */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">Buddy Status</p>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            part.buddyStatus === "active"
                              ? "bg-primary-100 text-primary-700"
                              : part.buddyStatus === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {part.buddyStatus === "active"
                            ? "Active"
                            : part.buddyStatus === "completed"
                            ? "Completed"
                            : "Not Assigned"}
                        </span>
                      </div>
                      {part.buddyProgress !== undefined && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-primary-600 rounded-full transition-all"
                              style={{ width: `${part.buddyProgress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{part.buddyProgress}%</span>
                        </div>
                      )}
                    </div>

                    {/* Mentorship Status */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-700">Mentorship Status</p>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            part.mentorshipStatus === "active"
                              ? "bg-primary-100 text-primary-700"
                              : part.mentorshipStatus === "completed"
                              ? "bg-green-100 text-green-700"
                              : part.mentorshipStatus === "planned"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {part.mentorshipStatus === "active"
                            ? "Active"
                            : part.mentorshipStatus === "completed"
                            ? "Completed"
                            : part.mentorshipStatus === "planned"
                            ? "Planned"
                            : "Not Started"}
                        </span>
                      </div>
                      {part.mentorshipProgress !== undefined && (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 bg-primary-600 rounded-full transition-all"
                              style={{ width: `${part.mentorshipProgress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{part.mentorshipProgress}%</span>
                        </div>
                      )}
                    </div>

                    {/* Key Courses */}
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Courses</p>
                      <div className="space-y-1">
                        {part.keyCourses.map((course, idx) => {
                          const courseData = courses.find((c) => c.id === course.courseId);
                          if (!courseData) return null;
                          return (
                            <div key={idx} className="flex items-center justify-between text-xs">
                              <span className="text-gray-600 truncate flex-1">{courseData.title}</span>
                              <span
                                className={`px-1.5 py-0.5 rounded text-xs font-medium ml-2 ${
                                  course.status === "completed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-primary-100 text-primary-700"
                                }`}
                              >
                                {course.status === "completed" ? "✓" : `${course.progress || 0}%`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Alerts */}
                  {part.alerts.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          {part.alerts.map((alert, idx) => (
                            <p key={idx} className="text-sm text-yellow-800">{alert}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobility & Rotations */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ArrowRightLeft className="w-6 h-6 text-primary-600" />
            Mobility & Rotations
          </h2>
          {mobility.length === 0 ? (
            <div className="card text-center py-12">
              <ArrowRightLeft className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No team members have declared rotation interest yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mobility.map((item) => {
                const readiness = getReadinessTag(item.readiness);
                return (
                  <div key={item.memberId} className="card">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.memberName}</h3>
                        {item.rotationInterest && (
                          <p className="text-sm text-gray-600">
                            Interest: {item.rotationInterest.bu || "Any"} • {item.rotationInterest.function || "Any"} • Priority: {item.rotationInterest.priority}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded text-sm font-medium ${readiness.color}`}>
                        {readiness.label}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Top 3 Matches</p>
                      <div className="space-y-2">
                        {item.topMatches.map((match, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{match.title}</p>
                              <p className="text-xs text-gray-600">
                                {match.bu} • {match.chapter}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-primary-600">
                                {match.matchScore}%
                              </p>
                              <p className="text-xs text-gray-500">Match</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

