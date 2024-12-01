"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "../ui/file-upload";
import { Tag, TagInput } from "emblor";
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
import { generateQuestionsSchema } from "./schema";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

export default function CreateQuestionForm() {
  const form = useForm<z.infer<typeof generateQuestionsSchema>>({
    resolver: zodResolver(generateQuestionsSchema),
    defaultValues: {
      numberOfQuestions: 1,
      type: "MULTIPLE_CHOICE",
      difficulty: "EASY",
      labels: [],
    },
  });

  const [tags, setTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const { setValue } = form;

  const onSubmit = (data: z.infer<typeof generateQuestionsSchema>) => {
    console.log("Form Data: ", data);
  };

  const handleFileUpload = (uploadedFile: File | null) => {
    setFile(uploadedFile);
    form.setValue("file", uploadedFile || undefined);
    if (uploadedFile) form.setValue("prompt", "");
  };

  return (
    <div className="max-w-4xl p-8 bg-white rounded-lg">
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
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full resize-none"
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
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full"
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
                    <SelectTrigger className="p-3 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md w-full">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="MULTIPLE_CHOICE">
                      Multiple Choice
                    </SelectItem>
                    <SelectItem value="TRUE_FALSE">True/False</SelectItem>
                    <SelectItem value="SHORT_ANSWER">Short Answer</SelectItem>
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
                    <SelectTrigger className="p-3 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md w-full">
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
                        "border-gray-300 focus:ring-2 focus:ring-blue-500 p-6 rounded-md w-full",
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
            className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Generate Questions
          </button>
        </form>
      </Form>
    </div>
  );
}