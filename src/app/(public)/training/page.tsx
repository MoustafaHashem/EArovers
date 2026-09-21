import { redirect } from "next/navigation";

export default function TrainingPage() {
  redirect(`/events?category=${encodeURIComponent("دراسات")}`);
}
