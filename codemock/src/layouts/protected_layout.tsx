// layouts/ProtectedLayout.tsx
"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import ResultUnauthorized from "@/app/codemock-ui/Result/ResultUnauthorized-401";

type Role = "ADMIN" | "CANDIDATE" | "MENTOR";

interface ProtectedLayoutProps {
  children: ReactNode;
  allowedRoles: Role[];
}

interface User {
  role?: Role;
}

export const ProtectedLayout = ({
  children,
  allowedRoles,
}: ProtectedLayoutProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setUser(stored ? JSON.parse(stored) : null);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user?.role || !allowedRoles.includes(user.role)) {
    return <ResultUnauthorized />;
  }

  return <>{children}</>;
};
