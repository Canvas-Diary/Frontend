import axios from "axios";
import {
  Diaries,
  DiaryInfo,
  Emotions,
  MyDiaryInfo,
  NewDiaryInfo,
  SearchedDiaries,
  Styles,
} from "../types/types";

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

/**
 * 일기 생성하기
 * @param newDiaryInfo
 * @returns
 */
export const createDiaryAndGetId = async (newDiaryInfo: NewDiaryInfo): Promise<string> => {
  try {
    const response = await axiosInstance.post("/api/v1/diaries", newDiaryInfo);
    return response.data.diaryId;
  } catch (error) {
    throw error;
  }
};

/**
 * 내 일기 정보 가져오기
 * @param diaryId
 * @returns
 */
export const getMyDiaryInfoById = async (diaryId: string): Promise<MyDiaryInfo> => {
  try {
    const response = await axiosInstance.get(`/api/v1/diaries/${diaryId}/my`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 일기 정보 가져오기
 * @param diaryId
 * @returns
 */
export const getDiaryInfoById = async (diaryId: string): Promise<DiaryInfo> => {
  try {
    const response = await axiosInstance.get(`/api/v1/diaries/${diaryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 달력 일기 목록 가져오기
 * @param date
 * @returns
 */
export const getMonthlyDiariesByDate = async (date: string): Promise<Diaries> => {
  try {
    const params = { date: date };
    const response = await axiosInstance.get(`/api/v1/diaries`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface DiarySearchProps {
  page: number;
  size: number;
  tag?: string | null;
  content?: string | null;
}

/**
 * 앨범 화면 일기 목록 가져오기
 * @param param0 DiarySearchProps
 * @returns SearchedDiaries
 */
export const getSearchedDiaries = async ({
  page,
  size,
  tag,
  content,
}: DiarySearchProps): Promise<SearchedDiaries> => {
  try {
    const params: DiarySearchProps = { page, size };

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

/**
 * 좋아요 추가
 */
export const addLike = async (diaryId: string) => {
  try {
    await axiosInstance.post(`/api/v1/diaries/${diaryId}/like`);
  } catch (error) {
    throw error;
  }
};

/**
 * 좋아요 삭제
 * @param diaryId
 */
export const removeLike = async (diaryId: string) => {
  try {
    await axiosInstance.delete(`/api/v1/diaries/${diaryId}/like`);
  } catch (error) {
    throw error;
  }
};

export const getStyles = async (): Promise<Styles> => {
  try {
    const response = await axiosInstance.get(`/api/resources/styles`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmotions = async (): Promise<Emotions> => {
  try {
    const response = await axiosInstance.get(`/api/resources/emotions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface DiaryExploreProps {
  page: number;
  size: number;
  order: "LATEST" | "POPULARITY";
}

/**
 * 탐색 화면 일기 목록 가져오기
 * @param param0
 * @returns
 */
export const getExploreDiaries = async ({
  page,
  size,
  order,
}: DiaryExploreProps): Promise<SearchedDiaries> => {
  try {
    const params = { page, size, order };
    const response = await axiosInstance.get(`/api/v1/diaries/explore`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
