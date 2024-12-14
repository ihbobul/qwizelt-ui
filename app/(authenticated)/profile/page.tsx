"use client";

import {
  BarChartIcon,
  CheckCircleIcon,
  Edit3Icon,
  PlusCircleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProfilePage() {
  const { data } = useSession();
  const router = useRouter();

  const user = {
    email: data?.user.email,
    firstName: data?.user.firstName,
    lastName: data?.user.lastName,
    organization: data?.user.organization || "",
    createdQuizzes: 15,
    badges: ["Quiz Master", "Consistent"],
  };

  return (
    <div className="container mx-auto py-12">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Your Profile</h1>
        <p className="text-lg text-muted-foreground">
          Welcome back,{" "}
          <span className="text-primary font-medium">{user.firstName}!</span>
        </p>
      </div>

      {/* User Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle>
              Personal Information{" "}
              <Edit3Icon
                className="inline ml-2 text-muted-foreground"
                size={16}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>First Name:</strong> {user.firstName}
            </div>
            <div>
              <strong>Last Name:</strong> {user.lastName}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            {user.organization && (
              <div>
                <strong>Organization:</strong> {user.organization}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quiz Stats */}
        <Card>
          <CardHeader>
            <CardTitle>
              Your Statistics{" "}
              <BarChartIcon
                className="inline ml-2 text-muted-foreground"
                size={16}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Created Quizzes:</span>
                <strong>{user.createdQuizzes}</strong>
              </div>
              <Progress value={(user.createdQuizzes / 20) * 100} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Achievements</h2>
        <div className="flex flex-wrap gap-4">
          {user.badges.map((badge, index) => (
            <Badge key={index} className="px-4 py-2 text-lg flex items-center">
              <CheckCircleIcon className="mr-2 text-green-600" size={16} />
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      {/* Manage Quizzes Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Manage Your Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for user's created quizzes */}
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">Quiz 1</h3>
              <p className="text-muted-foreground">Last updated: 2 days ago</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">Quiz 2</h3>
              <p className="text-muted-foreground">Last updated: 5 days ago</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-4">
              <PlusCircleIcon
                className="text-muted-foreground mx-auto"
                size={48}
              />
              <p className="text-muted-foreground mt-2">Create a new quiz</p>
              <Button
                variant="default"
                className="mt-4"
                onClick={() => router.push("/question-factory")}
              >
                New Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
