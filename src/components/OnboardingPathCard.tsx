import { BookOpen, Clock } from "lucide-react";
import type { OnboardingPath } from "../types";
import { courses } from "../mock/coursesData";

interface OnboardingPathCardProps {
  path: OnboardingPath;
  onStart?: (pathId: string) => void;
}

export function OnboardingPathCard({ path, onStart }: OnboardingPathCardProps) {
  const pathCourses = courses.filter((c) => path.courses.includes(c.id));

  return (
    <div className="card hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-semibold text-gray-900">{path.title}</h3>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4">{path.description}</p>

      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <Clock className="w-4 h-4" />
        <span>{path.estimatedTotalMinutes} min total</span>
        <span className="text-gray-400">•</span>
        <span>{path.courses.length} courses</span>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Course Path:</p>
        <div className="space-y-2">
          {pathCourses.map((course, idx) => (
            <div
              key={course.id}
              className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded"
            >
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-medium">
                {idx + 1}
              </span>
              <span className="flex-1">{course.title}</span>
              <span className="text-xs text-gray-500">{course.estimatedMinutes} min</span>
            </div>
          ))}
        </div>
      </div>

      {onStart && (
        <button onClick={() => onStart(path.id)} className="btn-primary w-full">
          Start Onboarding Path
        </button>
      )}
    </div>
  );
}

