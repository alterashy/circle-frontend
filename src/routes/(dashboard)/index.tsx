import { HomePage } from "@/pages/dashboard/HomePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
