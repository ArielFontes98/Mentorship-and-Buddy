import { TrendingUp, CheckCircle2 } from "lucide-react";

interface MatchingExplanationCardProps {
  title: string;
  suggestions: {
    id: string;
    score: number;
    explanation: string[];
  }[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export function MatchingExplanationCard({
  title,
  suggestions,
  selectedId,
  onSelect,
}: MatchingExplanationCardProps) {
  if (suggestions.length === 0) {
    return null;
  }
  
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedId === suggestion.id
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 bg-white hover:border-primary-300"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary-600">
                  {suggestion.score}
                </span>
                <span className="text-sm text-gray-500">/100</span>
              </div>
              {onSelect && (
                <button
                  onClick={() => onSelect(suggestion.id)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedId === suggestion.id
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedId === suggestion.id ? "Selected" : "Select"}
                </button>
              )}
            </div>
            
            <div className="space-y-1.5">
              {suggestion.explanation.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

