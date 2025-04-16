// src/components/ChangeFutureSection.jsx
"use client";

import { Box, Typography, Container, Button } from "@mui/material";
import Link from "next/link";

export default function ChangeFutureSection() {
  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 10 }, 
        position: "relative",
        color: "white",
        textAlign: "center",
        overflow: "hidden"
      }}
    >
      
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          gutterBottom
          sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}
        >
          Thay đổi tương lai của bạn
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Là vinh dự của chúng tôi
        </Typography>
        <Link href="/search" passHref style={{ textDecoration: 'none' }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              bgcolor: "#651fff",
              "&:hover": { bgcolor: "#4527a0" },
              px: 4,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Tìm kiếm ngay
          </Button>
        </Link>
      </Container>
    </Box>
  );
}