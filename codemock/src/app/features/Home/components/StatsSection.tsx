// src/components/StatsSection.jsx
"use client";

import { Box, Typography, Grid, Container } from "@mui/material";
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

export default function StatsSection() {
  const stats = [
    { 
      icon: <WorkOutlineIcon sx={{ color: "white", fontSize: 32 }} />,
      count: "25,810",
      label: "Jobs" 
    },
    { 
      icon: <BusinessIcon sx={{ color: "white", fontSize: 32 }} />,
      count: "10,240",
      label: "Companies" 
    },
    { 
      icon: <PeopleOutlineIcon sx={{ color: "white", fontSize: 32 }} />,
      count: "16,400",
      label: "Candidates" 
    }
  ];

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        pt: { xs: 4, md: 12 }, 
        pb: 6, 
        flex: {md: 1, lg: 1.5},
        display: 'flex', 
        alignItems: 'center' 
      }}
    >
      <Grid container justifyContent={{ xs: "center", md: "flex-end" }}>
        <Grid  size={{ sm: 6, md: 12 }} >
          <Grid container spacing={2}>
            {stats.map((stat, index) => (
              <Grid key={index}>
                <Box 
                  sx={{ 
                    bgcolor: "rgba(75, 0, 130, 0.7)", 
                    p: 2, 
                    borderRadius: 2, 
                    textAlign: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
                    }
                  }}
                >
                  {stat.icon}
                  <Typography variant="h5" sx={{ color: "white", fontWeight: "bold" }}>
                    {stat.count}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}