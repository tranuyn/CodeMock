// components/TermsModal.tsx hoặc thêm trực tiếp trong RegisterSlotForm
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

export default function TermsModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 'bold'}} color="primary">Điều khoản và quy định</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          <strong>Thời gian phỏng vấn:</strong><br />
          - Người dùng nên tham gia buổi phỏng vấn đúng giờ đã đăng ký.<br />
          - CodeMock khuyến khích bạn nên truy cập vào tham gia trước giờ bắt đầu phỏng vấn 3-5 phút.<br />
          - Nếu có sự cố không thể tham gia, vui lòng hủy buổi phỏng vấn ít nhất 24 giờ trước khi buổi phỏng vấn diễn ra. Nếu không, tài khoản của bạn có thể bị cảnh cáo
        </Typography>

        <Typography gutterBottom>
          <strong>Chuẩn bị:</strong><br />
          - Tìm hiểu về các công nghệ, yêu cầu có trong JD phỏng vấn.<br />
          - Chuẩn bị câu hỏi thắc mắc cũng như các nội dung cần thảo luận với chuyên gia.
        </Typography>

        <Typography gutterBottom>
          <strong>Hành vi trong buổi phỏng vấn:</strong><br />
          - Thể hiện thái độ chuyên nghiệp.<br />
          - Tôn trọng chuyên gia, không dùng ngôn ngữ không phù hợp.
        </Typography>

        <Typography gutterBottom>
          <strong>Bảo mật thông tin:</strong><br />
          - Không chia sẻ nội dung buổi phỏng vấn hay thông tin cá nhân của chuyên gia.<br />
          - Tôn trọng quyền riêng tư và bảo mật dữ liệu.
        </Typography>

        <Typography gutterBottom>
          <strong>Phản hồi:</strong><br />
          - Được khuyến khích gửi phản hồi để cải thiện dịch vụ.<br />
          - Có quyền nhận phản hồi từ chuyên gia.
        </Typography>

        <Typography gutterBottom>
          <strong>Hủy bỏ và thay đổi:</strong><br />
          - Có quyền hủy lịch nhưng cần báo trước 24 giờ.<br />
          - Không báo có thể bị cảnh cáo tài khoản.
        </Typography>

        <Typography gutterBottom>
          <strong>Trách nhiệm:</strong><br />
          - Người dùng chịu trách nhiệm về hành vi và thông tin cung cấp.<br />
          - CodeMock không chịu trách nhiệm với các thiệt hại từ hành vi người dùng.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
