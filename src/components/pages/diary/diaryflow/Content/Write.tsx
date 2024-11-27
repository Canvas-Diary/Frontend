import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import KeywordTag from "@/components/common/KeywordTag/KeywordTag";
import { FlowDiaryInfo } from "@/types/types";
import { FADEINANIMATION } from "@/styles/animations";
import { formatDateWithWeek } from "@/utils/util";
import Divider from "@/components/common/Divider/Divider";
import Toggle from "@/components/common/Toggle/Toggle";
import Button from "@/components/common/Button/Button";
import DiaryFlowLayout from "../Layout";

interface WriteProps {
  diaryInfo: FlowDiaryInfo;
  setDiaryInfo: React.Dispatch<React.SetStateAction<FlowDiaryInfo>>;
  onClickNext: () => void;
}

const Write = ({ diaryInfo, setDiaryInfo, onClickNext }: WriteProps) => {
  const location = useLocation();
  const date = location.state.date;
  const editorRef = useRef<HTMLDivElement>(null);
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState<Range | null>(null);

  const onClickNextHandler = () => {
    onClickNext();
  };

  /**
   * 마운트 시 date, content 반영
   */
  useEffect(() => {
    if (date) setDiaryInfo({ ...diaryInfo, date: date });
    if (editorRef.current) {
      editorRef.current.textContent = diaryInfo.content;
    }
  }, []);

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

  /**
   * 선택된 텍스트를 키워드로 추가하는 함수
   */
  const addKeyword = () => {
    if (selectedText) {
      const selection = window.getSelection();

      if (selection) {
        const text = selection.toString();
        setDiaryInfo((prev) => {
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
      return {
        ...prev,
        weightedContents: prev.weightedContents.filter((keyword) => keyword !== keywordToRemove),
      };
    });
  };

  return (
    <>
      <DiaryFlowLayout>
        <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
          {formatDateWithWeek(date)}
        </div>
        <div className={`${FADEINANIMATION[1]} flex items-center gap-300 text-body-2`}>
          <div className="py-200 font-Binggrae text-gray-500">공개 여부</div>
          <div className="flex items-center justify-center rounded-50 bg-primary-light-2 px-300 py-200 dark:bg-primary-medium">
            {diaryInfo.isPublic ? "공개" : "비공개"}
          </div>
          <div className="ml-auto">
            <Toggle
              onClickHandler={() => setDiaryInfo({ ...diaryInfo, isPublic: !diaryInfo.isPublic })}
              isChecked={diaryInfo.isPublic}
            ></Toggle>
          </div>
        </div>
        <div className={`${FADEINANIMATION[2]} flex items-center gap-300 text-body-2`}>
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
        <Divider style={FADEINANIMATION[3]} />
        <div className="relative flex min-h-[80px] w-full flex-grow">
          <div
            ref={editorRef}
            className={`${
              FADEINANIMATION[4]
            } w-full overflow-scroll whitespace-pre-wrap rounded-md border border-input bg-background px-3 py-2 font-Binggrae text-body-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(e) => {
              setDiaryInfo({ ...diaryInfo, content: e.currentTarget.textContent || "" });
            }}
          ></div>
          {diaryInfo.content.trim() === "" && (
            <div
              className={`${FADEINANIMATION[4]} pointer-events-none absolute left-3 top-2 text-muted-foreground`}
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
      </DiaryFlowLayout>
      <Button
        className="mx-auto mb-4"
        size="big"
        active={diaryInfo.content.length >= 10}
        text="다음으로"
        onClickHandler={onClickNextHandler}
        bgColor="dark"
      />
    </>
  );
};

export default Write;
