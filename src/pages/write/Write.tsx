import { useLocation, useOutletContext } from "react-router-dom";
import { formatDateWithWeek } from "../../utils/util";
import { ContextProps } from "./Layout/DiaryWriteFlowLayout";
import { FADEINANIMATION } from "../../styles/animations";
import { useEffect, useRef, useState } from "react";
import Toggle from "../../components/common/Toggle";
import Divider from "../../components/common/Divider";
import KeywordTag from "@/components/common/KeywordTag";

const Write = () => {
  const location = useLocation();
  const date = location.state.date;
  const { diaryInfo, setDiaryInfo } = useOutletContext<ContextProps>();
  const editorRef = useRef<HTMLDivElement>(null);
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState<Range | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);

  useEffect(() => {
    setDiaryInfo({ ...diaryInfo, date: date });
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
   * 선택된 텍스트를 bold 처리하는 함수
   */
  const makeBold = () => {
    if (selectedText) {
      const selection = window.getSelection();

      if (selection) {
        const text = selection.toString();
        setKeywords((prev) => {
          return text ? [...prev, text] : prev;
        });
        setButtonPosition(null);
        setSelectedText(null);
      }
    }
  };

  const handleKeywordClick = (keywordToRemove: string) => {
    setKeywords((prev) => prev.filter((keyword) => keyword !== keywordToRemove));
  };

  return (
    <div className="flex h-full flex-col gap-600 font-Binggrae text-gray-900 dark:text-gray-50">
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
          {keywords.map((keyword) => (
            <KeywordTag text={keyword} onClick={() => handleKeywordClick(keyword)}></KeywordTag>
          ))}
        </div>
      </div>
      <Divider style={FADEINANIMATION[3]} />
      <div className="relative flex min-h-[80px] w-full flex-grow">
        <div
          ref={editorRef}
          className={`${
            FADEINANIMATION[4]
          } w-full overflow-scroll rounded-md border border-input bg-background px-3 py-2 font-Binggrae text-body-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
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
            onClick={makeBold}
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
  );
};

export default Write;
