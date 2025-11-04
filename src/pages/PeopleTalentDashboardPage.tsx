import { talentMetrics, mobilityOverview, skillsGaps } from "../mock/peopleData";
import { 
  Users, TrendingUp, Clock, Award, BarChart3, Building2, 
  AlertCircle, CheckCircle2, ArrowRightLeft, Target
} from "lucide-react";

export function PeopleTalentDashboardPage() {
  const getBalanceColor = (balance: string) => {
    switch (balance) {
      case "high_demand":
        return "bg-red-100 text-red-700 border-red-200";
      case "high_applicants":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getBalanceLabel = (balance: string) => {
    switch (balance) {
      case "high_demand":
        return "High Demand";
      case "high_applicants":
        return "High Applicants";
      default:
        return "Balanced";
    }
  };

  const getNPSColor = (nps: number) => {
    if (nps >= 70) return "text-green-600";
    if (nps >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getGapColor = (gap: number) => {
    if (gap <= 0) return "bg-green-100 text-green-700"; // Surplus
    if (gap <= 0.5) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            People & Talent Dashboard
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Organization-wide talent metrics and insights
          </p>
          <p className="text-sm text-gray-500">
            Comprehensive view across all BUs and chapters
          </p>
        </div>

        {/* Key Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary-600" />
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Internal Fill Rate</p>
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <p className="text-3xl font-bold text-primary-700">{talentMetrics.internalFillRate}%</p>
              <p className="text-xs text-gray-600 mt-1">of open roles filled internally</p>
            </div>

            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Avg Time to Fill</p>
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-blue-700">{talentMetrics.avgTimeToFill}</p>
              <p className="text-xs text-gray-600 mt-1">days</p>
            </div>

            <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Active Buddy</p>
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-700">{talentMetrics.activeBuddyPercentage}%</p>
              <p className="text-xs text-gray-600 mt-1">of employees</p>
            </div>

            <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Active Mentorship</p>
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-700">{talentMetrics.activeMentorshipPercentage}%</p>
              <p className="text-xs text-gray-600 mt-1">of employees</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Rotation Rate</p>
                <ArrowRightLeft className="w-4 h-4 text-primary-600" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-primary-600 rounded-full transition-all"
                    style={{ width: `${talentMetrics.rotationRate}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {talentMetrics.rotationRate}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">with at least 1 rotation (last 12M)</p>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Buddy NPS</p>
                <TrendingUp className="w-4 h-4 text-primary-600" />
              </div>
              <p className={`text-3xl font-bold ${getNPSColor(talentMetrics.buddyNPS)}`}>
                {talentMetrics.buddyNPS}
              </p>
              <p className="text-xs text-gray-500 mt-1">Net Promoter Score</p>
            </div>

            <div className="card">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-700">Mentorship NPS</p>
                <TrendingUp className="w-4 h-4 text-primary-600" />
              </div>
              <p className={`text-3xl font-bold ${getNPSColor(talentMetrics.mentorshipNPS)}`}>
                {talentMetrics.mentorshipNPS}
              </p>
              <p className="text-xs text-gray-500 mt-1">Net Promoter Score</p>
            </div>
          </div>
        </div>

        {/* Mobility & Rotation Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ArrowRightLeft className="w-6 h-6 text-primary-600" />
            Mobility & Rotation Overview
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* By BU */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary-600" />
                By Business Unit
              </h3>
              <div className="space-y-3">
                {mobilityOverview.byBU.map((bu, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${getBalanceColor(bu.balance)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{bu.bu}</h4>
                      <span className="px-2 py-1 bg-white rounded text-xs font-medium">
                        {getBalanceLabel(bu.balance)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Demand</p>
                        <p className="font-semibold text-gray-900">{bu.demand} roles</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Applicants</p>
                        <p className="font-semibold text-gray-900">{bu.applicants} candidates</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* By Chapter */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-600" />
                By Chapter
              </h3>
              <div className="space-y-3">
                {mobilityOverview.byChapter.map((chapter, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${getBalanceColor(chapter.balance)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{chapter.chapter}</h4>
                      <span className="px-2 py-1 bg-white rounded text-xs font-medium">
                        {getBalanceLabel(chapter.balance)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Demand</p>
                        <p className="font-semibold text-gray-900">{chapter.demand} roles</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Applicants</p>
                        <p className="font-semibold text-gray-900">{chapter.applicants} candidates</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Gaps Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary-600" />
            Skills & Gaps Overview
          </h2>
          
          {skillsGaps.length === 0 ? (
            <div className="card text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-gray-600">No significant skill gaps detected across chapters.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {skillsGaps.map((gap, idx) => (
                <div key={idx} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{gap.skill}</h3>
                      <p className="text-sm text-gray-600">
                        {gap.chapter} • {gap.country}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded text-sm font-medium ${getGapColor(gap.gap)}`}>
                      {gap.gap <= 0 ? (
                        <span>Surplus: {Math.abs(gap.gap).toFixed(1)}</span>
                      ) : (
                        <span>Gap: {gap.gap.toFixed(1)}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Current Level</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-primary-600 rounded-full transition-all"
                            style={{ width: `${(gap.currentLevel / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {gap.currentLevel.toFixed(1)}/5
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Expected Level</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-600 rounded-full transition-all"
                            style={{ width: `${(gap.expectedLevel / 5) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {gap.expectedLevel.toFixed(1)}/5
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Affected Members</p>
                      <p className="text-lg font-semibold text-gray-900">{gap.affectedMembers}</p>
                    </div>
                  </div>

                  {gap.gap > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          <strong>Action needed:</strong> {gap.affectedMembers} {gap.affectedMembers === 1 ? "member" : "members"} need development in this area.
                        </p>
                      </div>
                    </div>
                  )}

                  {gap.gap <= 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          <strong>Good pool:</strong> {gap.affectedMembers} {gap.affectedMembers === 1 ? "member has" : "members have"} strong skills in this area, good pool for future rotations.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

