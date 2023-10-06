"use client";

import * as RadixSlider from "@radix-ui/react-slider";

type Props = {
  value?: number;
  onChange?: (value: number) => void;
};

const Slider = ({ value = 1, onChange }: Props) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block h-3 w-3 rounded-[10px] bg-white" />
    </RadixSlider.Root>
  );
};

export default Slider;
