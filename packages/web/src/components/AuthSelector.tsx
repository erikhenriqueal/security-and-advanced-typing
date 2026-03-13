import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/shadcn/components/ui/card";
import { Button } from "@/shadcn/components/ui/button";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthSelector() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Card className="w-full max-w-96 gap-4">
      <CardHeader>
        <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
        <CardDescription>
          {isLogin
            ? "Welcome back! Please enter your details."
            : "Create an account to get started."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </CardContent>
      <CardFooter className="mx-auto">
        <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}