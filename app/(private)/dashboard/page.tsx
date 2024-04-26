import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DashboardMain } from "@/components/DashboardMain";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <DashboardMain>
      <h1>Dashboard home</h1>
    </DashboardMain>
  );
}
