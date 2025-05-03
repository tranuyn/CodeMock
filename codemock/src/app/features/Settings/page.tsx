"use client";

import { NextPageWithLayout } from "@/app/layout";
import { ProtectedLayout } from "@/layouts/protected_layout";
import { RootState } from "@/store/redux";
import { useSelector } from "react-redux";

const SettingPage: NextPageWithLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <ProtectedLayout allowedRoles={["CANDIDATE", "MENTOR"]}>
      Setting by {user.email}
    </ProtectedLayout>
  );
};

export default SettingPage;
