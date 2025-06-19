// src/components/HeroSection.jsx
"use client";

import {
  Box,
  Typography,
  Container,
  Grid,
  AvatarGroup,
  Avatar,
} from "@mui/material";

export default function HeroSection() {
  const companyLogos = [
    { name: "Spotify", logo: "/logos/spotify.svg" },
    { name: "Slack", logo: "/logos/slack.svg" },
    { name: "Adobe", logo: "/logos/adobe.svg" },
    { name: "Asana", logo: "/logos/asana.svg" },
    { name: "Linear", logo: "/logos/linear.svg" },
  ];

  return (
    <Container
      maxWidth={false}
      sx={{ pt: { xs: 6, md: 10 }, pb: 6, flex: { md: 1.5, lg: 1 } }}
    >
      <Grid container size={{ xs: 12, md: 6 }}>
        <Typography
          variant="h3"
          sx={{
            color: "white",
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
          }}
        >
          Phỏng vấn mọi lúc, mọi nơi, mọi ngành nghề
        </Typography>

        <Typography variant="body1" sx={{ color: "white", mb: 4 }}>
          Nền tảng miễn phí kết nối hàng nghìn chuyên gia và ứng viên, cơ hội
          tích lũy kiến thức và kinh nghiệm phỏng vấn. Chìa khóa cho hành trình
          bay cao của bạn!
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 6 }}>
          <AvatarGroup max={4}>
            <Avatar
              alt="Remy Sharp"
              src="https://cdn-media.sforum.vn/storage/app/media/anh-nguoi-mau-16.jpg"
            />
            <Avatar
              alt="Travis Howard"
              src="https://nhahangsoho.vn/wp-content/uploads/2025/01/lam-nguoi-mau-anh-nam-cho-shop-3.webp"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://nguoinoitieng.tv/images/nnt/100/0/besg.jpg"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://cdn.pixabay.com/photo/2022/10/17/15/02/photography-7527978_1280.jpg"
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://vapa.vn/wp-content/uploads/2022/12/anh-mau-dep-001.jpg"
            />
          </AvatarGroup>
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
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 2,
          }}
        >
          {companyLogos.map((company) => (
            <Typography
              key={company.name}
              variant="body1"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              {company.name}
              {/* <Image src={company.logo} alt={company.name} width={80} height={24} /> */}
            </Typography>
          ))}
        </Box>
      </Grid>
    </Container>
  );
}
