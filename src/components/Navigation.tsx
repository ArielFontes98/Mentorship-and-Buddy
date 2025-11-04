import { useEffect, useState } from "react";
import { BookOpen, Users, GraduationCap } from "lucide-react";
import { BuddyNewJoinerPage } from "../pages/BuddyNewJoinerPage";
import { BuddyBuddyPage } from "../pages/BuddyBuddyPage";
import { MentorshipMenteePage } from "../pages/MentorshipMenteePage";
import { MentorshipMentorPage } from "../pages/MentorshipMentorPage";

export function Navigation() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || "/buddy/new-joiner");
  
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || "/buddy/new-joiner");
    };
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  
  const tabs = [
    { id: "courses", label: "Courses", icon: BookOpen, path: "#/courses" },
    { id: "buddy", label: "Buddy", icon: Users, path: "#/buddy" },
    { id: "mentorship", label: "Mentorship", icon: GraduationCap, path: "#/mentorship" },
  ];
  
  const buddySubTabs = [
    { label: "New Joiner", path: "#/buddy/new-joiner" },
    { label: "Buddy", path: "#/buddy/buddy" },
  ];
  
  const mentorshipSubTabs = [
    { label: "Mentee", path: "#/mentorship/mentee" },
    { label: "Mentor", path: "#/mentorship/mentor" },
  ];
  
  const getActiveTab = () => {
    if (currentPath.startsWith("/buddy")) return "buddy";
    if (currentPath.startsWith("/mentorship")) return "mentorship";
    return "courses";
  };
  
  const renderContent = () => {
    if (currentPath === "/buddy/new-joiner") {
      return <BuddyNewJoinerPage />;
    }
    if (currentPath === "/buddy/buddy") {
      return <BuddyBuddyPage />;
    }
    if (currentPath === "/mentorship/mentee") {
      return <MentorshipMenteePage />;
    }
    if (currentPath === "/mentorship/mentor") {
      return <MentorshipMentorPage />;
    }
    // Default to buddy new joiner
    return <BuddyNewJoinerPage />;
  };
  
  const activeTab = getActiveTab();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600"></div>
                <span className="text-xl font-bold text-gray-900">Talent & Development Hub</span>
              </div>
              
              <div className="flex items-center gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <a
                      key={tab.id}
                      href={tab.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Sub Navigation */}
          {(activeTab === "buddy" || activeTab === "mentorship") && (
            <div className="flex items-center gap-2 pb-4 border-t border-gray-100 pt-4">
              {activeTab === "buddy" &&
                buddySubTabs.map((subTab) => {
                  const isActive = currentPath === subTab.path.slice(1);
                  return (
                    <a
                      key={subTab.path}
                      href={subTab.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {subTab.label}
                    </a>
                  );
                })}
              {activeTab === "mentorship" &&
                mentorshipSubTabs.map((subTab) => {
                  const isActive = currentPath === subTab.path.slice(1);
                  return (
                    <a
                      key={subTab.path}
                      href={subTab.path}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-primary-100 text-primary-700"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {subTab.label}
                    </a>
                  );
                })}
            </div>
          )}
        </div>
      </nav>
      
      {/* Page Content */}
      <div>{renderContent()}</div>
    </div>
  );
}

