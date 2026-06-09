import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Smile } from "lucide-react";

export default function FormComment() {
  return (
    <div className="flex items-center gap-x-2 px-4">
      <button>
        <Smile />
      </button>
      <Input placeholder="Write comment..." />
      <Button>Send</Button>
    </div>
  );
}
