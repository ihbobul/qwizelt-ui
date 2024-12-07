"use client";

import InfiniteMovingCardsDemo from "@/components/infinite-moving-cards/infinite-moving-cards";

export default function Dashboard() {
  return (
    <div className="mb-8 p-4">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Welcome back, User! We are thrilled to have you here.
          </p>
        </div>
      </div>

      {/* Cards Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Example Cards for Metrics or Actions */}
        <div className="bg-gradient-to-r from-indigo-50 via-gray-100 to-indigo-50 bg-opacity-80 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow backdrop-blur-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Total Questions
          </h3>
          <p className="text-2xl font-bold text-blue-600">125</p>
          <p className="text-gray-500 dark:text-gray-400">
            Total number of questions in your database
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 via-gray-100 to-indigo-50 bg-opacity-80 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Activities
          </h3>
          <p className="text-xl font-bold text-green-600">New Questions</p>
          <p className="text-gray-500 dark:text-gray-400">
            Click to create a new question
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 via-gray-100 to-indigo-50 bg-opacity-80 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Profile Settings
          </h3>
          <p className="text-xl font-bold text-yellow-600">Update Profile</p>
          <p className="text-gray-500 dark:text-gray-400">
            Click here to update your profile details
          </p>
        </div>
      </div>

      {/* Success Story Section */}
      <div className="bg-blue-50 p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-4">
          Success Story: Transforming Learning and Engagement
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Our platform has empowered thousands of educators, students, and
          content creators worldwide. Together, we&apos;ve achieved incredible
          milestones, from improving learning outcomes to fostering creativity
          in the classroom. Here&apos;s how we&apos;re making a difference:
        </p>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
          <li>
            Increased engagement in over 100+ educational institutions globally
          </li>
          <li>Boosted quiz participation by 45% within the first month</li>
          <li>Encouraged users to create over 5,000+ personalized quizzes</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300">
          With your help, we&apos;re pushing boundaries and creating
          opportunities for learning everywhere. Keep up the great work!
        </p>
      </div>

      {/* Reviews Section */}
      <div className="mb-8 p-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Latest Reviews from Our Users
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Here&apos;s what some of our users have to say about using our
          platform. Their feedback helps us continue to improve and provide the
          best experience. Check out their reviews below!
        </p>

        {/* Infinite Moving Cards Demo (Latest Reviews) */}
        <div className="w-full overflow-hidden">
          <InfiniteMovingCardsDemo />
        </div>
      </div>

      {/* Gratitude Section */}
      <div className="bg-green-50 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-4">
          A Big Thank You!
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We want to take a moment to express our heartfelt gratitude for your
          continued support and trust in our platform. Without your
          contributions, we wouldn&apos;t be able to achieve the success
          we&apos;ve seen.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Thank you for being part of this amazing journey! We look forward to
          many more achievements together.
        </p>
      </div>
    </div>
  );
}
