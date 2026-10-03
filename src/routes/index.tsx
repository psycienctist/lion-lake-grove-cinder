import { createFileRoute } from "@tanstack/react-router";
import { RiteCoreApp } from "@/components/ritecore/App";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <RiteCoreApp />;
}
