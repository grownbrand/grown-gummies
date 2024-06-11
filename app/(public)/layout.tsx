import { TopNavigationBar } from "@/components/TopNavigationBar";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNavigationBar />
      <div className="mt-[72px]">{children}</div>
    </>
  );
}
