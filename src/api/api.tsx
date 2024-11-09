import axios from "axios";
import {
  Diaries,
  DiaryInfo,
  Emotions,
  NewDiaryInfo,
  SearchedDiaries,
  Styles,
} from "../types/types";

const BASE_URL = "http://api.canvas-diary.kro.kr";

const getToken = () => {
  return localStorage.getItem("access_token");
};

const storeToken = (accessToken: string) => {
  localStorage.setItem("access_token", accessToken);
};

const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

const storeRefreshToken = (refreshToken: string) => {
  localStorage.setItem("refresh_token", refreshToken);
};

/**
 * api 기본 설정
 */
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

/**
 * api request interceptor
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
    throw error;
  }
);

/**
 * api response interceptor
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;

      // 무한 루프 방지: 토큰 갱신 요청인 경우 바로 오류 반환
      if (originalRequest.url.includes("/auth/reissue")) {
        throw error;
      }

      try {
        await updatewAccessToken();
        originalRequest.headers.Authorization = `Bearer ${getToken()}`;
        return axiosInstance(originalRequest);
      } catch (tokenError) {
        storeToken("");
        storeRefreshToken("");
        window.location.href = "/login";
        throw tokenError;
      }
    }
    throw error;
  }
);

/**
 * 리프레시 토큰으로 엑세스 토큰 갱신
 */
export const updatewAccessToken = async () => {
  try {
    const refreshToken = getRefreshToken();
    const response = await axiosInstance.post("/api/v1/auth/reissue", { refreshToken });
    storeToken(response.data.accessToken);
  } catch (error) {
    throw error;
  }
};

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
 * @param param0 DiaryExploreProps
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

interface NewImageProps {
  diaryId: string;
  style: string;
}

/**
 * 기존의 일기에 새로운 이미지 추가
 * @param param0 NewImageProps
 */
export const postImageToDiary = async ({ diaryId, style }: NewImageProps) => {
  try {
    await axiosInstance.post(`/api/v1/diaries/${diaryId}/images`, { style });
  } catch (error) {
    throw error;
  }
};

interface ModifiedDiaryProps {
  diaryId: string;
  content: string;
  isPublic: boolean;
}

/**
 * 일기 수정
 * @param param0 ModifyDiaryProps
 * @returns
 */
export const putModifiedDiary = async ({ diaryId, content, isPublic }: ModifiedDiaryProps) => {
  try {
    await axiosInstance.put(`/api/v1/diaries/${diaryId}`, { content, isPublic });
  } catch (error) {
    throw error;
  }
};

/**
 * 일기 삭제
 * @param diaryId
 */
export const deleteDiary = async (diaryId: string) => {
  try {
    await axiosInstance.delete(`/api/v1/diaries/${diaryId}`);
  } catch (error) {
    throw error;
  }
};

interface DeleteImageProps {
  diaryId: string;
  imageId: string;
}

export const deleteImage = async ({ diaryId, imageId }: DeleteImageProps) => {
  try {
    await axiosInstance.delete(`/api/v1/diaries/${diaryId}/images/${imageId}`);
  } catch (error) {
    throw error;
  }
};
