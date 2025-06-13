import * as yup from "yup";

export const INTERVIEW_SESSION_SCHEMA = yup.object().shape({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  description: yup.string().required("Mô tả là bắt buộc"),
  requirement: yup.string().notRequired().nullable(),
  date: yup.date().typeError("Ngày không hợp lệ").required("Chọn ngày"),
  time: yup.date().typeError("Giờ không hợp lệ").required("Chọn giờ bắt đầu"),
  slotDuration: yup
    .number()
    .min(5, "Tối thiểu 5 phút")
    .required("Thời lượng mỗi slot là bắt buộc"),
  totalSlots: yup
    .number()
    .min(1, "Phải có ít nhất 1 slot")
    .required("Số lượng slot là bắt buộc"),
  sessionPrice: yup
    .number()
    .min(0, "Phí không thể âm")
    .required("Giá buổi phỏng vấn là bắt buộc"),
  majorIds: yup
    .array()
    .of(yup.string())
    .min(1, "Chọn ít nhất một ngành").required(),
  levelId: yup.string().required("Chọn trình độ").required(),
  technologyIds: yup
    .array()
    .of(yup.string())
    .min(1, "Chọn ít nhất một công nghệ").required(),
  meetingLink: yup
    .string()
    .url("Đường dẫn không hợp lệ")
    .nullable()
    .notRequired(),
  recordingURL: yup
    .string()
    .url("Đường dẫn không hợp lệ")
    .nullable()
    .notRequired(),
});
