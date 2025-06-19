import { InterviewInSchedule } from "../../Schedule/page";
import InterviewCard from "./InterviewCard";
import InterviewMentorCard from "./InterviewMentorCard";
import { Box } from "@mui/material";

const InterviewList = ({ interviews }: { interviews: InterviewInSchedule[] }) => {
 
  return (
    <Box>
      {interviews.map((item) =>
        item.type === "SLOT" && item.slotData ? (
          <InterviewCard
            key={item.slotData.slotId}
            interview={item.slotData}
          />
        ) : (
          <InterviewMentorCard
            key={item.data.sessionId}
            session={item.data}
          />
        )
      )}
    </Box>
  );
};

export default InterviewList;