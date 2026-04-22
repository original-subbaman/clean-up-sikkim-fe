"use client";
import { useState } from "react";
import { Input } from "../ui/input";

interface OTPInputProps {
  charCount?: number;
  value?: string[];
  onChange?: (val: string[]) => void;
}

function OTPInput({ charCount = 6, value = [], onChange }: OTPInputProps) {
  const [placeholders, setPlaceholders] = useState(Array(charCount).fill("•"));

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>, idx: number) => {
    setPlaceholders((prev) => prev.map((p, i) => (i === idx ? "" : p)));
    // Select all text so typing replaces the current value
    e.target.select();
  };

  const handleBlur = (idx: number) => {
    setPlaceholders((prev) => prev.map((p, i) => (i === idx ? "•" : p)));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const val = e.target.value.replace(/[^0-9a-zA-Z]/, "").slice(0, 1);
    const next = [...value];
    next[idx] = val;
    onChange?.(next);
    // Optionally auto-focus next input
    if (val && e.target.nextElementSibling) {
      (e.target.nextElementSibling as HTMLInputElement).focus();
    }
  };

  return (
    <div className="flex justify-between gap-2 md:gap-3">
      {Array.from({ length: charCount }).map((_, index) => (
        <Input
          key={index}
          className="otp-input w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary-container text-on-surface transition-all"
          maxLength={1}
          placeholder={placeholders[index]}
          type="text"
          value={value[index] || ""}
          onFocus={(e) => handleFocus(e, index)}
          onBlur={() => handleBlur(index)}
          onChange={(e) => handleChange(e, index)}
        />
      ))}
    </div>
  );
}
export default OTPInput;
