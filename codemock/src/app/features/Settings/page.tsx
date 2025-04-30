"use client";

import { NextPageWithLayout } from "@/app/layout";
import { ProtectedLayout } from "@/layouts/protected_layout";

const SettingPage: NextPageWithLayout = () => {
  return (
    <ProtectedLayout allowedRoles={["ADMIN", "MENTOR"]}>
      Setting
    </ProtectedLayout>
  );
};

export default SettingPage;
