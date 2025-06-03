"use client";

import { useCallback } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len: number) {
  let result = "";
  if (result) return result;
  const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYGFUIOLKJP";
  const maxPos = chars.length;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  const urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function Meeting() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  const myMeetingRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (!element) return;

      (async () => {
        const appID = Number(process.env.NEXT_PUBLIC_ZEGOCLOUD_APPID);
        const serverSecret = String(
          process.env.NEXT_PUBLIC_ZEGOCLOUD_SERVERSECRET
        );
        console.log(appID);
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomID,
          randomID(5),
          randomID(5)
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container: element,
          sharedLinks: [
            {
              name: "Codemock meeting link",
              url: "https://your‐ngrok‐domain.com" + "?roomID=" + roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // hoặc OneONoneCall
          },
        });
      })();
    },
    [roomID]
  );

  return (
    <div
      className="myCallContainer"
      ref={myMeetingRef}
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
