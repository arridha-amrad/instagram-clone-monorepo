import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Target = {
  username: string;
  postId: string;
  commentId: string;
};

type ReplyState = {
  target: Target | null;
  setTarget: (target: Target) => void;
  clearTarget: () => void;
};

export const useReplyStore = create<ReplyState>()(
  persist(
    devtools(
      (set) => ({
        target: null,
        setTarget: (target) => set({ target }),
        clearTarget: () => set({ target: null }),
      }),
      {
        anonymousActionType: "use-reply-store",
      },
    ),
    {
      name: "reply-storage",
    },
  ),
);
