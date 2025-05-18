import { Box } from "@mui/material";
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
  return (
    <Box className={styles.flexRow}>
      <div className={styles.companyImg}>
        <img style={{ objectFit: "cover" }} src={url_company} />
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
