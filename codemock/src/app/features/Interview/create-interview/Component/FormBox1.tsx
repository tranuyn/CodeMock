"use client";

import { Autocomplete, Box, TextField } from "@mui/material";
import styles from "../create-interview.module.css";
import InputComponent from "../Component/InputComponent";
import { Color } from "@/assets/Color";
import { Level } from "@/store/redux-saga/level-sagas";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { InterviewFormData } from "../shema";
import { Major } from "@/store/redux-saga/major-sagas";
import { Technology } from "@/store/redux-saga/technology-sagas";

interface GeneralInfoFormProps {
  register: UseFormRegister<InterviewFormData>;
  control: Control<InterviewFormData>;
  levels: Level[];
  majors: Major[];
  technologies: Technology[];
}

const GeneralInfoForm = ({
  register,
  control,
  levels,
  majors,
  technologies,
}: GeneralInfoFormProps) => {
  return (
    <Box className={styles.formBox}>
      <h2 style={{ color: Color.purple, marginBottom: "20px" }}>
        Thông tin tổng quan
      </h2>
      <InputComponent title="Tiêu đề" name="title" register={register} />

      <Box className={styles.formFlexRow}>
        <Controller
          name="levels"
          control={control}
          render={({ field }) => {
            const selectedLevels: Level[] = Array.isArray(field.value)
              ? levels.filter((lvl) => field.value.includes(lvl.id))
              : [];
            return (
              <Autocomplete
                multiple
                id="tags-outlined"
                options={levels}
                getOptionLabel={(opt) => opt.name}
                value={selectedLevels}
                onChange={(_, newVals) => {
                  // newVals: Level[]
                  field.onChange(newVals.map((lvl) => lvl.id));
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Trình độ ứng viên" />
                )}
              />
            );
          }}
        />

        <Controller
          name="majors"
          control={control}
          render={({ field }) => {
            const selectedLevels: Level[] = Array.isArray(field.value)
              ? majors.filter((lvl) => field.value.includes(lvl.id))
              : [];
            return (
              <Autocomplete
                multiple
                id="tags-outlined"
                options={majors}
                getOptionLabel={(opt) => opt.name}
                value={selectedLevels}
                onChange={(_, newVals) => {
                  // newVals: Level[]
                  field.onChange(newVals.map((lvl) => lvl.id));
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Ngành nghề, công việc" />
                )}
              />
            );
          }}
        />
      </Box>

      <Controller
        name="technologies"
        control={control}
        render={({ field }) => {
          const selecteds: Level[] = Array.isArray(field.value)
            ? technologies.filter((lvl) => field.value.includes(lvl.id))
            : [];
          return (
            <Autocomplete
              multiple
              id="tags-outlined"
              options={technologies}
              getOptionLabel={(opt) => opt.name}
              value={selecteds}
              onChange={(_, newVals) => {
                // newVals: Level[]
                field.onChange(newVals.map((lvl) => lvl.id));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Kỹ năng" />
              )}
            />
          );
        }}
      />
    </Box>
  );
};

export default GeneralInfoForm;
