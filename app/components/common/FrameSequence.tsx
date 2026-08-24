"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const FPS = 24;

type FrameSequenceProps = {
  sequences: string[][];
  className?: string;
  imageClassName?: string;
};

export function generateFramePaths({
  basePath,
  frameCount = 100,
  prefix = "frame_",
  extension = "png",
  startFrame = 1,
}: {
  basePath: string;
  frameCount?: number;
  prefix?: string;
  extension?: string;
  startFrame?: number;
}) {
  return Array.from({ length: frameCount }, (_, index) => {
    const frameNumber = startFrame + index;
    const paddedFrame = String(frameNumber).padStart(5, "0");

    return `${basePath}/${prefix}${paddedFrame}.${extension}`;
  });
}

export default function FrameSequence({
  sequences,
  className = "",
  imageClassName = "",
}: FrameSequenceProps) {
  const [currentSequence, setCurrentSequence] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);

  const frameRef = useRef(0);
  const sequenceRef = useRef(0);

  const validSequences = useMemo(
    () => sequences.filter((sequence) => sequence.length > 0),
    [sequences],
  );

  useEffect(() => {
    if (!validSequences.length) return;

    const frameDuration = 1000 / FPS;

    let animationFrameId: number;
    let previousTime = performance.now();
    let accumulatedTime = 0;

    const animate = (time: number) => {
      accumulatedTime += time - previousTime;
      previousTime = time;

      while (accumulatedTime >= frameDuration) {
        accumulatedTime -= frameDuration;

        frameRef.current += 1;

        const currentSequenceFrames = validSequences[sequenceRef.current];

        if (frameRef.current >= currentSequenceFrames.length) {
          frameRef.current = 0;

          sequenceRef.current =
            (sequenceRef.current + 1) % validSequences.length;

          setCurrentSequence(sequenceRef.current);
        }

        setCurrentFrame(frameRef.current);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [validSequences]);

  if (!validSequences.length) return null;

  const src =
    validSequences[currentSequence]?.[currentFrame] ?? validSequences[0][0];

  return (
    <div className={`w-full ${className}`}>
      <img
        src={src}
        alt=""
        draggable={false}
        className={`block h-auto w-full ${imageClassName}`}
      />
    </div>
  );
}
