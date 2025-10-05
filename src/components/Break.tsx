"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { motion } from "motion/react";

const actionableActivities = [
  "Stretch your arms above your head and roll your shoulders.",
  "Walk a quick lap around your car.",
  "Roll your neck slowly side to side.",
  "Step into the shade and close your eyes for 30 seconds.",
  "Take five deep breaths to relax your nervous system.",
  "Sip some water and really notice the temperature and taste.",
  "Open the car windows for a minute of fresh air.",
  "Gaze at something far away to rest your eyes.",
  "Massage your hands, especially the base of your thumbs.",
  "Listen to a calming song.",
  "Eat a small snack mindfully.",
  "Do gentle torso twists while standing.",
  "Write or dictate one quick gratitude note on your phone.",
  "Splash cool water on your face if you're near a restroom.",
  "Look up at the sky and find one cloud or bird to focus on.",
  "Do five slow ankle circles per foot.",
  "Smile intentionally. It releases tension in your jaw and neck.",
  "Do three slow squats to wake up your legs.",
  "Sit quietly and notice three distinct sounds around you.",
];

const CIRCLE_RADIUS = 120;
const SVG_SIDE_LENGTH = 280;

const displayTime = (seconds: number) => {
	const hoursValue = Math.floor(seconds / 3600);
  const minutesValue = Math.floor(seconds % 3600 / 60);
  const secondsValue = seconds % 60;
  const minutesString = minutesValue.toString().padStart(2, "0");
  const secondsString = secondsValue.toString().padStart(2, "0");
	let result = "";
	if (hoursValue > 0) {
		result += `${hoursValue}:`;
	}
	result += `${minutesString}:${secondsString}`;
  return result;
};

export function Break({ onEnd }: { onEnd: () => void }) {
  const [secondsTotal, setSecondsTotal] = useState(60 * 5);
  const [secondsLeft, setSecondsLeft] = useState(secondsTotal);
  const [isRunning, setIsRunning] = useState(true);
  const [activityIndex, setActivityIndex] = useState(
    Math.floor(Math.random() * actionableActivities.length),
  );
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  const percentage = secondsTotal > 0 ? (secondsLeft / secondsTotal) * 100 : 0;

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 0) {
          setIsRunning(false);
          onEndRef.current();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    const activityInterval = setInterval(() => {
      setActivityIndex((prevIndex) => {
        let randomIndex = prevIndex;
        while (randomIndex === prevIndex) {
          randomIndex = Math.floor(Math.random() * actionableActivities.length);
        }
        return randomIndex;
      });
    }, 20000);

    return () => {
      clearInterval(interval);
      clearInterval(activityInterval);
    };
  }, [isRunning]);

  const addBreakTime = (time: number) => {
    setSecondsTotal(Math.max(0, secondsTotal + time));
    setSecondsLeft(Math.max(0, secondsLeft + time));
  };

  return (
    <motion.div
      initial={{ bottom: "100vh" }}
      animate={{ bottom: 0 }}
      exit={{ bottom: "100vh" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-background text-foreground absolute z-20 flex h-screen w-screen flex-col items-center justify-center gap-8"
    >
      <h1 className="text-4xl font-bold">Break time</h1>
      <motion.p
        key={activityIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-muted-foreground h-[2lh] px-8 text-center text-sm"
      >
        {actionableActivities[activityIndex]}
      </motion.p>
      <div className="relative">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold">
          {displayTime(secondsLeft)}
        </p>
        <svg
          width={SVG_SIDE_LENGTH}
          height={SVG_SIDE_LENGTH}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          className="-rotate-90"
        >
          <circle
            r={CIRCLE_RADIUS}
            cx={SVG_SIDE_LENGTH / 2}
            cy={SVG_SIDE_LENGTH / 2}
            className="stroke-foreground/10 fill-transparent stroke-8"
          />
          <circle
            r={CIRCLE_RADIUS}
            cx={SVG_SIDE_LENGTH / 2}
            cy={SVG_SIDE_LENGTH / 2}
            strokeLinecap="round"
            strokeDashoffset={
              2 * Math.PI * CIRCLE_RADIUS * (1 - percentage / 100)
            }
            strokeDasharray={2 * Math.PI * CIRCLE_RADIUS}
            className="stroke-foreground fill-transparent stroke-16 transition-all duration-1000"
          />
        </svg>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => {
            addBreakTime(60 * 5);
            setIsRunning(true);
          }}
          className="cursor-pointer"
        >
          <Plus />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => addBreakTime(-60 * 5)}
          className="cursor-pointer"
        >
          <Minus />
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => {
            setSecondsLeft(0);
            setSecondsTotal(0);
            setIsRunning(false);
            onEnd();
          }}
          className="cursor-pointer"
        >
          End break
        </Button>
        {/* <Button variant="secondary">Hide break screen</Button> */}
      </div>
    </motion.div>
  );
}
