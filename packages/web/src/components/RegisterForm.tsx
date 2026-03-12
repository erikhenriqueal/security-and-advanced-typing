import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "@shared/auth";
import type { RegisterForm } from "@shared/auth";

import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup
} from "@/shadcn/components/ui/field";

import { Eye, EyeClosed } from "lucide-react";

export default function RegisterForm() {
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: RegisterForm) => {
    console.log("Submit", data);
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 flex flex-col place-items-center"
    >
      <FieldGroup className="gap-4">

        <Field>
          <FieldLabel htmlFor="register-name">Name</FieldLabel>
          <Input
            id="register-name"
            placeholder="Type your name"
            autoComplete="name"
            {...form.register("name")}
          />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="register-email">E-mail</FieldLabel>
          <Input
            id="register-email"
            placeholder="Select your best E-mail"
            autoComplete="email"
            type="email"
            {...form.register("email")}
          />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="register-password">Password</FieldLabel>
          <div className="flex flex-row gap-2">
            <Input
              id="register-password"
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

      <Button type="submit">Register</Button>
    </form>
  );
}