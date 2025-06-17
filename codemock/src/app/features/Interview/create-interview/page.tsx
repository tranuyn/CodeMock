"use client";

import { ProtectedLayout } from "@/layouts/protected_layout";
import { Box, Button } from "@mui/material";
import styles from "./create-interview.module.css";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GeneralInfoForm from "./Component/GeneralInfoForm";
import SlotTimeForm from "./Component/DetailInfoForm";
import JoditEditor from "./Component/jopit-rich-text-editor";
import { getAllLevel } from "@/store/actions/level-action";
import { getAllMajor } from "@/store/actions/major-action";
import { getAllTechnology } from "@/store/actions/technology-action";
import { yupResolver } from "@hookform/resolvers/yup";
import { INTERVIEW_SESSION_SCHEMA } from "@/app/validations/interviewSession.validations";
import { CreateInterviewSessionPayload, InterviewFormData } from "@/api/interview/interview-session.type";
import { createInterviewSession } from "@/api/interview/interview-session";
import { toastService } from "@/app/components/toast/toast.service";
import { RootState } from "@/store/redux";

function CreateInterview() {
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const methods = useForm<InterviewFormData>({
    resolver: yupResolver(INTERVIEW_SESSION_SCHEMA) as Resolver<InterviewFormData>,
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "hehe",
      requirement: "",
      date: new Date(),
      time: new Date(),
      slotDuration: 30,
      totalSlots: 1,
      sessionPrice: 0,
      majorIds: [],
      levelId: "",
      technologyIds: [],
      meetingLink: "",
      recordingURL: "",
    },
  });

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = methods;

  const descriptionRef = useRef<string>("");
  const requirementRef = useRef<string>("");

  const setDescription = useCallback((val: string) => {
    descriptionRef.current = val;
  }, []);
  const setRequirement = useCallback((val: string) => {
    requirementRef.current = val;
  }, []);

  const dispatch = useDispatch();
  const majors = useSelector((state: any) => state.majors.majors || []);
  const levels = useSelector((state: any) => state.levels.levels || []);
  const technologies = useSelector(
    (state: any) => state.technology.technologies || []
  );

  useEffect(() => {
    dispatch(getAllMajor());
    dispatch(getAllLevel());
    dispatch(getAllTechnology());
  }, [dispatch]);

  const onSubmit = async (data: InterviewFormData) => {
    try {
      // Merge ngày + giờ
      const start = new Date(data.date);
      start.setHours(data.time.getHours(), data.time.getMinutes(), 0, 0);

      const payload: CreateInterviewSessionPayload = {
        mentorId: userId,
        title: data.title,
        startTime: start.toISOString(),
        totalSlots: data.totalSlots,
        slotDuration: data.slotDuration,
        sessionPrice: data.sessionPrice,
        levelId: data.levelId,
        majorIds: data.majorIds,
        requiredTechnologyIds: data.technologyIds,
        meetingLink: data.meetingLink,
        recordingURL: data.recordingURL,
        description: descriptionRef.current,
        requirement: requirementRef.current,
      };

      await createInterviewSession(payload);
      toastService.show({
        title: "Tạo thành công",
        description: "Buổi phỏng vấn đã được tạo.",
        variant: "success",
      });
      methods.reset(); // Reset lại toàn bộ form
      descriptionRef.current = "";
      requirementRef.current = "";
    } catch (error: any) {
      toastService.show({
        title: "Thất bại",
        description: error?.response?.data?.message || "Đã có lỗi xảy ra.",
        variant: "error",
      });
    }
  };

  return (
    <ProtectedLayout allowedRoles={["MENTOR"]}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={styles.container}>
            <GeneralInfoForm
              register={register}
              control={control}
              errors={errors}
              levels={levels}
              majors={majors}
              technologies={technologies}
            />
            <SlotTimeForm
              register={register}
              control={control}
              errors={errors}
            />
          </Box>

          <Box className={styles.container}>
            <JoditEditor
              header="Mô tả buổi phỏng vấn"
              content=""
              setContent={setDescription}
              config={{ language: "vi", toolbarAdaptive: false }}
            />
            <JoditEditor
              header="Yêu cầu ứng viên"
              content=""
              setContent={setRequirement}
              config={{ language: "vi", toolbarAdaptive: false }}
            />
          </Box>

          <Box textAlign="center" marginTop={4}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ paddingX: 5, paddingY: 1.5 }}
            >
              Tạo buổi phỏng vấn
            </Button>
          </Box>
        </form>
      </FormProvider>
    </ProtectedLayout>
  );
}

export default CreateInterview;
