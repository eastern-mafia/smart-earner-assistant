"use client";

import { Break } from "@/components/Break";
import HexMap, { type Hex, type Marker, type ViewState } from "@/components/HexMap";
import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { Car, Check, Pause, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  text: string;
  type: "suggestion" | "break";
};

type ItemWithTimestamp = Item & {
  timestamp: number;
};

function SuggestionCard({
	type,
  text,
  onConfirm,
	hasConfirm,
  onReject,
}: {
	type: Item["type"];
  text: string;
  onConfirm?: () => void;
  hasConfirm: boolean;
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
			{type === "suggestion" && (
				<div className="flex flex-row items-center gap-2">
					<Star className="text-ai w-4 h-4" strokeWidth={3} />
					<p className="text-ai text-sm font-bold tracking-wider uppercase">
						AI Suggestion
					</p>
				</div>
			)}
			{type === "break" && (
				<div className="flex flex-row items-center gap-2">
					<Pause className="text-break w-4 h-4" strokeWidth={3} />
					<p className="text-break text-sm font-bold tracking-wider uppercase">
						Break
					</p>
				</div>
			)}
      <div className="flex flex-row items-center justify-between gap-2">
        <p className="text-lg font-semibold">{text}</p>
        <div className="flex flex-row gap-2">
					{hasConfirm && (
          <Button size="icon" className="rounded-full" onClick={onConfirm}>
            <Check />
          </Button>
					)}
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
  const [items, setItems] = useState<ItemWithTimestamp[]>([]);
	const [hex, setHex] = useState<Hex[] | null>(null);
	const [marker, setMarker] = useState<Marker | null>(null);
	const [initialViewState, setInitialViewState] = useState<ViewState | null>(null);

  useEffect(() => {
		function onInitialize(viewState: ViewState) {
			setInitialViewState(viewState);
		}

		function onSuggestion(item: Item) {
			setItems((prevItems) => [...prevItems, { ...item, timestamp: Date.now() }]);
		}

		function onHex(hex: Hex[]) {
			setHex(hex);
		}
		function onMarker(marker: Marker) {
			setMarker(marker);
		}

		socket.on("initialize", onInitialize);
		socket.on("suggestion", onSuggestion);
		socket.on("hex", onHex);
		socket.on("marker", onMarker);

		if (socket.connected) {
			socket.emit("request-initialize");
		}

		return () => {
			socket.off("initialize", onInitialize);
			socket.off("suggestion", onSuggestion);
			socket.off("hex", onHex);
			socket.off("marker", onMarker);
		};
  }, []);

  return (
    <div className="h-screen w-screen">
      <AnimatePresence>
        {isBreak && <Break onEnd={() => setIsBreak(false)} />}
      </AnimatePresence>
			{initialViewState && <HexMap hex={hex} marker={marker} viewState={initialViewState} />}
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
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((item) => {
                if (item.type === "suggestion") {
                  return (
                    <SuggestionCard
                      key={item.id}
                      type="suggestion"
                      text={item.text}
                      hasConfirm={false}
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
                      key={item.id}
                      type="break"
                      text={item.text}
                      hasConfirm={true}
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
