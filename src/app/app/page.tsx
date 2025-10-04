"use client";

import { Break } from "@/components/Break";
import { Button } from "@/components/ui/button";
import { Car, Check, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  deltaSeconds: number;
  text: string;
  type: "suggestion" | "break";
};

const mockTimeline: Item[] = [
  {
    id: "1",
    deltaSeconds: 0,
    text: "Get to Rijswijk after this ride.",
    type: "suggestion",
  },
  {
    id: "2",
    deltaSeconds: 2,
    text: "Avoid the traffic jam on the A27.",
    type: "suggestion",
  },
  {
    id: "3",
    deltaSeconds: 3,
    text: "You've been driving for a while. Take a break?",
    type: "break",
  },
];

function SuggestionCard({
  text,
  onConfirm,
  onReject,
}: {
  text: string;
  onConfirm?: () => void;
  onReject?: () => void;
}) {
  return (
    <motion.div
      className="bg-card flex flex-col gap-2 p-4 shadow-lg"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row items-center gap-2">
        <Star className="text-ai w-4 h-4" strokeWidth={3} />
        <p className="text-ai text-sm font-bold tracking-wider uppercase">
          AI Suggestion
        </p>
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="text-lg font-semibold">{text}</p>
        <div className="flex flex-row gap-2">
          <Button size="icon" className="rounded-full" onClick={onConfirm}>
            <Check />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onClick={onReject}
          >
            <X />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function SPA() {
  const [isBreak, setIsBreak] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    for (const item of mockTimeline) {
      timeouts.push(
        setTimeout(() => {
          setItems((prevItems) => [...prevItems, item]);
        }, item.deltaSeconds * 1000),
      );
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      <AnimatePresence>
        {isBreak && <Break onEnd={() => setIsBreak(false)} />}
      </AnimatePresence>
      <div className="flex h-screen w-screen flex-col">
        <div className="bg-background text-foreground flex h-full flex-col gap-4 p-8">
          <AnimatePresence>
            {items.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2">
                <Car
                  className="text-muted-foreground h-20 w-20"
                  strokeWidth={0.5}
                />
                <p className="text-muted-foreground text-sm">
                  Items will appear as you drive
                </p>
              </motion.div>
            )}
            {items
              .sort((a, b) => b.deltaSeconds - a.deltaSeconds)
              .map((item) => {
                if (item.type === "suggestion") {
                  return (
                    <SuggestionCard
                      key={item.text}
                      text={item.text}
                      onConfirm={() =>
                        setItems((prevItems) =>
                          prevItems.filter((i) => i.id !== item.id),
                        )
                      }
                      onReject={() =>
                        setItems((prevItems) =>
                          prevItems.filter((i) => i.id !== item.id),
                        )
                      }
                    />
                  );
                }
                if (item.type === "break") {
                  return (
                    <SuggestionCard
                      key={item.text}
                      text={item.text}
                      onConfirm={() => {
                        setIsBreak(true);
                        setItems((prevItems) =>
                          prevItems.filter((i) => i.id !== item.id),
                        );
                      }}
                      onReject={() =>
                        setItems((prevItems) =>
                          prevItems.filter((i) => i.id !== item.id),
                        )
                      }
                    />
                  );
                }
              })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
