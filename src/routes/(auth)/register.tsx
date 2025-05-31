import RegisterPage from "@/pages/auth/RegisterPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <RegisterPage />
    </div>
  );
}
