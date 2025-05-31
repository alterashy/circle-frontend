import DashboardLayout from "@/layouts/DashboardLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <DashboardLayout />
    </>
  );
}
