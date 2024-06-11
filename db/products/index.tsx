import { supabase } from "@/utils/supabase";

export async function handleProductCreated(product: any) {
  const { id, name, description, images, active } = product;

  const { data, error } = await supabase
    .from("products")
    .insert([{ stripe_id: id, name, price: 0, description, images, active }]);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function handleProductUpdated(product: any) {
  const { id, name, description, images, active } = product;

  const { data, error } = await supabase
    .from("products")
    .update({ name, description, images, active })
    .eq("stripe_id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function handleProductDeleted(product: any) {
  const { id } = product;

  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("stripe_id", id);
  if (error) {
    throw new Error(error.message);
  }
  return;
}
