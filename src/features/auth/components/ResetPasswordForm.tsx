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
import { ResetPasswordSchemaDTO } from "@/schemas/auth.schema";
import { type Control, type FieldPath } from "react-hook-form";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";

export const ResetPasswordForm = () => {
  const { resetPasswordForm, isPending, onSubmit } = useResetPasswordForm();

  interface ResetPasswordFormFieldProps {
    name: FieldPath<ResetPasswordSchemaDTO>;
    placeholder: string;
    inputType?: string;
    formControl: Control<ResetPasswordSchemaDTO, any>;
  }

  const ResetPasswordFormField: React.FC<ResetPasswordFormFieldProps> = ({
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
      <Form {...resetPasswordForm}>
        <form
          onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <ResetPasswordFormField
            name="oldPassword"
            placeholder="Old Password"
            inputType="password"
            formControl={resetPasswordForm.control}
          />
          <ResetPasswordFormField
            name="newPassword"
            placeholder="New Password"
            inputType="password"
            formControl={resetPasswordForm.control}
          />
          <ResetPasswordFormField
            name="newPasswordConfirm"
            placeholder="Confirm New Password"
            inputType="password"
            formControl={resetPasswordForm.control}
          />
          <Button type="submit" className="w-full text-foreground">
            {isPending ? (
              <span className="flex gap-2 items-center">
                <Spinner size={"small"} />
                Loading...
              </span>
            ) : (
              <span>Create New Password</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
