import { useState, useMemo } from "react";
import { userProfile } from "../mock/profileData";
import { rotationOpportunities, rotationApplications, rotationInterests } from "../mock/rotationData";
import { getRotationMatches } from "../lib/rotationMatching";
import { useStore } from "../store/useStore";
import { Building2, MapPin, Calendar, TrendingUp, CheckCircle2, Clock, Send, Plus, Search } from "lucide-react";

export function RotationPage() {
  const { rotationApplications: storeApplications, rotationInterests: storeInterests, addRotationApplication } = useStore();
  const [selectedTab, setSelectedTab] = useState<"opportunities" | "applications" | "interests">("opportunities");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBU, setSelectedBU] = useState<string>("all");
  const [selectedFunction, setSelectedFunction] = useState<string>("all");

  // Calculate matches for all opportunities
  const matches = useMemo(() => {
    return getRotationMatches(userProfile, rotationOpportunities);
  }, []);

  // Filter opportunities
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const opp = match.opportunity;

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          opp.title.toLowerCase().includes(query) ||
          opp.description.toLowerCase().includes(query) ||
          opp.bu.toLowerCase().includes(query) ||
          opp.chapter.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // BU filter
      if (selectedBU !== "all" && opp.bu !== selectedBU) {
        return false;
      }

      // Function filter
      if (selectedFunction !== "all" && opp.function !== selectedFunction) {
        return false;
      }

      return true;
    });
  }, [matches, searchQuery, selectedBU, selectedFunction]);

  const allBUs = useMemo(() => {
    const busSet = new Set(rotationOpportunities.map((opp) => opp.bu));
    return Array.from(busSet).sort();
  }, []);

  const allFunctions = useMemo(() => {
    const funcsSet = new Set(rotationOpportunities.map((opp) => opp.function));
    return Array.from(funcsSet).sort();
  }, []);

  const allApplications = [...rotationApplications, ...storeApplications];
  const allInterests = [...rotationInterests, ...storeInterests];

  const handleApply = (opportunityId: string) => {
    const match = matches.find((m) => m.opportunity.id === opportunityId);
    if (match) {
      const application = {
        id: `app_${Date.now()}`,
        opportunityId,
        userId: userProfile.id,
        appliedDate: new Date().toISOString(),
        status: "pending" as const,
        matchScore: match.match.score,
        matchExplanation: match.match.explanation,
      };
      addRotationApplication(application);
      alert(`Application submitted! Match score: ${match.match.score}/100`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "reviewing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const tabs = [
    { id: "opportunities", label: "Open Opportunities", icon: Building2 },
    { id: "applications", label: "My Applications", icon: Send },
    { id: "interests", label: "My Interests", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Rotation Opportunities
          </h1>
          <p className="text-lg text-gray-600 mb-1">
            Explore internal rotation opportunities and apply
          </p>
          <p className="text-sm text-gray-500">
            Find opportunities that match your skills and interests
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

        {/* Opportunities Tab */}
        {selectedTab === "opportunities" && (
          <>
            {/* Filters */}
            <div className="card mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by title, description, BU..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BU
                  </label>
                  <select
                    value={selectedBU}
                    onChange={(e) => setSelectedBU(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All BUs</option>
                    {allBUs.map((bu) => (
                      <option key={bu} value={bu}>
                        {bu}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Function
                  </label>
                  <select
                    value={selectedFunction}
                    onChange={(e) => setSelectedFunction(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Functions</option>
                    {allFunctions.map((func) => (
                      <option key={func} value={func}>
                        {func}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Found <span className="font-semibold">{filteredMatches.length}</span> opportunities
              </p>
            </div>

            <div className="space-y-6">
              {filteredMatches.map((match) => {
                const opp = match.opportunity;
                const hasApplied = allApplications.some(
                  (app) => app.opportunityId === opp.id && app.userId === userProfile.id
                );

                return (
                  <div key={opp.id} className="card hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{opp.title}</h3>
                          <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                            Match: {match.match.score}/100
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            <span>{opp.bu}</span>
                          </div>
                          <span>•</span>
                          <span>{opp.chapter}</span>
                          <span>•</span>
                          <span>{opp.function} ({opp.level})</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{opp.country}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 mb-4">{opp.description}</p>

                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {opp.requiredSkills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {opp.preferredSkills.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-700 mb-2">Preferred Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {opp.preferredSkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                      <p className="text-xs font-medium text-primary-700 mb-1">Match Explanation</p>
                      <ul className="space-y-1">
                        {match.match.explanation.map((reason, idx) => (
                          <li key={idx} className="text-xs text-primary-600 flex items-start gap-2">
                            <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Posted: {new Date(opp.postedDate).toLocaleDateString()}</span>
                        </div>
                        {opp.deadline && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Deadline: {new Date(opp.deadline).toLocaleDateString()}</span>
                          </div>
                        )}
                        <span>{opp.slotsAvailable} slots available</span>
                      </div>
                      {hasApplied ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium">
                          Applied
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApply(opp.id)}
                          className="btn-primary flex items-center gap-2"
                          disabled={opp.status !== "open"}
                        >
                          <Send className="w-4 h-4" />
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredMatches.length === 0 && (
              <div className="card text-center py-12">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No opportunities found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedBU("all");
                    setSelectedFunction("all");
                  }}
                  className="btn-secondary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Applications Tab */}
        {selectedTab === "applications" && (
          <div className="space-y-6">
            {allApplications.filter((app) => app.userId === userProfile.id).length === 0 ? (
              <div className="card text-center py-12">
                <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No applications yet.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Browse opportunities and apply to get started!
                </p>
              </div>
            ) : (
              allApplications
                .filter((app) => app.userId === userProfile.id)
                .map((app) => {
                  const opp = rotationOpportunities.find((o) => o.id === app.opportunityId);
                  if (!opp) return null;

                  return (
                    <div key={app.id} className="card">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {opp.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {opp.bu} • {opp.chapter} • {opp.function}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(app.status)}`}
                        >
                          {app.status === "pending" ? "Pending" :
                           app.status === "reviewing" ? "Reviewing" :
                           app.status === "accepted" ? "Accepted" :
                           "Rejected"}
                        </span>
                      </div>

                      {app.matchScore && (
                        <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                          <p className="text-xs font-medium text-primary-700 mb-1">
                            Your Match Score: {app.matchScore}/100
                          </p>
                          {app.matchExplanation && (
                            <ul className="space-y-1">
                              {app.matchExplanation.map((reason, idx) => (
                                <li key={idx} className="text-xs text-primary-600">
                                  • {reason}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      <div className="text-xs text-gray-500">
                        Applied on {new Date(app.appliedDate).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        )}

        {/* Interests Tab */}
        {selectedTab === "interests" && (
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Express Your Rotation Interests</h3>
                <button className="btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Interest
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Let the system know what kind of rotations you're interested in. This helps match you with relevant opportunities.
              </p>
            </div>

            {allInterests.filter((interest) => interest.userId === userProfile.id).length === 0 ? (
              <div className="card text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No interests expressed yet.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Click "Add Interest" to express your rotation preferences.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {allInterests
                  .filter((interest) => interest.userId === userProfile.id)
                  .map((interest) => (
                    <div key={interest.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {interest.bu && (
                              <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                                BU: {interest.bu}
                              </span>
                            )}
                            {interest.chapter && (
                              <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                                Chapter: {interest.chapter}
                              </span>
                            )}
                            {interest.function && (
                              <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                                Function: {interest.function}
                              </span>
                            )}
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                interest.priority === "high"
                                  ? "bg-red-100 text-red-700"
                                  : interest.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {interest.priority} priority
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{interest.reason}</p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        Created on {new Date(interest.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

