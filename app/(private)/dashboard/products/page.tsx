import DashboardProductsView from "@/components/DashboardProductsView";
import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = createClient();

  let { data: products, error } = await supabase.from("products").select("*");

  if (!products || error) {
    console.error(error);
    return <div>Error loading products</div>;
  }

  return <DashboardProductsView serverProducts={products} />;
}
