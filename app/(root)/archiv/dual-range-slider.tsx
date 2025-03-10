"use client";

import { useState, useEffect } from "react";
import ReactSlider from "react-slider";

type DualRangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  currentValue: { min: number; max: number };
  onChange: (range: { min: number; max: number }) => void;
};

export default function DualRangeSlider({
  min: originalMin,
  max: originalMax,
  step = 1,
  currentValue = { min: originalMin, max: originalMax },
  onChange,
}: DualRangeSliderProps) {
  // Local state for display (changes continuously)
  const [range, setRange] = useState<[number, number]>([
    currentValue?.min ?? originalMin,
    currentValue?.max ?? originalMax,
  ]);
  const [isChanging, setIsChanging] = useState(false);

  // Sync with parent only when not actively changing
  useEffect(() => {
    if (!isChanging) {
      setRange([currentValue.min, currentValue.max]);
    }
  }, [currentValue, isChanging]);

  // Transform the range to a slider value (inverted for RTL)
  const sliderMin = 0;
  const sliderMax = originalMax - originalMin;
  const sliderValue: [number, number] = [
    originalMax - range[1],
    originalMax - range[0],
  ];

  // Update slider values using rounding to align with step
  const handleSliderChange = (values: number[]) => {
    setIsChanging(true);
    const rawNewMin = originalMax - values[1];
    const rawNewMax = originalMax - values[0];
    const newMin = Math.max(originalMin, Math.round(rawNewMin / step) * step);
    const newMax = Math.min(originalMax, Math.round(rawNewMax / step) * step);
    setRange([newMin, newMax]);
    // If the values are at their default, mark as not changing
    if (newMin === originalMin && newMax === originalMax) {
      setIsChanging(false);
    } else {
      setIsChanging(true);
    }
  };

  // When the thumb is released, round/clamp values and trigger parent's callback
  const handleSliderAfterChange = (values: number[]) => {
    const rawNewMin = originalMax - values[1];
    const rawNewMax = originalMax - values[0];
    const newMin = Math.max(originalMin, Math.round(rawNewMin / step) * step);
    const newMax = Math.min(originalMax, Math.round(rawNewMax / step) * step);
    setRange([newMin, newMax]);
    onChange({ min: newMin, max: newMax });
  };

  // Handle Number Input Changes
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(Number(e.target.value), range[1] - step);
    setRange([newMin, range[1]]);
    onChange({ min: newMin, max: range[1] });
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(Number(e.target.value), range[0] + step);
    setRange([range[0], newMax]);
    onChange({ min: range[0], max: newMax });
  };

  return (
    <div className="px-6 py-2 text-black/80" style={{ direction: "rtl" }}>
      {/* Number Inputs */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="حداقل"
          value={range[0]}
          min={originalMin}
          max={range[1] - step}
          onChange={handleMinInputChange}
          className={`border px-3 py-2 w-full rounded-md focus:outline-primary transition-all ${
            range[0] > originalMin
              ? "bg-primary/5 text-primary border-primary"
              : "text-gray-600"
          }`}
        />
        <input
          type="number"
          placeholder="حداکثر"
          value={range[1]}
          min={range[0] + step}
          max={originalMax}
          onChange={handleMaxInputChange}
          className={`border px-3 py-2 w-full rounded-md focus:outline-primary transition-all ${
            range[1] < originalMax
              ? "bg-primary/5 text-primary border-primary"
              : "text-gray-600"
          }`}
        />
      </div>

      {/* Dual Range Slider */}
      <div className="mt-6">
        <ReactSlider
          className="slider"
          thumbClassName="thumb"
          trackClassName="track"
          value={sliderValue}
          min={sliderMin}
          max={sliderMax}
          step={step}
          onChange={handleSliderChange}
          onAfterChange={handleSliderAfterChange}
          renderTrack={(props, state) => (
            <div
              {...props}
              className={`track ${
                state.index === 1
                  ? isChanging
                    ? "track-filled-blue"
                    : "track-filled-gray"
                  : "track-empty"
              }`}
            />
          )}
          renderThumb={(props) => (
            <div
              {...props}
              className={`thumb ${isChanging ? "thumb-blue" : "thumb-gray"}`}
            />
          )}
        />
      </div>
    </div>
  );
}
