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

//일기 생성 정보
export type NewDiaryInfo = {
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
