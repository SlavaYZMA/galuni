import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface InlineTermProps {
  term: string;
  description: string;
}

export default function InlineTerm({ term, description }: InlineTermProps) {
  const [open, setOpen] = useState(false);

  return (
    <HoverCard openDelay={200} closeDelay={100} open={open} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        <span
          data-hover
          onClick={() => setOpen((v) => !v)}
          className="cursor-help underline decoration-dashed decoration-primary/50 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {term}
        </span>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="center"
        className="max-w-[300px] bg-popover text-popover-foreground text-sm p-4 rounded-md shadow-md z-50 border border-primary/20"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", lineHeight: 1.6 }}
      >
        <p className="text-primary/60 text-[0.55rem] uppercase tracking-widest mb-2">
          {term}
        </p>
        <p>{description}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
