import { CheckCircle2, Circle, Clock, Plus } from "lucide-react";
import type { ActionPlanItem } from "../types";
import { useStore } from "../store/useStore";

interface ActionPlanTableProps {
  items: ActionPlanItem[];
  mentorshipId?: string;
  canEdit?: boolean;
}

export function ActionPlanTable({
  items,
  mentorshipId: _mentorshipId,
  canEdit = false,
}: ActionPlanTableProps) {
  const { updateActionPlanItem } = useStore();
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-primary-600" />;
      default:
        return <Circle className="w-5 h-5 text-gray-300" />;
    }
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "done":
        return "Done";
      case "in_progress":
        return "In Progress";
      default:
        return "Open";
    }
  };
  
  const handleStatusChange = (itemId: string, newStatus: string) => {
    updateActionPlanItem(itemId, { status: newStatus as "open" | "in_progress" | "done" });
  };
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Action Plan</h3>
        {canEdit && (
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Title</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Description</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Owner</th>
              {canEdit && (
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={canEdit ? 5 : 4} className="text-center py-8 text-gray-500">
                  No action plan items yet
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm text-gray-600">{getStatusLabel(item.status)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{item.title}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-gray-600">{item.description}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded text-xs font-medium">
                      {item.owner === "both" ? "Both" : item.owner === "mentee" ? "Mentee" : "Mentor"}
                    </span>
                  </td>
                  {canEdit && (
                    <td className="py-3 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

