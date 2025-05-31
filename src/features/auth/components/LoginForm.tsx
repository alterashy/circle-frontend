import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Link } from "@tanstack/react-router";
import { type Control, type FieldPath } from "react-hook-form";
import useLoginForm from "../hooks/useLoginForm";
import { type LoginSchemaDTO } from "../schemas/auth.schemas";

const LoginForm = () => {
  const { loginForm, isPending, onSubmit } = useLoginForm();

  interface LoginFormFieldProps {
    name: FieldPath<LoginSchemaDTO>;
    placeholder: string;
    inputType?: string;
    formControl: Control<LoginSchemaDTO, any>;
  }

  const LoginFormField: React.FC<LoginFormFieldProps> = ({
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
                <Input placeholder={placeholder} type={inputType || "text"} {...field} />
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
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
          <LoginFormField
            name="email"
            placeholder="email"
            inputType="email"
            formControl={loginForm.control}
          />
          <LoginFormField
            name="password"
            placeholder="password"
            inputType="password"
            formControl={loginForm.control}
          />
          <div className="text-sm text-right mt-4">
            <Link to="/register" className="text-foreground hover:text-primary">
              Forgot Password?
            </Link>
          </div>
          <Button type="submit" className="w-full text-foreground">
            {isPending ? (
              <span className="flex gap-2 items-center">
                <Spinner size={"small"} />
                Loading...
              </span>
            ) : (
              <span>Login</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
