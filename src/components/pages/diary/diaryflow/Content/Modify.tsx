import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FlowDiaryInfo } from "@/types/types";
import KeywordTag from "@/components/common/KeywordTag/KeywordTag";
import { FADEINANIMATION } from "@/styles/animations";
import { formatDateWithWeek } from "@/utils/util";
import Divider from "@/components/common/Divider/Divider";
import DiaryFlowLayout from "../Layout";
import Button from "@/components/common/Button/Button";
import { putModifiedDiary } from "@/api/api";
import { toast } from "sonner";
import { useErrorBoundary } from "react-error-boundary";
import { useQueryClient } from "@tanstack/react-query";
import { TOAST_MESSAGE } from "@/constants/TOAST_MESSAGE";
import ROUTE_PATH from "@/constants/ROUTE_PATH";

interface ModifyProps {
  diaryInfo: FlowDiaryInfo;
  setDiaryInfo: React.Dispatch<React.SetStateAction<FlowDiaryInfo>>;
  onClickNext: () => void;
}

const Modify = ({ diaryInfo, setDiaryInfo, onClickNext }: ModifyProps) => {
  const { showBoundary } = useErrorBoundary();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedText, setSelectedText] = useState<Range | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number } | null>(null);

  const onClickNextHandler = async () => {
    try {
      if (diaryInfo.diaryId) {
        await putModifiedDiary({
          diaryId: diaryInfo.diaryId,
          content: diaryInfo.content,
          isPublic: diaryInfo.isPublic,
          weightedContents: diaryInfo.weightedContents,
        });
        toast(TOAST_MESSAGE.CONTENT_MODIFY);
        queryClient.removeQueries({ queryKey: ["diaryInfo", diaryInfo.diaryId] });
        navigate(`${ROUTE_PATH.DIARY}/${diaryInfo.diaryId}`, {
          replace: true,
        });
        onClickNext();
      } else throw new Error();
    } catch (error) {
      showBoundary(error);
    }
  };

  /**
   * 선택된 텍스트를 키워드로 추가하는 함수
   */
  const addKeyword = () => {
    if (selectedText) {
      const selection = window.getSelection();

      if (selection) {
        const text = selection.toString();
        setDiaryInfo((prev) => {
          if (!prev) return prev;
          return { ...prev, weightedContents: [...prev.weightedContents, text] };
        });
        setButtonPosition(null);
        setSelectedText(null);
      }
    }
  };

  /**
   * 키워드 태그 선택 시 삭제하는 함수
   * @param keywordToRemove
   */
  const handleKeywordClick = (keywordToRemove: string) => {
    setDiaryInfo((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        weightedContents: prev.weightedContents.filter((keyword) => keyword !== keywordToRemove),
      };
    });
  };

  /**
   * 마운트 시 diaryInfo 반영
   */
  useEffect(() => {
    const diaryInitInfo = location.state.diaryInfo;
    setDiaryInfo(diaryInitInfo);
  }, []);

  /**
   * diaryInfo 변경 시 textContent 변경
   */
  useEffect(() => {
    if (editorRef.current && diaryInfo) {
      editorRef.current.textContent = diaryInfo.content;
    }
  }, [diaryInfo]);

  useEffect(() => {
    /**
     * 선택된 택스트를 감지했을 경우 실행할 함수
     * @returns
     */
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // 텍스트가 선택된 상태일 때만 버튼 표시
      if (!selection.isCollapsed) {
        if (editorRef.current && editorRef.current.contains(range.startContainer)) {
          const editorRect = editorRef.current.getBoundingClientRect();

          setButtonPosition({
            x: rect.left - editorRect.left + rect.width / 2 - 30,
            y: rect.top - editorRect.top + 30,
          });
          setSelectedText(range);
        }
      } else {
        setButtonPosition(null);
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <>
      <DiaryFlowLayout>
        {diaryInfo && (
          <div className="flex h-full flex-col gap-600 font-Binggrae text-gray-900 dark:text-gray-50">
            <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
              {formatDateWithWeek(diaryInfo.date)}
            </div>
            <div className={`${FADEINANIMATION[1]} flex items-center gap-300 text-body-2`}>
              <div className="whitespace-nowrap py-200 font-Binggrae text-gray-500">키워드</div>
              <div className="flex gap-400 overflow-scroll">
                {diaryInfo.weightedContents.map((keyword) => (
                  <KeywordTag
                    key={keyword}
                    text={keyword}
                    onClick={() => handleKeywordClick(keyword)}
                  ></KeywordTag>
                ))}
              </div>
            </div>
            <Divider style={FADEINANIMATION[2]} />
            <div className="relative flex min-h-[80px] w-full flex-grow">
              <div
                ref={editorRef}
                className={`${
                  FADEINANIMATION[3]
                } w-full overflow-scroll whitespace-pre-wrap rounded-md border border-input bg-background px-3 py-2 font-Binggrae text-body-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={(e) => {
                  setDiaryInfo({ ...diaryInfo, content: e.currentTarget.textContent || "" });
                }}
              ></div>
              {diaryInfo.content.trim() === "" && (
                <div
                  className={`${FADEINANIMATION[3]} pointer-events-none absolute left-3 top-2 text-muted-foreground`}
                >
                  10자 이상 작성해주세요. 드래그해서 강조할 단어를 최대 5개 선택할 수 있어요.
                </div>
              )}
              {buttonPosition && (
                <button
                  onClick={addKeyword}
                  style={{
                    position: "absolute",
                    top: `${buttonPosition.y}px`,
                    left: `${buttonPosition.x}px`,
                  }}
                  className={`absolute z-50 rounded-md border bg-primary-medium px-3 py-2 text-sm text-background`}
                >
                  강조하기
                </button>
              )}
            </div>
          </div>
        )}
      </DiaryFlowLayout>
      <Button
        className="mx-auto mb-4"
        size="big"
        active={true}
        text="다음으로"
        onClickHandler={onClickNextHandler}
        bgColor="dark"
      />
    </>
  );
};

export default Modify;
