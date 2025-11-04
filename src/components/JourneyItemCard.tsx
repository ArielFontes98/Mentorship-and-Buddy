import { CheckCircle2, Circle, Clock, BookOpen, Target, MessageSquare } from "lucide-react";
import type { JourneyItem } from "../types";
import { useStore } from "../store/useStore";

interface JourneyItemCardProps {
  item: JourneyItem;
  userId: string;
  showOwner?: boolean;
}

export function JourneyItemCard({ item, userId, showOwner = true }: JourneyItemCardProps) {
  const { completedItems, toggleItemCompletion } = useStore();
  const isCompleted = completedItems.includes(`${item.id}_${userId}`);
  
  const getTypeIcon = () => {
    switch (item.type) {
      case "training":
        return <BookOpen className="w-4 h-4" />;
      case "mission":
        return <Target className="w-4 h-4" />;
      case "checkin":
        return <MessageSquare className="w-4 h-4" />;
      case "reflection":
        return <Circle className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };
  
  const getTypeLabel = () => {
    switch (item.type) {
      case "training":
        return "Training";
      case "mission":
        return "Mission";
      case "checkin":
        return "Check-in";
      case "reflection":
        return "Reflection";
      default:
        return "Item";
    }
  };
  
  const getOwnerLabel = () => {
    switch (item.owner) {
      case "new_joiner":
        return "New Joiner";
      case "buddy":
        return "Buddy";
      case "mentee":
        return "Mentee";
      case "mentor":
        return "Mentor";
      case "both":
        return "Both";
      default:
        return "";
    }
  };
  
  const getStatusColor = () => {
    if (isCompleted) return "bg-green-50 border-green-200";
    return "bg-white border-gray-200";
  };
  
  return (
    <div className={`card ${getStatusColor()} transition-all hover:shadow-md`}>
      <div className="flex items-start gap-4">
        <button
          onClick={() => toggleItemCompletion(item.id, userId)}
          className="mt-1 flex-shrink-0"
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300" />
          )}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-primary-600">
              {getTypeIcon()}
              <span>{getTypeLabel()}</span>
            </div>
            {!item.required && (
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                Optional
              </span>
            )}
            {showOwner && item.owner !== "both" && (
              <span className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs">
                {getOwnerLabel()}
              </span>
            )}
          </div>
          
          <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            {item.estimatedMinutes && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{item.estimatedMinutes} min</span>
              </div>
            )}
            {item.dueDay && (
              <span>Due: Day {item.dueDay}</span>
            )}
            {item.dueDate && (
              <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

