// src/components/sections/RecommendationsSection.jsx
"use client";

import { useState } from "react";
import { Box, Typography, Container, Grid, Button, Card, CardContent, CardActions, Chip } from "@mui/material";
import Link from "next/link";

export default function RecommendationsSection() {
  const [jobRecommendations] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "10:00-10:30",
      salary: "5-6 tr",
      isFree: true
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "11:00-11:30",
      salary: "4-5 tr",
      isFree: true
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "14:00-14:30",
      salary: "6-7 tr",
      isFree: true
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "15:00-15:30",
      salary: "8-10 tr",
      isFree: true
    },
    {
      id: 5,
      title: "Product Manager",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "16:00-16:30",
      salary: "7-9 tr",
      isFree: true
    },
    {
      id: 6,
      title: "React Developer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "10:30-11:00",
      salary: "5-6 tr",
      isFree: true
    },
    {
      id: 7,
      title: "Mobile Developer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "13:00-13:30",
      salary: "6-8 tr",
      isFree: true
    },
    {
      id: 8,
      title: ".NET Developer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "09:00-09:30",
      salary: "5-7 tr",
      isFree: true
    },
    {
      id: 9,
      title: "Java Developer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "11:30-12:00",
      salary: "6-8 tr",
      isFree: true
    }
  ]);

  return (
    <Container maxWidth={false} sx={{ flex: 1, py: 6, bgcolor: "rgba(240, 240, 240, 0.65)", borderRadius: 2, backdropFilter: 'blur(1px)', width: '90%' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Đề Xuất Cho Bạn
      </Typography>
      
      <Grid container spacing={2}>
        {jobRecommendations.map((job) => (
          <Grid size={{ xs: 12, sm:6, md:4, lg: 3, xl: 2 }} key={job.id}>
            <Card 
              sx={{ 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                position: "relative",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 3
                }
              }}
            >
              <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                {job.isFree && (
                  <Chip 
                    label="Free" 
                    size="small" 
                    sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", mr: 1 }} 
                  />
                )}
                <Chip 
                  label={job.time} 
                  size="small" 
                  sx={{ bgcolor: "#e3f2fd", color: "#1565c0", mr: 1 }} 
                />
                <Chip 
                  label={job.salary} 
                  size="small" 
                  sx={{ bgcolor: "#f3e5f5", color: "#6a1b9a" }} 
                />
              </Box>
              <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  {job.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "grey.300",
                      mr: 1,
                    }}
                  />
                  <Box>
                    <Typography variant="body2">{job.company}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {job.position}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {job.location}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Button variant="outlined" size="small">
                  View details
                </Button>
                <Button variant="contained" color="primary" size="small">
                  Apply now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Link href="/jobs" passHref style={{ textDecoration: 'none' }}>
          <Button variant="outlined">Xem thêm</Button>
        </Link>
      </Box>
    </Container>
  );
}