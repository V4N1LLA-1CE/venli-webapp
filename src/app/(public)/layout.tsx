export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {children}
      {/* custom pointer a bit clunky atm */}
      {/* <Pointer /> */}
    </div>
  );
}
