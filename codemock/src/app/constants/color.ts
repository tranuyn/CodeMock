export function mapStatusToColor(score: number, isText = false): string {
  if (score < 5) {
    return isText ? "red" : "rgba(255, 0, 0, 0.5)";
  } else if (score >= 5 && score <= 6) {
    return isText ? "#E3C21D" : "#F6FAD2";
  } else if (score > 6) {
    return isText ? "green" : "rgba(0, 128, 0, 0.5)";
  } else {
    return "gray";
  }
}
