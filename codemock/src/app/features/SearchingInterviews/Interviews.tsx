import { Box } from '@mui/material';
import React from 'react';
import InterviewSessionCard from "@/app/components/InterviewSessionCard";
import { InterviewSessionResult } from '@/api/interview/interview-session.type';

interface Props {
  interviews: InterviewSessionResult[];
}

const SearchingInterviews: React.FC<Props> = ({ interviews }) => {
  console.log("SearchingInterviews", interviews?.length);
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(350px, 1fr))"
      gap={2}
      justifyContent="center"
      sx={{ margin: "0 auto", width: '100%', }}
    >
      {(interviews ?? []).map((session) => {
        const bookedInSession = session.interviewSlots?.filter(
          (slot) => slot.status === "booked"
        ).length;

        return (
          <Box key={session.sessionId}>
            <InterviewSessionCard
              session={session}
              bookedSlotCount={bookedInSession}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default SearchingInterviews;
