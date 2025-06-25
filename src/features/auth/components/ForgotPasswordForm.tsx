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
import { ForgotPasswordSchemaDTO } from "@/schemas/auth.schema";
import { type Control, type FieldPath } from "react-hook-form";
import { useForgotPasswordForm } from "../hooks/useForgotPasswordForm";

export const ForgotPasswordForm = () => {
  const { forgotPasswordForm, isPending, onSubmit } = useForgotPasswordForm();

  interface ForgotPasswordFormFieldProps {
    name: FieldPath<ForgotPasswordSchemaDTO>;
    placeholder: string;
    inputType?: string;
    formControl: Control<ForgotPasswordSchemaDTO, any>;
  }

  const ForgotPasswordFormField: React.FC<ForgotPasswordFormFieldProps> = ({
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
      <Form {...forgotPasswordForm}>
        <form
          onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <ForgotPasswordFormField
            name="email"
            placeholder="email"
            inputType="email"
            formControl={forgotPasswordForm.control}
          />
          <Button type="submit" className="w-full text-foreground">
            {isPending ? (
              <span className="flex gap-2 items-center">
                <Spinner size={"small"} />
                Loading...
              </span>
            ) : (
              <span>Send Instruction</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
