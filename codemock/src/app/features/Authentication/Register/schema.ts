// schema.ts
import * as yup from "yup";

// Step 1
export const step1Schema = yup.object().shape({
  email: yup.string().required("Email là bắt buộc").email("Email không hợp lệ"),
  username: yup
    .string()
    .required("Tên người dùng là bắt buộc")
    .min(3, "Tên người dùng phải có ít nhất 3 ký tự"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

// Step 2
export const step2Schema = yup.object().shape({
  profession: yup
    .array()
    .of(yup.string().required("Không được để trống"))
    .min(1, "Chọn ít nhất một lĩnh vực")
    .required("Lĩnh vực là bắt buộc"),

  educationLevel: yup
    .array()
    .of(yup.string().required("Không được để trống"))
    .min(1, "Chọn trình độ chuyên môn")
    .required("Trình độ là bắt buộc"),

  technologies: yup
    .array()
    .of(yup.string().required("Không được để trống"))
    .min(1, "Chọn công nghệ")
    .required("Công nghệ là bắt buộc"),
});

// Step 3
export const step3Schema = yup.object().shape({
  verificationCode: yup
    .string()
    .required("Mã xác nhận là bắt buộc")
    .length(6, "Mã xác nhận phải có 6 ký tự"),
});

// Combine all schemas for final validation
export const registerSchema = step1Schema
  .concat(step2Schema)
  .concat(step3Schema);

// Form data type
export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  profession: string[]; // Select multiple
  educationLevel: string[]; // Select multiple
  technologies: string[]; // Select multiple
  verificationCode: string;
}
