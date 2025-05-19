// src/components/HeroSection.jsx
"use client";

import { Box, Typography, Container, Grid } from "@mui/material";

export default function HeroSection() {
  const companyLogos = [
    { name: "Spotify", logo: "/logos/spotify.svg" },
    { name: "Slack", logo: "/logos/slack.svg" },
    { name: "Adobe", logo: "/logos/adobe.svg" },
    { name: "Asana", logo: "/logos/asana.svg" },
    { name: "Linear", logo: "/logos/linear.svg" }
  ];

  return (
    <Container maxWidth={false} sx={{ pt: { xs: 6, md: 10 }, pb: 6, flex: {md: 1.5, lg: 1} }}>
      <Grid container size={{ xs: 12, md: 6 }} >
        <Typography 
          variant="h3" 
          sx={{ 
            color: "white", 
            fontWeight: 'bold', 
            mb: 2,
            fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }
          }}
        >
          Phỏng vấn mọi lúc, mọi nơi, mọi ngành nghề
        </Typography>
        
        <Typography variant="body1" sx={{ color: "white", mb: 4 }}>
          Nền tảng miễn phí kết nối hàng nghìn chuyên gia và ứng viên, cơ hội tích lũy kiến thức và kinh nghiệm phỏng vấn. Chìa khóa cho hành trình bay cao của bạn!
        </Typography>
        
        <Box sx={{ display: "flex", alignItems: "center", mb: 6 }}>
          {[1, 2, 3].map((item) => (
            <Box
              key={item}
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                bgcolor: "grey.300",
                ml: item > 1 ? -1 : 0,
                border: "2px solid #121212",
                position: "relative",
                overflow: "hidden"
              }}
            >
              <Box 
                sx={{ 
                  width: "100%", 
                  height: "100%", 
                  bgcolor: `hsl(${item * 60}, 70%, 60%)` 
                }} 
              />
            </Box>
          ))}
          <Typography variant="body2" sx={{ ml: 2, color: "white" }}>
            Hơn 1000+ người dùng đã tin tưởng chúng tôi
          </Typography>
        </Box>
        
        <Box 
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            mt: 4,
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            gap: 2
          }}
        >
          {companyLogos.map((company) => (
            <Typography key={company.name} variant="body1" sx={{ color: "white", fontWeight: "bold" }}>
              {company.name}
              {/* <Image src={company.logo} alt={company.name} width={80} height={24} /> */}
            </Typography>
          ))}
        </Box>

      </Grid>
    </Container>
  );
}