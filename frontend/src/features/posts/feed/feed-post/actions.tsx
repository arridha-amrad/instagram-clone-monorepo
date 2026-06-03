import { SendIcon } from "lucide-react";

export default function Actions({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">{children}</div>
      <button className="flex items-center gap-2">
        <SendIcon />
      </button>
    </div>
  );
}
