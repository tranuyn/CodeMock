"use client";

import { NextPageWithLayout } from "@/app/layout";
import { ProtectedLayout } from "@/layouts/protected_layout";
import { Box, TextField } from "@mui/material";
import styles from "./create-interview.module.css";
import { FormProvider, useForm } from "react-hook-form";
import InputComponent from "./Component/InputComponent";
import { Color } from "@/assets/Color";
import { useCallback, useEffect, useRef, useState } from "react";
import { Major } from "@/store/redux-saga/major-sagas";
import { Level } from "@/store/redux-saga/level-sagas";
import { Technology } from "@/store/redux-saga/technology-sagas";
import { useDispatch } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { InterviewFormData } from "./shema";
import GeneralInfoForm from "./Component/FormBox1";
import SlotTimeForm from "./Component/FormBox2";
import JoditEditor from "./Component/jopit-rich-text-editor";

function CreateInterview() {
  const methods = useForm<InterviewFormData>({ mode: "onChange" });
  const {
    handleSubmit,
    control,
    trigger,
    getValues,
    formState: { errors },
    setValue,
    register,
  } = methods;
  const [majors, setMajors] = useState<Major[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const contentRef = useRef<string>("");

  // Hàm callback để cập nhật giá trị content
  const setContent = useCallback((newContent: string) => {
    contentRef.current = newContent;
  }, []);

  const dispatch = useDispatch();

  const fetchDropdownOptions = useCallback(async () => {
    try {
      dispatch({
        type: "GET_ALL_MAJOR",
        callback: (data: Major[]) => {
          setMajors(data);
        },
      });

      dispatch({
        type: "GET_ALL_LEVEL",
        callback: (data: Level[]) => {
          setLevels(data);
        },
      });

      dispatch({
        type: "GET_ALL_TECHNOLOGY",
        callback: (data: Technology[]) => {
          setTechnologies(data);
        },
      });
    } catch (error) {
      console.error("Failed to fetch dropdown options:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDropdownOptions();
  }, [fetchDropdownOptions]);

  const onSubmit = (data: InterviewFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <ProtectedLayout allowedRoles={["MENTOR"]}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={styles.container}>
            <GeneralInfoForm
              register={register}
              control={control}
              levels={levels}
              majors={majors}
              technologies={technologies}
            />
            <SlotTimeForm register={register} control={control} />
          </Box>
          <Box className={styles.container}>
            <JoditEditor
              header="Mô tả buổi phỏng vấn"
              content={contentRef.current}
              setContent={setContent}
              config={{
                language: "vi",
                toolbarAdaptive: false,
              }}
            />
            <JoditEditor
              header="Yêu cầu ứng viên"
              content={contentRef.current}
              setContent={setContent}
              config={{
                language: "vi",
                toolbarAdaptive: false,
              }}
            />
          </Box>
        </form>
      </FormProvider>
    </ProtectedLayout>
  );
}

export default CreateInterview;
