/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Tag, TagInput } from "emblor";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { usePostQuestion } from "@/hooks/usePostQuestion";

import { FileUpload } from "../ui/file-upload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { generateQuestionsSchema } from "./schema";

export default function CreateQuestionForm() {
  const form = useForm<z.infer<typeof generateQuestionsSchema>>({
    resolver: zodResolver(generateQuestionsSchema),
    defaultValues: {
      numberOfQuestions: 1,
      type: "MULTIPLE_CHOICE_QUESTION",
      difficulty: "EASY",
      labels: [],
    },
  });

  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { setValue } = form;
  const { mutate: postQuestion, isPending } = usePostQuestion();

  const onSubmit = async (data: z.infer<typeof generateQuestionsSchema>) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("numberOfQuestions", data.numberOfQuestions.toString());
      formData.append("type", data.type);
      formData.append("difficulty", data.difficulty);
      if (tags.length > 0) {
        formData.append("label", tags.map((tag) => tag.text).join(", "));
      }

      postQuestion({ data: formData, isJson: false });
    } else if (data.prompt) {
      const payload = {
        prompt: data.prompt,
        numberOfQuestions: data.numberOfQuestions,
        type: data.type,
        difficulty: data.difficulty,
        label:
          tags.length > 0 ? tags.map((tag) => tag.text).join(", ") : undefined,
      };

      postQuestion({ data: payload, isJson: true });
    } else {
      console.error("Please provide either a prompt or a file.");
    }
  };

  const handleFileUpload = (uploadedFile: File | null) => {
    setFile(uploadedFile);
    form.setValue("file", uploadedFile || undefined);
    if (uploadedFile) form.setValue("prompt", "");
  };

  return (
    <div className="max-w-4xl p-8 bg-gradient-to-r from-indigo-50 via-gray-100 to-indigo-50 bg-opacity-80 backdrop-blur-lg rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Generate Questions
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Prompt Field */}
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the prompt for the question"
                    {...field}
                    disabled={!!file} // Disable prompt if file is provided
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 p-4 rounded-md w-full resize-none bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </FormControl>
                <FormDescription>
                  Enter the prompt for the questions you want to generate.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* OR separator */}
          <div className="flex justify-between">
            <Separator className="my-2 w-1/3" />
            <span className="text-gray-500 px-4">OR</span>
            <Separator className="my-2 w-1/3" />
          </div>

          {/* File Upload Field */}
          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem>
                <FormLabel>File Upload</FormLabel>
                <FileUpload
                  file={file}
                  onFileUpload={handleFileUpload}
                  onFileRemove={() => handleFileUpload(null)}
                />
                <FormDescription>
                  Upload a file containing theory material to generate from.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Number of Questions Field */}
          <FormField
            control={form.control}
            name="numberOfQuestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Questions</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="1"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 p-4 rounded-md w-full bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                </FormControl>
                <FormDescription>
                  Specify how many questions you want to generate.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Question Type Field */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="p-4 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md w-full bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-white">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MULTIPLE_CHOICE_QUESTION">
                      Multiple Choice
                    </SelectItem>
                    <SelectItem value="TRUE_OR_FALSE_QUESTION">
                      True/False
                    </SelectItem>
                    <SelectItem value="SHORT_ANSWER_QUESTION">
                      Short Answer
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose the type of questions.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Difficulty Field */}
          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Difficulty</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="p-4 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md w-full bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-white">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EASY">Easy</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HARD">Hard</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the difficulty of the questions.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Labels (TagInput) Field */}
          <FormField
            control={form.control}
            name="labels"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left">Labels</FormLabel>
                <FormControl className="w-full">
                  <TagInput
                    {...field}
                    placeholder="Enter a label"
                    tags={tags}
                    setTags={(newTags) => {
                      setTags(newTags);
                      setValue("labels", newTags as [Tag, ...Tag[]]);
                    }}
                    activeTagIndex={activeTagIndex}
                    setActiveTagIndex={setActiveTagIndex}
                    styleClasses={{
                      input:
                        "border-gray-300 focus:ring-2 focus:ring-blue-500 p-4 rounded-md w-full bg-white/60 dark:bg-gray-700 text-gray-800 dark:text-white",
                      inlineTagsContainer: "p-2",
                      tag: {
                        body: "p-2 bg-blue-500 text-white hover:bg-blue-600",
                        closeButton: "text-white hover:text-white",
                      },
                    }}
                  />
                </FormControl>
                <FormDescription className="text-left">
                  These are the labels that you're interested in.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            {isPending ? "Generating..." : "Generate Questions"}
          </button>
        </form>
      </Form>
    </div>
  );
}
