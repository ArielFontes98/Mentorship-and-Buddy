import type { JourneyItem } from "../types";
import { JourneyItemCard } from "./JourneyItemCard";

interface JourneyTimelineProps {
  items: JourneyItem[];
  userId: string;
  groupBy?: "week" | "month" | "none";
  showOwner?: boolean;
}

export function JourneyTimeline({
  items,
  userId,
  groupBy = "none",
  showOwner = true,
}: JourneyTimelineProps) {
  const groupItems = () => {
    if (groupBy === "week") {
      const groups: { [key: string]: JourneyItem[] } = {};
      
      items.forEach((item) => {
        let groupKey = "Other";
        if (item.dueDay) {
          if (item.dueDay <= 7) groupKey = "Week 1";
          else if (item.dueDay <= 28) groupKey = "Week 2-4";
          else if (item.dueDay <= 60) groupKey = "Month 2";
          else groupKey = "Month 3";
        }
        
        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(item);
      });
      
      return groups;
    }
    
    if (groupBy === "month") {
      const groups: { [key: string]: JourneyItem[] } = {};
      
      items.forEach((item) => {
        if (item.dueDate) {
          const date = new Date(item.dueDate);
          const groupKey = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
          
          if (!groups[groupKey]) groups[groupKey] = [];
          groups[groupKey].push(item);
        } else {
          if (!groups["Other"]) groups["Other"] = [];
          groups["Other"].push(item);
        }
      });
      
      return groups;
    }
    
    return { All: items };
  };
  
  const grouped = groupItems();
  
  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([groupName, groupItems]) => (
        <div key={groupName}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{groupName}</h3>
          <div className="space-y-3">
            {groupItems.map((item) => (
              <JourneyItemCard
                key={item.id}
                item={item}
                userId={userId}
                showOwner={showOwner}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

