"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useStore } from "../lib/store";

// Define schema using zod
const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  featureName: z.string().min(1, "Feature name is required"),
  overview: z.string().min(1, "Overview is required"),
  featureList: z.string(),
  userFeedback: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export const PrdForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "prd-copilot",
      featureName: "-",
      overview:
        "PRD Copilot is a SaaS platform designed to simplify the creation of product requirements by leveraging AI. Users can quickly fill out a form tailored to their project needs, and the platform generates detailed, actionable product requirement documents. PRD Copilot aims to save time, ensure clarity, and improve collaboration for product teams.",
      featureList: "-",
      userFeedback: "-",
    },
  });

  const { setText } = useStore((state) => state.prd);

  // const onSubmit = async (data: FormData) => {
  //   try {
  //     const response = await fetch("/api/generate-requirements", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     const result = await response.json();
  //     set({ text: result.requirements });
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/generate-requirements-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader!.read();
        done = doneReading;
        const chunk = decoder.decode(value);
        console.log("chunk", chunk);

        const current = useStore.getState().prd.text;
        const next = current + chunk;
        console.log("current", current);
        console.log("next", next);
        // set({ text: next });
        setText((prev) => prev + chunk);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // const onSubmit = async (data: FormData) => {
  //   const eventSource = new EventSource("/api/generate-requirements-stream");

  //   eventSource.onmessage = (event) => {
  //     set({ text: text + event.data });
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("EventSource failed:", error);
  //     eventSource.close();
  //   };

  //   try {
  //     await fetch("/api/generate-requirements-stream", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Section 1: About Product */}
      <div>
        <div className="text-lg font-bold text-gray-800 mb-5">
          <span className="text-pink-500">1.</span> About your product
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              placeholder="E.g., Acme Inc."
              {...register("productName")}
              className={errors.productName ? "border-red-500" : ""}
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.productName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="featureName">Feature Name</Label>
            <Input
              id="featureName"
              {...register("featureName")}
              className={errors.featureName ? "border-red-500" : ""}
            />
            {errors.featureName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.featureName.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="overview">Give an Overview / Explanation</Label>
            <Textarea
              id="overview"
              rows={4}
              {...register("overview")}
              className={errors.overview ? "border-red-500" : ""}
            />
            {errors.overview && (
              <p className="mt-1 text-sm text-red-500">
                {errors.overview.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Define Requirements */}
      <div>
        <div className="text-lg font-bold text-gray-800 mb-5">
          <span className="text-pink-500">2.</span> Define your Requirement
        </div>
        <div className="space-y-4">
          <div>
            <Label htmlFor="featureList">Feature List</Label>
            <Textarea id="featureList" rows={4} {...register("featureList")} />
          </div>
          <div>
            <Label htmlFor="userFeedback">User Feedback</Label>
            <Textarea
              id="userFeedback"
              rows={4}
              {...register("userFeedback")}
            />
          </div>
        </div>
      </div>

      {/* Sticky Action Buttons */}
      <div className="sticky bottom-1 left-0 right-0 px-2 py-2 font-semibold text-sm text-slate-900 bg-slate-50/90 backdrop-blur-sm ring-1 ring-slate-900/10 space-x-4 rounded-xl shadow-2xl">
        <div className="flex gap-4 text-white leading-6 bg-stripes-indigo rounded-lg">
          <Button
            type="submit"
            className="sm:p-4 p-3 pt-4 grow rounded-lg flex items-center justify-center bg-pink-600 hover:bg-pink-800 shadow-lg text-xs sm:text-base"
          >
            Generate My PRD ✨
          </Button>
        </div>
      </div>
    </form>
  );
};
