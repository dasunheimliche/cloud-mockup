export default function ConfigIcon({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[4rem] min-w-16 bg-green-950 rounded-sm relative">
      {children}
    </div>
  );
}
