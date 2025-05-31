import { ModeToggle } from "@/components/common/ModeToggle";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { Link } from "@tanstack/react-router";

const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center min-h-screen w-full p-15">
      <div className="absolute right-0 top-0 m-6">
        <ModeToggle />
      </div>
      <div className="text-primary text-4xl text-left font-bold mb-2 w-1/3">
        Circle
      </div>
      <div className="text-foreground text-2xl text-left mb-6 w-1/3">
        Create Circle account
      </div>
      <div className="w-1/3">
        <RegisterForm />
      </div>
      <div className="text-sm text-left w-1/3">
        Already have account?{" "}
        <Link to="/login" className="text-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
