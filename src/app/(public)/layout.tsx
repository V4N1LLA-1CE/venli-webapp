import { Pointer } from "@/components/ui/pointer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {children}
      <Pointer />
    </div>
  );
}
