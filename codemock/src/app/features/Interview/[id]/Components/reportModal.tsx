"use client";

import { Box } from "@mui/material";

import { Color } from "@/assets/Color";

import { AuthState } from "@/store/types";

import { useForm, UseFormRegister } from "react-hook-form";

interface FormProp {
  onClose: () => void;
}

const ReportModal = ({ onClose }: FormProp) => {
  const methods = useForm<AuthState>({
    defaultValues: {
      biography: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
    setValue,
    register,
  } = methods;

  return (
    <>
      <Box>
        <div style={{ maxWidth: "600px" }}>
          <p>Nhập lý do bạn muốn tố cáo</p>
          <textarea
            id="biography"
            {...register("biography")}
            rows={5}
            cols={40}
            placeholder="Nhập nội dung..."
            style={{ border: "1px solid #ccc", marginTop: "10px" }}
          />
        </div>
      </Box>

      <Box
        sx={{
          justifyContent: "flex-end",
          display: "flex",
          borderTop: "1px solid #ccc",
          margin: "20px -20px 0px -20px",
          padding: "20px 20px 0px 20px",
        }}
      >
        <button
          style={{
            background: Color.gradient,
            color: "white",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
          onClick={() => onClose}
        >
          Tố cáo
        </button>
      </Box>
    </>
  );
};

export default ReportModal;
