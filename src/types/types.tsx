//달력 일기 목록
export type Diaries = {
  diaries: Diary[];
};

//달력 일기 정보
export type Diary = {
  diaryId: string;
  date: string;
  emotion: string;
};

//일기 생성, 수정 정보
export type FlowDiaryInfo = {
  diaryId?: string;
  date: string;
  content: string;
  style: string;
  isPublic: boolean;
  weightedContents: string[];
};

//일기 조회 정보
export type DiaryInfo = {
  diaryId: string;
  content: string;
  emotion: string;
  isMine: boolean;
  likedCount: number;
  isLiked: boolean;
  isPublic: boolean;
  date: string;
  images: DiaryImage[];
  weightedContents: string[];
};

//일기 조회 이미지
export type DiaryImage = {
  imageId: string;
  isMain: boolean;
  imageUrl: string;
};

//검색 일기 목록
export type SearchedDiaries = {
  content: SearchedDiary[];
  size: number;
  number: number;
  hasNext: boolean;
};

//검색 일기 정보
export type SearchedDiary = {
  diaryId: string;
  mainImageUrl: string;
};

//화풍 목록
export type Styles = {
  styles: Style[];
};

//화풍 정보
export type Style = {
  name: string;
  koreanName: string;
  imageUrl: string;
};

//감정 목록
export type Emotions = {
  emotions: Emotion[];
};

//감정 정보
export type Emotion = {
  name: string;
  koreanName: string;
};

//감정 통계 정보
export type EmotionStatsData = {
  barData: EmotionBarData;
  pieData: EmotionPieData;
};

//감정 막대 그래프 정보
export type EmotionBarData = {
  dataKey: number;
  positive: number;
  neutral: number;
  negative: number;
}[];

//감정 도넛 그래프 정보
export type EmotionPieData = { emotion: string; diaryCount: number }[];

//키워드 워드클라우드, 그래프 통계 정보
export type KeywordStatsData = {
  keywordData: KeywordData[];
};

//키워드 정보
export type KeywordData = {
  name: string;
  value: number;
};

//회고 일기 정보
export type ReviewDiaryInfo = {
  diaryId: string;
  content: string;
  emotion: string;
  likedCount: number;
  isLiked: boolean;
  date: string;
  images: DiaryImage[];
  type: string;
};

//모달 상태 관리 정보
export type ModalManager = {
  activeModal: string | null;
  openModal: (state: string) => void;
  closeModal: () => void;
};
