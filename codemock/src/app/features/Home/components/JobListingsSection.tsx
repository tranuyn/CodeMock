// src/components/JobListingsSection.jsx
"use client";

import { Box, Typography, Container, Grid, Button, Card, CardContent, CardActions, Chip } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function JobListingsSection() {
  const [jobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "10:00-10:30",
      isFree: true
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "11:00-11:30",
      isFree: true
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Michael Work",
      position: "Manager of PTT Software",
      location: "TP HCM (q.1)",
      time: "14:00-14:30",
      isFree: true
    }
  ]);

  return (
    <Container maxWidth="lg" sx={{ py: 6, bgcolor: "rgba(240, 240, 240, 0.65)", borderRadius: 2, backdropFilter: 'blur(1px)', }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Bạn Có Buổi Phỏng Vấn Sắp Diễn Ra
        </Typography>
        <Link href="/Schedule" passHref style={{ textDecoration: 'none' }}>
          <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
            Xem tất cả lịch trình
          </Typography>
        </Link>
      </Box>
      
      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
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
                  sx={{ bgcolor: "#e3f2fd", color: "#1565c0" }} 
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
    </Container>
  );
}