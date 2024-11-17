import { useLocation, useOutletContext } from "react-router-dom";
import { formatDateWithWeek } from "../../utils/util";
import { ContextProps } from "./Layout/DiaryWriteFlowLayout";
import { FADEINANIMATION } from "../../styles/animations";
import { useEffect, useRef, useState } from "react";
import Toggle from "../../components/common/Toggle";
import Divider from "../../components/common/Divider";

const Write = () => {
  const location = useLocation();
  const date = location.state.date;
  const { diaryInfo, setDiaryInfo } = useOutletContext<ContextProps>();
  const editorRef = useRef<HTMLDivElement>(null);
  const [buttonPosition, setButtonPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState<Range | null>(null);

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
      const range = selectedText;

      if (selection && range) {
        document.execCommand("bold");

        setButtonPosition(null);
        setSelectedText(null);

        if (editorRef.current) {
          extractBoldText();
        }
      }
    }
  };

  /**
   * 일기 ref에서 b 태그로 강조된 단어 리스트 생성하는 함수
   * @returns
   */
  const extractBoldText = () => {
    if (!editorRef.current) return;

    const boldTexts: string[] = [];
    editorRef.current.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.tagName === "B") {
          boldTexts.push(element.textContent || "");
        }
      }
    });

    console.log("Bold Texts:", boldTexts);
    return boldTexts;
  };

  const isBold = document.queryCommandState("bold");

  return (
    <div className="flex h-full flex-col gap-600 font-Binggrae text-gray-900">
      <div className={`${FADEINANIMATION[0]} font-BinggraeBold text-title-2`}>
        {formatDateWithWeek(date)}
      </div>
      <div className={`${FADEINANIMATION[1]} flex items-center gap-300 text-body-2`}>
        <div className="font-Binggrae text-gray-500">공개 여부</div>
        <div className="flex items-center justify-center rounded-50 bg-primary-light-2 px-300 py-200">
          {diaryInfo.isPublic ? "공개" : "비공개"}
        </div>
        <div className="ml-auto">
          <Toggle
            onClickHandler={() => setDiaryInfo({ ...diaryInfo, isPublic: !diaryInfo.isPublic })}
            isChecked={diaryInfo.isPublic}
          ></Toggle>
        </div>
      </div>
      <Divider style={FADEINANIMATION[2]} />
      <div className="relative flex min-h-[80px] w-full flex-grow">
        <div
          ref={editorRef}
          className={`${
            FADEINANIMATION[3]
          } w-full rounded-md border border-input bg-background px-3 py-2 font-Binggrae text-body-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
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
            10자 이상
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
            className={`absolute z-50 rounded-md border px-3 py-2 text-sm ${
              isBold
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-gray-300 bg-white text-black"
            }`}
          >
            Bold
          </button>
        )}
      </div>
    </div>
  );
};

export default Write;
