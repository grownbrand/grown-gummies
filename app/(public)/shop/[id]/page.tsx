export default function Page({ params }: { params: { id: string } }) {
  console.log(params.id);
  return <div>Shop Detail Page</div>;
}
