import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

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

export default function CreateQuestionForm() {
  const form = useForm<z.infer<typeof generateQuestionsSchema>>({
    resolver: zodResolver(generateQuestionsSchema),
    defaultValues: {
      prompt: "",
      numberOfQuestions: 1,
      type: "MULTIPLE_CHOICE",
      difficulty: "EASY",
      label: "",
    },
  });

  function onSubmit(data: z.infer<typeof generateQuestionsSchema>) {
    console.log(data);
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Generate Questions
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="prompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prompt</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the prompt for the question"
                    {...field}
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full"
                  />
                </FormControl>
                <FormDescription>
                  Enter a prompt for the question
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full"
                  />
                </FormControl>
                <FormDescription>
                  Specify how many questions you want to generate
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <FormDescription>Choose the type of question</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  Select the difficulty of the questions
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a label (optional)"
                    {...field}
                    className="border-gray-300 focus:ring-2 focus:ring-blue-500 p-3 rounded-md w-full"
                  />
                </FormControl>
                <FormDescription>
                  Optionally add a label for the questions
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
