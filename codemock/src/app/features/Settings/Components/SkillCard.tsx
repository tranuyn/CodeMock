import { Box } from "@mui/material";
import styles from "../setting.module.css";

interface Prop {
  title?: string;
  work_space?: string;
  url_company?: string; //option
  yearStart?: number;
  yearEnd?: number;
  imageUrl?: string;
}

const SkillCard = ({
  title,
  work_space,
  url_company,
  yearStart,
  yearEnd,
  imageUrl,
}: Prop) => {
  return (
    <Box sx={{ marginTop: "10px" }}>
      <p style={{ marginBottom: "10px" }}>{title}</p>
      <div className={styles.flexRow} style={{ alignItems: "center" }}>
        <div className={styles.companyImgSmall}>
          <img style={{ objectFit: "cover" }} src={imageUrl} />
        </div>
        <p style={{ marginBottom: "5px", fontSize: "90%", color: "#6D6C6C" }}>
          {work_space}
        </p>
      </div>
    </Box>
  );
};

export default SkillCard;
