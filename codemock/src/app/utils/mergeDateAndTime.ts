export const mergeDateAndTime = (date: Date, time: Date): Date => {
  const result = new Date(date);
  result.setHours(time.getHours(), time.getMinutes(), 0, 0);
  return result;
};
