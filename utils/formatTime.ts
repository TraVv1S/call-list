export const formatDuration = (timeInSeconds: string | number): string => {
  if (!timeInSeconds) return "";

  const seconds = Number(timeInSeconds);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
