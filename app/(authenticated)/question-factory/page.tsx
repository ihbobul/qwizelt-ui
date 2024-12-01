"use client";

import CreateQuestionForm from "@/components/create-question-form/create-question-form";

export default function QuestionFactory() {
  return (
    <div className="min-h-screen overflow-y-auto bg-gray-50 py-10 px-4 md:px-8">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Question Factory
        </h1>
        <p className="text-lg text-gray-600">
          Generate personalized and engaging questions for your quizzes, exams,
          or surveys effortlessly. Customize the type, difficulty, and number of
          questions with just a few clicks.
        </p>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Informational Section */}
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What is the Question Factory?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            The Question Factory allows you to easily create questions tailored
            to your specific needs. Whether you&apos;re an educator, content
            creator, or quiz enthusiast, this tool will help you generate
            questions quickly and efficiently.
          </p>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4M7 21h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              Generate multiple types of questions, including multiple-choice,
              true/false, and short answer.
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-green-600 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h11m-4-4h9m-9 8h9m-3 4h3"
                ></path>
              </svg>
              Customize the difficulty and label to suit your audience.
            </li>
            <li className="flex items-center">
              <svg
                className="w-6 h-6 text-yellow-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c.828 0 1.5-.672 1.5-1.5S12.828 5 12 5s-1.5.672-1.5 1.5S11.172 8 12 8zm0 4c.828 0 1.5-.672 1.5-1.5S12.828 9 12 9s-1.5.672-1.5 1.5S11.172 12 12 12zM12 16c.828 0 1.5-.672 1.5-1.5S12.828 13 12 13s-1.5.672-1.5 1.5S11.172 16 12 16z"
                ></path>
              </svg>
              Save time and focus on more important tasks.
            </li>
          </ul>
        </div>

        {/* Form Section */}
        <div>
          <CreateQuestionForm />
        </div>
      </div>

      {/* Footer Section */}
      <div className="max-w-5xl mx-auto text-center mt-12">
        <p className="text-gray-600">
          Start creating engaging questions now and elevate your learning
          experience!
        </p>
      </div>
    </div>
  );
}
