import { onboardingPaths } from "../mock/coursesData";
import { OnboardingPathCard } from "../components/OnboardingPathCard";
import { BookOpen } from "lucide-react";

export function CoursesOnboardingPage() {
  const handleStartPath = (pathId: string) => {
    alert(`Starting onboarding path: ${pathId}`);
    // In a real app, this would track progress
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Onboarding Paths</h1>
          </div>
          <p className="text-lg text-gray-600 mb-1">
            Structured learning paths for new joiners
          </p>
          <p className="text-sm text-gray-500">
            Follow a curated sequence of courses designed for your role
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {onboardingPaths.map((path) => (
            <OnboardingPathCard
              key={path.id}
              path={path}
              onStart={handleStartPath}
            />
          ))}
        </div>

        {onboardingPaths.length === 0 && (
          <div className="card text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No onboarding paths available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

