import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const { data: Products, error } = await supabase.from("products").select("*");

  console.log(Products || error);

  return <div>Home page loading</div>;
}
