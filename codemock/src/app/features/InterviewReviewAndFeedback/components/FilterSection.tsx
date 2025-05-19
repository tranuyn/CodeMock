import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FilterSection() {
  return (
    <Box>
      {/* Time Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="time-filter-content"
          id="time-filter-header"
        >
          <Typography>Thời lượng phỏng vấn</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItemButton>
              <ListItemText primary="30 phút" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="45 phút" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="60 phút" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Programming Language Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="language-filter-content"
          id="language-filter-header"
        >
          <Typography>Ngôn ngữ lập trình</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItemButton>
              <ListItemText primary="JavaScript" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="TypeScript" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Python" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Java" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Technology Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="tech-filter-content"
          id="tech-filter-header"
        >
          <Typography>Công nghệ sử dụng</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItemButton>
              <ListItemText primary="React" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Angular" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Vue" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="NextJS" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Level Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="level-filter-content"
          id="level-filter-header"
        >
          <Typography>Cấp bậc</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItemButton>
              <ListItemText primary="Intern" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Junior" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Mid-level" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Senior" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Price Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="price-filter-content"
          id="price-filter-header"
        >
          <Typography>Giá</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItemButton>
              <ListItemText primary="Miễn phí" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Có phí" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
