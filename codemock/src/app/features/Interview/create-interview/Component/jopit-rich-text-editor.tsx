"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Jodit } from "jodit";

// Import types từ jodit-react
interface JoditProps {
  value: string;
  config: any;
  onChange: (newContent: string) => void;
}

// Định nghĩa interface cho props của component
interface JoditEditorProps {
  header: string;
  content: string; // Initial content value
  setContent: (content: string) => void;
  config?: Record<string, any>;
}

// Import Jodit Editor chỉ ở phía client
const JoditEditorNoSSR = dynamic<JoditProps>(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="border rounded p-4 bg-gray-50 h-96 flex items-center justify-center">
      <div className="text-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p className="mt-2">Đang tải trình soạn thảo...</p>
      </div>
    </div>
  ),
});

const JoditEditor: React.FC<JoditEditorProps> = ({
  header,
  content,
  setContent,
  config = {},
}) => {
  const editorRef = useRef<Jodit | null>(null); // Ref for the Jodit instance
  const contentRef = useRef<string>(content); // Ref to store content value
  const isMountedRef = useRef<boolean>(false);

  // Chỉ render ở phía client
  useEffect(() => {
    isMountedRef.current = true;

    // Initialize contentRef with the initial content
    contentRef.current = content;

    return () => {
      isMountedRef.current = false;
    };
  }, [content]);

  // Cấu hình mặc định cho Jodit với các plugins được bật đầy đủ
  const defaultConfig: Record<string, any> = {
    readonly: false,
    height: 400,
    placeholder: "Bắt đầu viết...",
    enableDragAndDropFileToEditor: true,
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "ul", // Đảm bảo có nút ul ở đây
      "ol", // Đảm bảo có nút ol ở đây
      "|",
      "indent",
      "outdent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "table",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "fullsize",
    ],
    buttonsMD: [
      "bold",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "|",
      "image",
      "table",
      "link",
    ],
    buttonsSM: [
      "bold",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "fontsize",
      "|",
      "image",
      "link",
    ],
    buttonsXS: ["bold", "italic", "|", "ul", "ol", "|", "image"],
    extraButtons: [], // Thêm các nút tùy chỉnh nếu cần

    // Đảm bảo các plugins cần thiết được kích hoạt
    disablePlugins: [], // Không vô hiệu hóa plugins nào

    // Bật các plugins liên quan đến danh sách
    activeButtonsInReadOnly: [],

    // Cho phép sử dụng phím tắt
    hotkeys: {
      "ctrl+b": "bold",
      "ctrl+i": "italic",
      "ctrl+u": "underline",
      "ctrl+shift+7": "insertOrderedList",
      "ctrl+shift+8": "insertUnorderedList",
    },

    // Bật xử lý sự kiện paste
    processPastedHTML: true,

    // Xử lý danh sách paste
    processPastedFromWord: true,

    // Cấu hình uploader
    uploader: {
      insertImageAsBase64URI: true,
    },

    // Sự kiện
    events: {
      // Add custom event to handle editor instance reference
      afterInit: (instance: Jodit) => {
        editorRef.current = instance;

        // Thêm event listener cho toolbar nếu cần
        if (instance.toolbar) {
          const ulButton = instance.toolbar
            .getButtonsNames()
            .find((btn) => btn === "ul");
          if (ulButton) {
            console.log("UL button is available in toolbar");
          }
        }
      },
      beforeDestroy: () => {
        editorRef.current = null;
      },
    },
    // Merge với config được truyền vào
    ...config,
  };

  // Handler for when content changes
  const handleContentChange = (newContent: string) => {
    // Update the ref
    contentRef.current = newContent;

    // Call the parent component's setContent function
    setContent(newContent);
  };

  // Custom function to create list
  const createList = (type: "ul" | "ol") => {
    if (editorRef.current) {
      if (type === "ul") {
        editorRef.current.execCommand("insertUnorderedList");
      } else {
        editorRef.current.execCommand("insertOrderedList");
      }
    }
  };

  // Đảm bảo rằng component chỉ được render ở phía client
  if (!isMountedRef.current && typeof window === "undefined") {
    return null;
  }

  return (
    <div>
      <p
        style={{
          fontWeight: "600",
          fontSize: "large",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        {header}
      </p>

      <JoditEditorNoSSR
        value={content}
        config={defaultConfig}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default JoditEditor;
