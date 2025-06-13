import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/authentication",
        destination: "/features/Authentication",
      },
      {
        source: "/Home",
        destination: "/features/Home",
      },
      {
        source: "/search",
        destination: "/features/SearchingInterviews",
      },
      {
        source: "/schedule",
        destination: "/features/Schedule",
      },
      {
        source: "/interviewReviewAndFeedback",
        destination: "/features/InterviewReviewAndFeedback",
      },
      {
        source: "/settings",
        destination: "/features/Settings",
      },
      {
        source: "/Interview/create-interview",
        destination: "/features/Interview/create-interview",
      },
      {
        source: "/interview/:id",
        destination: "/features/Interview/InterviewSectionPage/:id",
      },
    ];
  },

  transpilePackages: ["@zegocloud/zego-uikit-prebuilt"],
};

export default nextConfig;
