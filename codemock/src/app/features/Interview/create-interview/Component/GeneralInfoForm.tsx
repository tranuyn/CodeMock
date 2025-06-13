"use client";

import { Autocomplete, Box, TextField } from "@mui/material";
import styles from "../create-interview.module.css";
import InputComponent from "./InputComponent";
import { Color } from "@/assets/Color";
import { Control, Controller, UseFormRegister, FieldErrors } from "react-hook-form";
import { InterviewFormData } from "@/api/interview/interview-session.type";
import { Level } from "@/store/types/level.type";
import { Major } from "@/store/types/major.type";
import { Technology } from "@/store/types/technology.type";

interface GeneralInfoFormProps {
  register: UseFormRegister<InterviewFormData>;
  control: Control<InterviewFormData>;
  errors: FieldErrors<InterviewFormData>;
  levels: Level[];
  majors: Major[];
  technologies: Technology[];
}

const GeneralInfoForm = ({
  register,
  control,
  errors,
  levels,
  majors,
  technologies,
}: GeneralInfoFormProps) => {
  return (
    <Box className={styles.formBox}>
      <h2 style={{ color: Color.purple, marginBottom: "20px" }}>
        Thông tin tổng quan
      </h2>

      <InputComponent
        title="Tiêu đề"
        name="title"
        register={register}
        error={errors.title}
      />

      <Box className={styles.formFlexRow}>
        {/* Level (Chọn 1) */}
        <Controller
          name="levelId"
          control={control}
          render={({ field, fieldState }) => {
            const selected = levels.find((lvl) => lvl.id === field.value) || null;
            return (
              <Autocomplete
                id="level-autocomplete"
                options={levels}
                getOptionLabel={(opt) => opt.name}
                value={selected}
                onChange={(_, newVal) => field.onChange(newVal?.id || "")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Trình độ ứng viên"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            );
          }}
        />

        {/* Majors (nhiều) */}
        <Controller
          name="majorIds"
          control={control}
          render={({ field, fieldState }) => {
            const selectedMajors = majors.filter((m) => field.value?.includes(m.id));
            return (
              <Autocomplete
                multiple
                id="majors-autocomplete"
                options={majors}
                getOptionLabel={(opt) => opt.name}
                value={selectedMajors}
                onChange={(_, newVals) => field.onChange(newVals.map((m) => m.id))}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ngành nghề, công việc"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            );
          }}
        />
      </Box>

      {/* Technologies (nhiều) */}
      <Controller
        name="technologyIds"
        control={control}
        render={({ field, fieldState }) => {
          const selectedTechs = technologies.filter((t) => field.value?.includes(t.id));
          return (
            <Autocomplete
              multiple
              id="tech-autocomplete"
              options={technologies}
              getOptionLabel={(opt) => opt.name}
              value={selectedTechs}
              onChange={(_, newVals) => field.onChange(newVals.map((t) => t.id))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Kỹ năng"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          );
        }}
      />
    </Box>
  );
};

export default GeneralInfoForm;
