"use client";

import { Break } from "@/components/Break";
import HexMap, {
  type Hex,
  type Marker,
  type ViewState,
} from "@/components/HexMap";
import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { ArrowLeft, Car, Check, Pause, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
  onDisappear,
}: {
  type: Item["type"];
  text: string;
  onConfirm?: () => void;
  hasConfirm: boolean;
  onReject?: () => void;
  onDisappear: () => void;
}) {
  const DURATION = 10000;
  const [remainingTime, setRemainingTime] = useState(DURATION);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const newTime = prev - 100;
        if (newTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newTime;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (remainingTime <= 0) {
    onDisappear();
  }

  const progressWidth = (remainingTime / DURATION) * 100;

  return (
    <motion.div
      className="bg-card flex flex-col shadow-lg"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-2 p-4">
        {type === "suggestion" && (
          <div className="flex flex-row items-center gap-2">
            <Star className="text-ai h-4 w-4" strokeWidth={3} />
            <p className="text-ai text-sm font-bold tracking-wider uppercase">
              AI Suggestion
            </p>
          </div>
        )}
        {type === "break" && (
          <div className="flex flex-row items-center gap-2">
            <Pause className="text-break h-4 w-4" strokeWidth={3} />
            <p className="text-break text-sm font-bold tracking-wider uppercase">
              Break
            </p>
          </div>
        )}
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="text-lg font-semibold">{text}</p>
          <div className="flex flex-row gap-2">
            {hasConfirm && (
              <Button
                size="icon"
                className="cursor-pointer rounded-full"
                onClick={onConfirm}
              >
                <Check />
              </Button>
            )}
            <Button
              size="icon"
              variant="secondary"
              className="cursor-pointer rounded-full"
              onClick={onReject}
            >
              <X />
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-muted h-2 w-full overflow-hidden">
        <div
          className="bg-foreground h-full transition-all duration-100 ease-linear"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </motion.div>
  );
}

export default function SPA() {
  const INITIAL_VIEW_STATE: ViewState = {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 12,
    pitch: 45,
    bearing: 0,
  };

  const [isBreak, setIsBreak] = useState(false);
  const [items, setItems] = useState<ItemWithTimestamp[]>([]);
  const [hex, setHex] = useState<Hex[] | null>(null);
  const [marker, setMarker] = useState<Marker | null>(null);
  const [initialViewState, setInitialViewState] =
    useState<ViewState>(INITIAL_VIEW_STATE);

  const router = useRouter();

  const handleBreakEnd = useCallback(() => {
    setIsBreak(false);
  }, []);

  useEffect(() => {
    function onInitialize(viewState: ViewState) {
      setInitialViewState(viewState);
    }

    function onSuggestion(item: Item) {
      setItems((prevItems) => [
        ...prevItems,
        { ...item, timestamp: Date.now() },
      ]);
    }

    function onHex(hex: Hex[]) {
      setHex(hex);
    }
    function onMarker(marker: Marker) {
      setMarker(marker);
    }

    function onConnect() {
      socket?.emit("request-initialize");
    }

    socket?.on("initialize", onInitialize);
    socket?.on("suggestion", onSuggestion);
    socket?.on("hex", onHex);
    socket?.on("marker", onMarker);
    socket?.on("connect", onConnect);

    // Always request initialization when component mounts
    socket?.emit("request-initialize");

    return () => {
      socket?.off("initialize", onInitialize);
      socket?.off("suggestion", onSuggestion);
      socket?.off("hex", onHex);
      socket?.off("marker", onMarker);
      socket?.off("connect", onConnect);
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="bg-foreground text-background absolute z-5 flex h-16 w-full items-center border-b px-4">
        <Button
          variant="ghost"
          size="icon"
          className="hover:!bg-background/10 hover:text-background cursor-pointer rounded-full"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-6" />
        </Button>
        <p className="absolute left-1/2 -translate-x-1/2 font-light">
          DriveNet
        </p>
      </div>
      <AnimatePresence>
        {isBreak && <Break onEnd={handleBreakEnd} />}
      </AnimatePresence>
      {initialViewState && (
        <HexMap hex={hex} marker={marker} viewState={initialViewState} />
      )}
      <div className="flex h-screen w-screen flex-col">
        <div className="bg-background text-foreground flex h-full flex-col gap-4 p-8 pt-24">
          <AnimatePresence>
            {items.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2"
              >
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
                      onDisappear={() =>
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
                      onDisappear={() =>
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
