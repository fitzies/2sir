export default function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={`w-screen lg:px-12 px-4 py-8 ${className}`}>
      {children}
    </main>
  );
}
