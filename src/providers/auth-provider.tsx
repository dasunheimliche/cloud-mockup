"use client";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("AUTH PROVIDER");
  return <>{children}</>;
}
