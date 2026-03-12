import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "@shared/auth";
import type { LoginForm } from "@shared/auth";

import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup
} from "@/shadcn/components/ui/field";

import { Eye, EyeClosed } from "lucide-react";

export default function LoginForm() {
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginForm) => {
    console.log("Submit", data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 flex flex-col place-items-center"
    >
      <FieldGroup className="gap-4">

        <Field>
          <FieldLabel htmlFor="login-email">E-mail</FieldLabel>
          <Input
            id="login-email"
            placeholder="Select your best E-mail"
            autoComplete="email"
            type="email"
            {...form.register("email")}
          />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="login-password">Password</FieldLabel>
          <div className="flex flex-row gap-2">
            <Input
              id="login-password"
              placeholder="Choose a strong Password"
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              {...form.register("password")}
            />
            <Button
              type="button"
              variant="outline"
              className="aspect-square px-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </Button>
          </div>
          <FieldError>{form.formState.errors.password?.message}</FieldError>
        </Field>

      </FieldGroup>

      <Button type="submit">Login</Button>
    </form>
  );
}