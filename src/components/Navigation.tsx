import { useEffect, useState } from "react";
import { BookOpen, Users, GraduationCap, User, ArrowRightLeft, BarChart3, Building2 } from "lucide-react";
import { BuddyNewJoinerPage } from "../pages/BuddyNewJoinerPage";
import { BuddyBuddyPage } from "../pages/BuddyBuddyPage";
import { MentorshipMenteePage } from "../pages/MentorshipMenteePage";
import { MentorshipMentorPage } from "../pages/MentorshipMentorPage";
import { CoursesOnboardingPage } from "../pages/CoursesOnboardingPage";
import { CoursesRecommendedPage } from "../pages/CoursesRecommendedPage";
import { ProfilePage } from "../pages/ProfilePage";
import { RotationPage } from "../pages/RotationPage";
import { ManagerDashboardPage } from "../pages/ManagerDashboardPage";
import { PeopleTalentDashboardPage } from "../pages/PeopleTalentDashboardPage";
import { LevelingPage } from "../pages/LevelingPage";

export function Navigation() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || "/profile");
  
  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.slice(1) || "/profile";
      setCurrentPath(path);
      
      // Auto-redirect to first sub-tab if clicking main tab
      if (path === "/buddy") {
        window.location.hash = "#/buddy/new-joiner";
        return;
      }
      if (path === "/courses") {
        window.location.hash = "#/courses/onboarding";
        return;
      }
      if (path === "/mentorship") {
        window.location.hash = "#/mentorship/mentee";
        return;
      }
    };
    
    // Check on mount
    handleHashChange();
    
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  
  const tabs = [
    { id: "profile", label: "Profile", icon: User, path: "#/profile" },
    { id: "buddy", label: "Buddy", icon: Users, path: "#/buddy" },
    { id: "courses", label: "Courses", icon: BookOpen, path: "#/courses" },
    { id: "mentorship", label: "Mentorship", icon: GraduationCap, path: "#/mentorship" },
    { id: "rotation", label: "Rotation", icon: ArrowRightLeft, path: "#/rotation" },
    { id: "manager", label: "Manager", icon: BarChart3, path: "#/manager/dashboard" },
    { id: "people", label: "People", icon: Building2, path: "#/people/talent-dashboard" },
  ];
  
  const buddySubTabs = [
    { label: "New Joiner", path: "#/buddy/new-joiner" },
    { label: "Buddy", path: "#/buddy/buddy" },
  ];
  
  const mentorshipSubTabs = [
    { label: "Mentee", path: "#/mentorship/mentee" },
    { label: "Mentor", path: "#/mentorship/mentor" },
  ];
  
  const coursesSubTabs = [
    { label: "Onboarding", path: "#/courses/onboarding" },
    { label: "Recommended Training", path: "#/courses/recommended" },
  ];
  
  const getActiveTab = () => {
    if (currentPath.startsWith("/profile") || currentPath.startsWith("/leveling")) return "profile";
    if (currentPath.startsWith("/buddy")) return "buddy";
    if (currentPath.startsWith("/courses")) return "courses";
    if (currentPath.startsWith("/mentorship")) return "mentorship";
    if (currentPath.startsWith("/rotation")) return "rotation";
    if (currentPath.startsWith("/manager")) return "manager";
    if (currentPath.startsWith("/people")) return "people";
    return "profile";
  };
  
  const renderContent = () => {
    if (currentPath === "/leveling") {
      return <LevelingPage />;
    }
    if (currentPath === "/profile") {
      return <ProfilePage />;
    }
    if (currentPath === "/buddy/new-joiner") {
      return <BuddyNewJoinerPage />;
    }
    if (currentPath === "/buddy/buddy") {
      return <BuddyBuddyPage />;
    }
    if (currentPath === "/buddy") {
      // Will be redirected, but show loading state
      return null;
    }
    if (currentPath === "/courses/onboarding") {
      return <CoursesOnboardingPage />;
    }
    if (currentPath === "/courses/recommended") {
      return <CoursesRecommendedPage />;
    }
    if (currentPath === "/courses") {
      // Will be redirected, but show loading state
      return null;
    }
    if (currentPath === "/mentorship/mentee") {
      return <MentorshipMenteePage />;
    }
    if (currentPath === "/mentorship/mentor") {
      return <MentorshipMentorPage />;
    }
    if (currentPath === "/mentorship") {
      // Will be redirected, but show loading state
      return null;
    }
    if (currentPath === "/rotation") {
      return <RotationPage />;
    }
    if (currentPath === "/manager/dashboard") {
      return <ManagerDashboardPage />;
    }
    if (currentPath === "/people/talent-dashboard") {
      return <PeopleTalentDashboardPage />;
    }
    // Default to profile
    if (currentPath === "" || currentPath === "/") {
      return <ProfilePage />;
    }
    return <ProfilePage />;
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
          {(activeTab === "courses" || activeTab === "buddy" || activeTab === "mentorship") && (
            <div className="flex items-center gap-2 pb-4 border-t border-gray-100 pt-4">
              {activeTab === "courses" &&
                coursesSubTabs.map((subTab) => {
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

