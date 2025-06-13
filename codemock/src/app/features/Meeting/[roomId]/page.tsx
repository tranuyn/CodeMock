"use client";

import { useCallback, useRef, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "next/navigation";

export default function Meeting() {
  const params = useParams();
  const roomID = String(params.roomId);
  const zpRef = useRef<any>(null);
  const isJoinedRef = useRef(false);

  const myMeetingRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element || isJoinedRef.current) return;

      (async () => {
        try {
          const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APPID);
          const serverSecret = String(
            process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVERSECRET
          );

          console.log("AppID:", appID);

          if (!appID || !serverSecret) {
            console.error("Missing ZEGOCLOUD credentials");
            return;
          }

          const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            roomID,
            roomID
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
            onJoinRoom: () => {
              console.log("Successfully joined room:", roomID);
            },
            onLeaveRoom: () => {
              console.log("Left room:", roomID);
              isJoinedRef.current = false;
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
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
