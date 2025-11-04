import { create } from 'zustand';
import type { Feedback, ActionPlanItem, BuddyCourseAllocation, RotationSuggestion } from '../types';

interface AppState {
  // Journey items completion
  completedItems: string[];
  toggleItemCompletion: (itemId: string, userId: string) => void;
  
  // Feedback
  feedbacks: Feedback[];
  addFeedback: (feedback: Feedback) => void;
  
  // Action plan items
  actionPlanItems: ActionPlanItem[];
  updateActionPlanItem: (itemId: string, updates: Partial<ActionPlanItem>) => void;
  addActionPlanItem: (item: ActionPlanItem) => void;
  
  // Buddy course allocations
  buddyCourseAllocations: BuddyCourseAllocation[];
  allocateCourse: (allocation: BuddyCourseAllocation) => void;
  
  // Rotation suggestions
  rotationSuggestions: RotationSuggestion[];
  addRotationSuggestion: (suggestion: RotationSuggestion) => void;
  updateRotationSuggestion: (id: string, status: "pending" | "accepted" | "rejected") => void;
}

export const useStore = create<AppState>((set) => ({
  completedItems: [],
  feedbacks: [],
  actionPlanItems: [],
  buddyCourseAllocations: [],
  rotationSuggestions: [],
  
  toggleItemCompletion: (itemId, userId) => {
    set((state) => {
      // For simplicity, we'll track completion per item
      // In a real app, this would be more sophisticated
      const itemCompleted = state.completedItems.includes(`${itemId}_${userId}`);
      
      if (itemCompleted) {
        return {
          completedItems: state.completedItems.filter(
            (id) => id !== `${itemId}_${userId}`
          ),
        };
      } else {
        return {
          completedItems: [...state.completedItems, `${itemId}_${userId}`],
        };
      }
    });
  },
  
  addFeedback: (feedback) => {
    set((state) => ({
      feedbacks: [...state.feedbacks, feedback],
    }));
  },
  
  updateActionPlanItem: (itemId, updates) => {
    set((state) => ({
      actionPlanItems: state.actionPlanItems.map((item) =>
        item.id === itemId ? { ...item, ...updates } : item
      ),
    }));
  },
  
  addActionPlanItem: (item) => {
    set((state) => ({
      actionPlanItems: [...state.actionPlanItems, item],
    }));
  },
  
  allocateCourse: (allocation) => {
    set((state) => ({
      buddyCourseAllocations: [...state.buddyCourseAllocations, allocation],
    }));
  },
  
  addRotationSuggestion: (suggestion) => {
    set((state) => ({
      rotationSuggestions: [...state.rotationSuggestions, suggestion],
    }));
  },
  
  updateRotationSuggestion: (id, status) => {
    set((state) => ({
      rotationSuggestions: state.rotationSuggestions.map((suggestion) =>
        suggestion.id === id ? { ...suggestion, status } : suggestion
      ),
    }));
  },
}));

