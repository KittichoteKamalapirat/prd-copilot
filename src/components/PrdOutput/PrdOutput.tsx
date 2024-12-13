"use client";

import ReactMarkdown from "react-markdown";
import { useStore } from "../../lib/store";
import "./PrdOutput.css";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
  isAuth?: boolean;
  isPro?: boolean;
}

const placeHolder = `Hi I am Write My PRD bot, Your PRD writing Assistant 🙌 Tell me what
            does your Product do? And I will try to help you kickstart your PRD
            writing journey. 🚀`;

const blockLabel = "Subscribe to view "; // Actual action could be login or subscribe
export const PrdOutput = ({ isAuth, isPro }: Props) => {
  const { text, isBlurred } = useStore((state) => state.prd);
  const { set } = useStore((state) => state.display);

  const handleInvalidUser = () => {
    if (!isAuth) {
      set({ showAuthModal: true });
      return;
    }
    if (!isPro) set({ showUpsellSheet: true });
  };
  return (
    <div className="form-textarea relative w-full p-4 px-8 overflow-scroll h-[calc(100%-1rem)] shadow-2xl flex items-center justify-center">
      <div className="text-left absolute top-4 left-4">
        <div className={cn("is-typed", isBlurred && "blurred")}>
          <ReactMarkdown>{text || placeHolder}</ReactMarkdown>
        </div>
      </div>

      {!isPro && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button onClick={handleInvalidUser} size="lg" className="">
            {blockLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
