import { alpha } from '@mui/material/styles';

export function mapStatusToColor(score: number, isText = false): string {
  if (score < 5) {
    return isText ? "#d32f2f" : alpha("#d32f2f", 0.15); // đỏ
  } else if (score >= 5 && score <= 6) {
    return isText ? "#f9a825" : alpha("#f9a825", 0.15); // vàng
  } else if (score > 6) {
    return isText ? "#388e3c" : alpha("#388e3c", 0.15); // xanh
  } else {
    return isText ? "#757575" : alpha("#757575", 0.15); // xám
  }
}
