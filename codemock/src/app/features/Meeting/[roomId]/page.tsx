"use client";

import { useCallback, useRef, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/redux";
import { post } from "@/api/rest-utils";

export default function Meeting() {
  const params = useParams();
  const roomID = String(params.roomId);
  const zpRef = useRef<any>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const isJoinedRef = useRef(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const myMeetingRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element || isJoinedRef.current) return;

      (async () => {
        try {
          const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APPID);
          const serverSecret = String(
            process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVERSECRET
          );

          if (!appID || !serverSecret) {
            console.error("Missing ZEGOCLOUD credentials");
            return;
          }

          const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            user.id,
            user.username
          );

          const zp = ZegoUIKitPrebuilt.create(kitToken);
          zpRef.current = zp;
          isJoinedRef.current = true;

          await zp.joinRoom({
            container: element,
            sharedLinks: [
              {
                name: "Codemock meeting link",
                url: window.location.origin + "/features/Meeting/" + roomID,
              },
            ],
            scenario: {
              mode: ZegoUIKitPrebuilt.GroupCall,
            },
            onJoinRoom: async () => {
              try {
                const stream = await navigator.mediaDevices.getUserMedia({
                  audio: true,
                });
                const recorder = new MediaRecorder(stream);
                chunksRef.current = [];
                recorder.ondataavailable = (e) => {
                  chunksRef.current.push(e.data);
                };
                recorder.start();
                recorderRef.current = recorder;
              } catch (err) {
                console.error("MediaRecorder init failed:", err);
              }
            },
            onLeaveRoom: async () => {
              if (recorderRef.current) {
                recorderRef.current.stop();
                recorderRef.current.onstop = () => {
                  const blob = new Blob(chunksRef.current, {
                    type: "audio/webm",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.href = url;
                  a.download = `meeting_${roomID}.webm`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                };
              }
            },
          });
        } catch (error) {
          console.error("Error joining room:", error);
          isJoinedRef.current = false;
        }
      })();
    },
    [roomID] // Chỉ phụ thuộc vào roomID
  );

  // Cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (zpRef.current && isJoinedRef.current) {
        try {
          zpRef.current.destroy();
        } catch (error) {
          console.error("Error destroying zego instance:", error);
        }
        isJoinedRef.current = false;
      }
    };
  }, []);

  if (!params?.roomId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Room ID not found. Please reload page.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="myCallContainer"
      ref={myMeetingRef}
      style={{ width: "100%", height: "90vh" }}
    />
  );
}
