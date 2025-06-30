// src/components/SpinWheel.js
import React, { useRef, useEffect, useState, useCallback, useImperativeHandle } from 'react';
import { prizes } from '../utils/wheelLogic';

const SpinWheel = React.forwardRef(({ onSpinEnd, isSpinning, setIsSpinning }, ref) => {
  const canvasRef = useRef(null);
  const [rotation, setRotation] = useState(0); // Current rotation angle in radians
  const PI2 = Math.PI * 2; // 360 degrees in radians

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.9; // Adjust radius for padding

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    const arcSize = PI2 / prizes.length;

    prizes.forEach((prize, i) => {
      const startAngle = rotation + i * arcSize;
      const endAngle = startAngle + arcSize;

      // Draw segment
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = prize.color;
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF'; // White border for segments
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      // Adjust rotation for text: it should be centered within its segment, and rotated so it's readable
      // + PI / 2 aligns text vertically when it's drawn outwards from center (like a spoke)
      ctx.rotate(startAngle + arcSize / 2 + Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillStyle = prize.color === "#F7B731" ? "#333333" : "#FFFFFF"; // Black text on gold, white on others
      ctx.font = 'bold 16px Inter'; // Use Inter font
      ctx.fillText(prize.name, 0, -radius * 0.75); // Position text outwards from center
      ctx.restore();
    });

    // Draw central circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, PI2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw pointer (red triangle at the top)
    ctx.beginPath();
    ctx.moveTo(centerX - 15, centerY - radius - 20); // Top-left of triangle
    ctx.lineTo(centerX + 15, centerY - radius - 20); // Top-right of triangle
    ctx.lineTo(centerX, centerY - radius + 5);      // Bottom-center of triangle
    ctx.closePath();
    ctx.fillStyle = '#DC3545'; // Red pointer
    ctx.fill();
    ctx.strokeStyle = '#A0A0A0';
    ctx.lineWidth = 1;
    ctx.stroke();

  }, [rotation]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  useImperativeHandle(ref, () => ({
    spin: (finalPrizeIndex) => {
      if (isSpinning) return;

      setIsSpinning(true);

      const canvas = canvasRef.current;
      if (!canvas) return;

      const arcSize = PI2 / prizes.length;

      // === CRITICAL FIX FOR LANDING PRECISION ===
      // 1. Define the angle on the canvas where the pointer is located (top).
      const pointerAngleOnCanvas = 3 * Math.PI / 2; // 270 degrees (12 o'clock)

      // 2. Calculate the angle of the *center* of the target prize segment
      //    relative to the wheel's own 0-degree mark (which is 3 o'clock).
      const prizeCenterAngleOnWheel = finalPrizeIndex * arcSize + arcSize / 2;

      // 3. Determine the specific rotation needed to bring `prizeCenterAngleOnWheel`
      //    to align with `pointerAngleOnCanvas`.
      //    This is `(pointerAngleOnCanvas - prizeCenterAngleOnWheel)`
      //    We add PI2 and use modulo to ensure it's a positive angle in the 0 to PI2 range.
      let angleToLandPrecisely = (pointerAngleOnCanvas - prizeCenterAngleOnWheel + PI2) % PI2;

      // 4. Add multiple full rotations to ensure a long, suspenseful spin.
      //    The `totalSpinDegrees` must be the current `rotation` plus the total spin amount.
      const minFullRotations = 10;
      // We want to spin `minFullRotations` times AND end up at `angleToLandPrecisely`.
      // Since `setRotation` takes the absolute current rotation, we simply need `totalSpinDegrees`
      // to be the absolute target rotation after spinning `minFullRotations`.
      const totalSpinDegrees = (minFullRotations * PI2) + angleToLandPrecisely;
      // === END CRITICAL FIX ===


      const animationDuration = 5000; // 5 seconds in milliseconds
      let startTime = null;
      let animationFrameId;

      const animateSpin = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);

        // Easing function: Ease Out Quart (starts fast, ends slow)
        const easedProgress = 1 - Math.pow(1 - progress, 4);

        // Calculate current rotation based on eased progress
        // The rotation goes from 0 (initial) to totalSpinDegrees
        const currentSpin = totalSpinDegrees * easedProgress;

        // Apply a small random offset at the very end to prevent it from always stopping exactly center
        // This makes it feel more "random" within the segment.
        let adjustedSpin = currentSpin;
        if (progress === 1) { // Apply offset only when animation is truly finished
            const finalOffset = (Math.random() - 0.5) * (arcSize * 0.1); // +/- 5% of segment width
            adjustedSpin = totalSpinDegrees + finalOffset; // Ensure it adds to the final target
        }

        // Update the state with the new rotation, keeping it within 0 and 2*PI
        setRotation(adjustedSpin % PI2);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animateSpin);
        } else {
          // Animation finished
          setIsSpinning(false);
          // Pass the prize name that corresponds to the final index
          onSpinEnd(prizes[finalPrizeIndex].name); // Use the original determined prize name
          cancelAnimationFrame(animationFrameId);
        }
      };

      animationFrameId = requestAnimationFrame(animateSpin);
    }
  }));

  return (
    <div className="relative w-full max-w-sm sm:max-w-md mx-auto aspect-square">
      <canvas
        ref={canvasRef}
        width="600"
        height="600"
        className="w-full h-full rounded-full shadow-2xl bg-white"
      ></canvas>
    </div>
  );
});

export default SpinWheel;