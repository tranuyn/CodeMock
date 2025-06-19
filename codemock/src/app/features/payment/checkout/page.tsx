"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { registerInterviewSlot } from "@/api/interview-slot/interview-slot";
import { useRouter } from "next/navigation";
import { toastService } from "@/app/components/toast/toast.service";

export default function CheckPaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const resultCode = searchParams.get("resultCode");
    const slotId = searchParams.get("orderInfo");
    const extraData = searchParams.get("extraData");
    const resumeData = extraData
      ? JSON.parse(decodeURIComponent(extraData))
      : {};

    const registerAfterPayment = async () => {
      if (resultCode === "0" && slotId && resumeData.candidateId) {
        try {
          await registerInterviewSlot(slotId, {
            candidateId: resumeData.candidateId,
            resumeUrl: resumeData.resumeUrl,
          });

          toastService.show({
            title: "Thanh toán thành công!",
            description: "Bạn đã đăng ký slot thành công.",
            variant: "success",
          });

          router.push("/"); // hoặc redirect về trang slot
        } catch (err: any) {
          toastService.show({
            title: "Lỗi",
            description: err?.response?.data?.message || "Đăng ký thất bại",
            variant: "error",
          });
        } finally {
          setProcessing(false);
        }
      } else {
        toastService.show({
          title: "Thanh toán thất bại",
          description: "Giao dịch không thành công hoặc đã bị hủy.",
          variant: "error",
        });
        setProcessing(false);
      }
    };

    registerAfterPayment();
  }, [searchParams]);

  return (
    <div style={{ padding: 20 }}>
      <h2>{processing ? "Đang xử lý giao dịch..." : "Hoàn tất"}</h2>
    </div>
  );
}
