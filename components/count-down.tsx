"use-client";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const [duration, setDuration] = useState<number | string>("");
const [timeLeft, setTimeLeft] = useState<number>(0);
const [isActive, setIsActive] = useState<boolean>(false);
const [isPaused, setIsPasued] = useState<boolean>(false);
const timerRef = useRef<NodeJS.Timeout | null>(null);

//get value from input field and set
const handleSetDuration = (): void => {
  if (typeof duration === "number" && duration > 0) {
    setTimeLeft(duration);
    setIsActive(false);
    setIsPasued(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }

  // when user press start button
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPasued(false);
    }
  };

  //when user press paused button

  const handlePaused = (): void => {
    if (isActive) {
      setIsPasued(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPasued(true);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 0;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);


    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`
    };

    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        
        setDuration(Number(e.target.value) || "");
    };




};
