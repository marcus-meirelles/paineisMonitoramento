export default function AuthLayout({ children }: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen justify-between">
      {children}
    </div>
  );
}