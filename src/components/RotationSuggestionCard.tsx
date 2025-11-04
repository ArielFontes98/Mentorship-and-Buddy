import { Building2, MapPin, CheckCircle2, XCircle, Clock } from "lucide-react";
import type { RotationSuggestion } from "../types";

interface RotationSuggestionCardProps {
  suggestion: RotationSuggestion;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  canAccept?: boolean;
}

export function RotationSuggestionCard({
  suggestion,
  onAccept,
  onReject,
  canAccept = false,
}: RotationSuggestionCardProps) {
  const getStatusIcon = () => {
    switch (suggestion.status) {
      case "accepted":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = () => {
    switch (suggestion.status) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusLabel = () => {
    switch (suggestion.status) {
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      default:
        return "Pending";
    }
  };

  return (
    <div className={`card border-2 ${getStatusColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Rotation Suggestion</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            {getStatusIcon()}
            <span className="font-medium">{getStatusLabel()}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor()}`}>
          {getStatusLabel()}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="w-4 h-4 text-gray-500" />
          <span className="font-medium">{suggestion.destination.bu}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Chapter:</span>
          <span className="font-medium">{suggestion.destination.chapter}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Function:</span>
          <span className="font-medium">{suggestion.destination.function}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span>{suggestion.destination.country}</span>
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-700 mb-1">Reason:</p>
        <p className="text-sm text-gray-600">{suggestion.reason}</p>
      </div>

      <div className="text-xs text-gray-500">
        Suggested on {new Date(suggestion.createdAt).toLocaleDateString()}
      </div>

      {canAccept && suggestion.status === "pending" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onAccept?.(suggestion.id)}
            className="flex-1 btn-primary text-sm"
          >
            Accept
          </button>
          <button
            onClick={() => onReject?.(suggestion.id)}
            className="flex-1 btn-secondary text-sm"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

