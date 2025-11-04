import { useState } from "react";
import { Star, Send } from "lucide-react";
import type { Feedback } from "../types";
import { useStore } from "../store/useStore";

interface FeedbackFormProps {
  type: "buddy_new_joiner" | "buddy_buddy" | "mentee" | "mentor";
  fromUserId: string;
  toUserId?: string;
  onSubmit?: () => void;
}

export function FeedbackForm({
  type,
  fromUserId,
  toUserId,
  onSubmit,
}: FeedbackFormProps) {
  const { addFeedback } = useStore();
  const [ratingOverall, setRatingOverall] = useState(0);
  const [ratingSupport, setRatingSupport] = useState(0);
  const [ratingClarity, setRatingClarity] = useState(0);
  const [comments, setComments] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const feedback: Feedback = {
      id: `feedback_${Date.now()}`,
      type,
      fromUserId,
      toUserId,
      ratingOverall,
      ratingSupport: type.includes("buddy") ? ratingSupport : undefined,
      ratingClarity: type.includes("buddy") ? ratingClarity : undefined,
      comments,
    };
    
    addFeedback(feedback);
    onSubmit?.();
    
    // Reset form
    setRatingOverall(0);
    setRatingSupport(0);
    setRatingClarity(0);
    setComments("");
  };
  
  const StarRating = ({
    rating,
    setRating,
    label,
  }: {
    rating: number;
    setRating: (rating: number) => void;
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            className="focus:outline-none"
          >
            <Star
              className={`w-6 h-6 ${
                value <= rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
  
  return (
    <form onSubmit={handleSubmit} className="card space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Feedback</h3>
      
      <StarRating
        rating={ratingOverall}
        setRating={setRatingOverall}
        label="Overall Rating"
      />
      
      {type.includes("buddy") && (
        <>
          <StarRating
            rating={ratingSupport}
            setRating={setRatingSupport}
            label="Buddy Support"
          />
          <StarRating
            rating={ratingClarity}
            setRating={setRatingClarity}
            label="Clarity of Expectations"
          />
        </>
      )}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Comments
        </label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Share your thoughts..."
        />
      </div>
      
      <button
        type="submit"
        className="btn-primary flex items-center gap-2"
        disabled={ratingOverall === 0}
      >
        <Send className="w-4 h-4" />
        Submit Feedback
      </button>
    </form>
  );
}

