import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const { data: products, error } = await supabase.from("products").select("*");

  return (
    <div>
      <p>Home page</p>
      {products &&
        products.map((product) => <p key={product.id}>{product.name}</p>)}
    </div>
  );
}
