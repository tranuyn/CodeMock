import { Box, Avatar } from "@mui/material";
import styles from "../setting.module.css";

interface Prop {
  position?: string;
  work_space?: string;
  url_company?: string; //option
  yearStart?: number;
  yearEnd?: number;
  imageUrl?: string;
}

const ExperienceCard = ({
  position,
  work_space,
  url_company,
  yearStart,
  yearEnd,
  imageUrl,
}: Prop) => {
  const hasImage = !!(url_company && url_company.trim());
  return (
    <Box className={styles.flexRow}>
      <div className={styles.companyImg}>
        {hasImage ? (
          // pass undefined if no src to avoid src=""
          <img
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            src={url_company || undefined}
            alt={work_space ?? "company image"}
          />
        ) : (
          // fallback (MUI Avatar)
          <Avatar sx={{ width: "100%", height: "100%" }}>
            {work_space ? work_space.charAt(0).toUpperCase() : "?"}
          </Avatar>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 600, fontSize: "110%", marginBottom: "5px" }}>
          {position}
        </p>
        <p style={{ fontWeight: 400, marginBottom: "5px" }}>{work_space}</p>
        <p style={{ fontWeight: 300, fontSize: "90%" }}>
          {yearStart}
          {yearEnd !== undefined && yearEnd > 0 && <span> - {yearEnd}</span>}
        </p>
      </div>
    </Box>
  );
};

export default ExperienceCard;
