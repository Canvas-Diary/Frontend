import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://api.canvas-diary.kro.kr",
});

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

export interface NewDiaryInfo {
  date: Date;
  content: string;
  style: string;
  isPublic: boolean;
}
