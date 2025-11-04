import { BookOpen, Clock, Tag } from "lucide-react";
import type { Course } from "../types";

interface CourseCardProps {
  course: Course;
  onSelect?: (courseId: string) => void;
  showActions?: boolean;
}

export function CourseCard({ course, onSelect, showActions = false }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getFormatIcon = () => {
    switch (course.format) {
      case "video":
        return "🎥";
      case "interactive":
        return "🖱️";
      case "workshop":
        return "👥";
      default:
        return "📖";
    }
  };

  return (
    <div className="card hover:shadow-lg transition-all cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-900">{course.title}</h3>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
          {course.level}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{course.description}</p>

      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{course.estimatedMinutes} min</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{getFormatIcon()}</span>
          <span className="capitalize">{course.format}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="w-3 h-3" />
          <span>{course.category}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-medium text-gray-700 mb-2">Skills Developed:</p>
        <div className="flex flex-wrap gap-2">
          {course.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {showActions && onSelect && (
        <button
          onClick={() => onSelect(course.id)}
          className="btn-primary w-full"
        >
          Start Course
        </button>
      )}
    </div>
  );
}

