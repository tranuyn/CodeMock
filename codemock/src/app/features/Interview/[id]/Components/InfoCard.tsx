import React from "react";
import {
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";

type InfoSectionProps = {
  title: string;
  icon?: string;
  items: {
    text: string;
    imageUrl?: string;
  }[];
  lightTheme?: boolean;
};

const InfoCard: React.FC<InfoSectionProps> = ({
  title,
  icon = "📘",
  items,
  lightTheme = true,
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderLeft: 4,
        borderColor: lightTheme ? "primary.light" : "primary_darker.dark",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          backgroundColor: lightTheme ? "primary.light" : "primary_darker.dark",
          color: lightTheme ? "primary.dark" : "white",
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          fontWeight: "bold",
          fontSize: 14,
        }}
      >
        <Box component="span" sx={{ mr: 1 }}>
          {icon}
        </Box>
        {title}
      </Box>
      <List dense sx={{ pl: 1.5 }}>
        {items.map((item, idx) => (
          <ListItem key={idx}>
            {item.imageUrl && (
              <ListItemAvatar>
                <Avatar src={item.imageUrl} variant="rounded" />
              </ListItemAvatar>
            )}
            {title === "Chuyên môn & kỹ năng" && item.text.includes(":") ? (
              <ListItemText
                primary={<strong>{item.text.split(":")[0]}</strong>}
                secondary={item.text.split(":").slice(1).join(":")}
              />
            ) : (
              <ListItemText primary={item.text} />
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default InfoCard;
