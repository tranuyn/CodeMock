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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMajor } from "@/store/actions/major-action";
import { getAllLevel } from "@/store/actions/level-action";

export interface FilterParams {
  slotDuration?: number;
  isFree?: boolean;
  majorIds?: string;
  levelId?: string;
}

interface FilterSectionProps {
  onFilterChange: (filters: FilterParams) => void;
}

export default function FilterSection({ onFilterChange }: FilterSectionProps) {
  const dispatch = useDispatch();
  const majors = useSelector((state: any) => state.majors.majors || []);
  const levels = useSelector((state: any) => state.levels.levels || []);

  useEffect(() => {
    dispatch(getAllMajor());
    dispatch(getAllLevel());
  }, [dispatch]);

  const [selectedDuration, setSelectedDuration] = useState<number | undefined>();
  const [selectedPrice, setSelectedPrice] = useState<boolean | undefined>();
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>();
  const [selectedLevel, setSelectedLevel] = useState<string | undefined>();

  const updateFilters = (updates: Partial<FilterParams>) => {
    const updated = {
      slotDuration: selectedDuration,
      isFree: selectedPrice,
      majorIds: selectedMajor,
      levelId: selectedLevel,
      ...updates,
    };

    // Cập nhật UI state
    if ('slotDuration' in updates) setSelectedDuration(updates.slotDuration);
    if ('isFree' in updates) setSelectedPrice(updates.isFree);
    if ('majorIds' in updates) setSelectedMajor(updates.majorIds);
    if ('levelId' in updates) setSelectedLevel(updates.levelId);

    onFilterChange(updated);
  };

  const handleDurationClick = (duration: number) => {
    const newDuration = duration === selectedDuration ? undefined : duration;
    updateFilters({ slotDuration: newDuration });
  };

  const handlePriceClick = (isFree: boolean) => {
    const newIsFree = isFree === selectedPrice ? undefined : isFree;
    updateFilters({ isFree: newIsFree });
  };

  const handleMajorClick = (majorId: string) => {
    const newMajor = majorId === selectedMajor ? undefined : majorId;
    updateFilters({ majorIds: newMajor });
  };

  const handleLevelClick = (levelId: string) => {
    const newLevel = levelId === selectedLevel ? undefined : levelId;
    updateFilters({ levelId: newLevel });
  };

  return (
    <Box>
      {/* Time Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Thời lượng phỏng vấn</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense disablePadding>
            {[30, 45, 60, 90].map((duration) => (
              <ListItemButton
                key={duration}
                selected={selectedDuration === duration}
                onClick={() => handleDurationClick(duration)}
              >
                <ListItemText primary={`${duration} phút`} />
              </ListItemButton>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Programming Language Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Chuyên ngành</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense disablePadding>
            {majors.map((major) => (
              <ListItemButton
                key={major.id}
                selected={selectedMajor === major.id}
                onClick={() => handleMajorClick(major.id)}
              >
                <ListItemText primary={major.name} />
              </ListItemButton>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Level Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Cấp bậc</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense disablePadding>
            {levels.map((lvl) => (
              <ListItemButton
                key={lvl.id}
                selected={selectedLevel === lvl.id}
                onClick={() => handleLevelClick(lvl.id)}
              >
                <ListItemText primary={lvl.name} />
              </ListItemButton>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* Price Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Giá</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense disablePadding>
            <ListItemButton
              selected={selectedPrice === true}
              onClick={() => handlePriceClick(true)}
            >
              <ListItemText primary="Miễn phí" />
            </ListItemButton>
            <ListItemButton
              selected={selectedPrice === false}
              onClick={() => handlePriceClick(false)}
            >
              <ListItemText primary="Có phí" />
            </ListItemButton>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
