"use client";

import ReactMarkdown from "react-markdown";
import { useStore } from "../../lib/store";
import "./PrdOutput.css";

export const PrdOutput = () => {
  const { text } = useStore((state) => state.prd);

  return (
    <div className="form-textarea relative w-full p-4 px-8 overflow-scroll h-[calc(100%-1rem)] shadow-2xl flex items-center justify-center">
      <div className="text-left absolute top-4 left-4">
        <div className="is-typed">
          <div className="is-typed">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
