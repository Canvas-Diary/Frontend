import axios from "axios";

const BASE_URL = "http://api.canvas-diary.kro.kr";

const getToken = () => {
  return localStorage.getItem("access_token");
};

/**
 * api 기본 설정
 */
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

/**
 * api interceptor
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const createDiaryAndGetId = async (newDiaryInfo: NewDiaryInfo) => {
  try {
    const response = await axiosInstance.post("/api/v1/diaries", newDiaryInfo);
    return response.data.diaryId;
  } catch (error) {
    throw error;
  }
};

export const getDiaryInfoById = async (diaryId: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/diaries/${diaryId}/my`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMonthlyDiariesByDate = async (date: string) => {
  try {
    const params = { date: date };
    const response = await axiosInstance.get(`/api/v1/diaries`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface DiarySearchParams {
  page: number;
  size: number;
  tag?: string;
  content?: string;
}

export const getSearchedDiaries = async ({ page, size, tag, content }: DiarySearchParams) => {
  try {
    const params: DiarySearchParams = { page, size };

    if (tag) {
      params.tag = tag;
    }

    if (content) {
      params.content = content;
    }

    const response = await axiosInstance.get("/api/v1/diaries/search", {
      params,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export interface NewDiaryInfo {
  date: string;
  content: string;
  style: string;
  isPublic: boolean;
}
