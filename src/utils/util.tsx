export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const dayName = dayNames[dateObj.getDay()];

  return `${year}. ${month}. ${day} (${dayName})`;
};
