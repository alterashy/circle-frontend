import { ThemeToggle } from "@/components/common/ThemeToggle";
import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { Link } from "@tanstack/react-router";

export const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center min-h-screen w-full p-15">
      <div className="absolute right-0 top-0 m-6">
        <ThemeToggle />
      </div>
      <div className="text-primary text-4xl text-left font-bold mb-2 w-1/3">
        Circle
      </div>
      <div className="text-foreground text-2xl text-left mb-6 w-1/3">
        Forgot Password
      </div>
      <div className="w-1/3">
        <ForgotPasswordForm />
      </div>
      <div className="text-sm text-left w-1/3">
        Back to Login?{" "}
        <Link to="/login" className="text-primary">
          Login
        </Link>
      </div>
    </div>
  );
};
