"use client";
import { Filters } from "@/types/Filters";
import { ChangeEvent, useEffect, useState } from "react";

type VoteProps = {
  name?: keyof Filters;
  defaultValue: number;
  label?: string;
};

const Vote = ({ name, defaultValue, label }: VoteProps) => {
  const [vote, setVote] = useState<number>(defaultValue);

  useEffect(() => {
    setVote(defaultValue);
  }, [defaultValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVote(Number(e.target.value));
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <label htmlFor={name}>{label}</label>
      <input
        className="border border-gray-600 p-2 rounded-md"
        type="number"
        name={name}
        id={name}
        min={0}
        max={10}
        step={1}
        value={vote}
        onChange={handleInputChange}
        aria-label={label}
      />
    </div>
  );
};

export default Vote;
