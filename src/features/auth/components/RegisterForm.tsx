import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { type Control, type FieldPath } from "react-hook-form";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { type RegisterSchemaDTO } from "../schemas/auth.schemas";

export const RegisterForm = () => {
  const { registerForm, isPending, onSubmit } = useRegisterForm();

  interface RegisterFormFieldProps {
    name: FieldPath<RegisterSchemaDTO>;
    placeholder: string;
    inputType?: string;
    formControl: Control<RegisterSchemaDTO, any>;
  }

  const RegisterFormField: React.FC<RegisterFormFieldProps> = ({
    name,
    placeholder,
    inputType,
    formControl,
  }) => {
    return (
      <div className="w-full">
        <FormField
          control={formControl}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={placeholder}
                  type={inputType || "text"}
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-1" />
            </FormItem>
          )}
        />
      </div>
    );
  };

  return (
    <div>
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <RegisterFormField
            name="fullName"
            placeholder="full name"
            inputType="text"
            formControl={registerForm.control}
          />
          <RegisterFormField
            name="username"
            placeholder="username"
            inputType="text"
            formControl={registerForm.control}
          />
          <RegisterFormField
            name="email"
            placeholder="email"
            inputType="email"
            formControl={registerForm.control}
          />
          <RegisterFormField
            name="password"
            placeholder="password"
            inputType="password"
            formControl={registerForm.control}
          />
          <Button type="submit" className="w-full text-foreground mt-4">
            {isPending ? (
              <span className="flex gap-2 items-center">
                <Spinner size={"small"} />
                Loading...
              </span>
            ) : (
              <span>Register</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
