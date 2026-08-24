"use client";

import FrameSequence, {
  generateFramePaths,
} from "@/app/components/common/FrameSequence";

const sequence1 = generateFramePaths({
  basePath: "/animations/sequence-1",
});

const sequence2 = generateFramePaths({
  basePath: "/animations/sequence-2",
});

// const sequence3 = generateFramePaths({
//   basePath: "/animations/sequence-1",
// });

export default function RecognitionTween() {
  return (
    <FrameSequence sequences={[sequence1, sequence2]} className="w-full" />
  );
}
