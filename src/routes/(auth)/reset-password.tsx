import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/reset-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>Reset Password</div>
    </div>
  );
}
