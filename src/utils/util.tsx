export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatDateWithWeek = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const dayName = date.toLocaleDateString("ko-KR", { weekday: "short" }); // 요일 이름 (ex. Fri)

  return `${year}. ${month}. ${day} (${dayName})`;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * URL 파라미터를 생성하는 함수
 * @param params 파라미터 객체
 * @returns URL 파라미터 문자열
 */
export const createQueryParams = (params: Record<string, any>) => {
  const urlParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      urlParams.append(key, value);
    }
  });

  return urlParams.toString();
};

/**
 * 이미지 url로부터 이미지 다운로드 링크 생성
 * @param url
 * @returns
 */
export const toDataURL = (url: string) => {
  try {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  } catch (error) {
    throw error;
  }
};

/**
 * 이미지 다운로드
 * @param url
 * @param fileName
 */
export const downloadFile = async (url: string, fileName?: string) => {
  const a = document.createElement("a");
  const extension = url.split(".").pop();
  a.href = await toDataURL(url);
  a.download = fileName ? `${fileName}.${extension}` : `download.${extension}`;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
