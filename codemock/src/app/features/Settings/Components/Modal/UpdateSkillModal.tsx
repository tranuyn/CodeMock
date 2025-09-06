"use client";

import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import styles from "../../setting.module.css";
import InputComponent from "@/app/features/Interview/create-interview/Component/InputComponent";
import { Color } from "@/assets/Color";
import { Level } from "@/store/redux-saga/level-sagas";
import {
  Control,
  Controller,
  useFieldArray,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { Major } from "@/store/redux-saga/major-sagas";
import { Technology } from "@/store/redux-saga/technology-sagas";
import { AuthState, Detail, SkillItem } from "@/store/types";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadImages } from "@/app/utils/cloudinary";
import { RootState } from "@/store/redux";
import { UserActions } from "@/store/actions";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface SkillFormProp {
  user: AuthState;
  onClose: () => void;
}
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const UpdateSkillModal = ({ user, onClose }: SkillFormProp) => {
  const toArray = <T,>(v?: T | T[]): T[] => {
    if (!v) return [];
    return Array.isArray(v) ? v : [v];
  };

  const initialLevels = toArray(user.level);
  const methods = useForm<{
    majors?: Major[];
    levels?: Level[];
    technologies?: Technology[];
    skill: SkillItem[];
  }>({
    defaultValues: {
      majors: user.majors?.length ? user.majors : [],
      levels: initialLevels.length ? initialLevels : [],
      technologies: user.technologies?.length ? user.technologies : [],
      skill: user.skills?.length ? user.skills : [{}],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    formState: { errors },
    setValue,
    register,
  } = methods;

  const [majors, setMajors] = useState<Major[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

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
          console.log(data);
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skill",
  });

  const [previews, setPreviews] = useState<string[]>(
    fields.map((field) => field.url_company || "")
  );
  const [fileTempArray, setFileTempArray] = useState<(File | undefined)[]>(
    Array(fields.length).fill(undefined)
  );
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newFileTempArray = [...fileTempArray];
    newFileTempArray[index] = file;
    setFileTempArray(newFileTempArray);

    const url = URL.createObjectURL(file);
    const newPreviews = [...previews];
    newPreviews[index] = url;
    setPreviews(newPreviews);
  };

  const addNewSkill = () => {
    append({
      detail: "",
      work_space: "",
      yearStart: 0,
      url_company: "",
    });
    setPreviews([...previews, ""]);
    setFileTempArray([...fileTempArray, undefined]);
  };

  const removeEducation = (index: number) => {
    remove(index);
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const newFileTempArray = [...fileTempArray];
    newFileTempArray.splice(index, 1);
    setFileTempArray(newFileTempArray);
  };
  const nothingChanged =
    // skill
    JSON.stringify(watch("skill")) ===
      JSON.stringify(
        user.skills || [
          {
            position: "",
            work_space: "",
            yearStart: 0,
            yearEnd: 0,
            url_company: "",
          },
        ]
      ) &&
    // files
    !fileTempArray.some((file) => file !== undefined) &&
    // majors
    JSON.stringify(watch("majors")) === JSON.stringify(user.majors || []) &&
    // levels
    JSON.stringify(watch("levels")) === JSON.stringify(user.level || []) &&
    // technologies
    JSON.stringify(watch("technologies")) ===
      JSON.stringify(user.technologies || []);

  const Reset = () => {
    setValue("skill", user.skills || []);
    setValue("majors", user.majors || []);
    setValue("levels", user.level || []);
    setValue("technologies", user.technologies || []);

    setPreviews(
      (user.educationBackground || [{ url_company: "" }]).map(
        (entry) => entry.url_company || ""
      )
    );
    setFileTempArray(
      Array(user.educationBackground?.length || 1).fill(undefined)
    );
  };
  const SaveeducationBackground = async () => {
    setLoading(true);
    let updatedSkill = [...getValues("skill")];
    if (getValues("skill").length > 0) {
      updatedSkill = [...getValues("skill")].map((entry) => ({
        ...entry,
        yearStart: Number(entry.yearStart), // Đảm bảo là kiểu số
      }));

      for (let i = 0; i < fileTempArray.length; i++) {
        const file = fileTempArray[i];
        if (file instanceof File) {
          const imageUrl = await uploadImages(file);
          updatedSkill[i].url_company = imageUrl;
        }
      }
    }

    const filteredSkills = updatedSkill.filter(
      ({ detail, work_space, yearStart, url_company }) =>
        (detail?.trim() ?? "") !== "" ||
        (work_space?.trim() ?? "") !== "" ||
        (typeof yearStart === "number" && !isNaN(yearStart)) ||
        (url_company?.trim() ?? "") !== ""
    );

    dispatch(
      UserActions.updateUserAction.request({
        majorIds: getValues("majors")?.map((m) => m.id) || [],
        levelIds: getValues("levels")?.map((l) => l.id) || [],
        technologyIds: getValues("technologies")?.map((t) => t.id) || [],
        skills: filteredSkills,
      })
    );

    onClose();
    setLoading(false);
  };

  return (
    <>
      <Box
        sx={{
          width: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <Controller
          name="levels"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="levels-autocomplete"
              options={levels}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              // value là 1 object hoặc null
              value={
                field.value && field.value.length > 0 ? field.value[0] : null
              }
              onChange={(_, newValue) => {
                // newValue: Level | null
                field.onChange(newValue ? [newValue] : []);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Trình độ ứng viên" />
              )}
            />
          )}
        />

        <Controller
          name="majors"
          control={control}
          render={({ field }) => {
            const selectedLevels: Level[] = Array.isArray(field.value)
              ? majors.filter((lvl) => field.value?.includes(lvl))
              : [];
            return (
              <Autocomplete
                multiple
                id="majors-autocomplete"
                options={majors}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={Array.isArray(field.value) ? field.value : []}
                onChange={(_, newValues) => {
                  field.onChange(newValues); // Save full objects, not just IDs
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Ngành nghề, công việc" />
                )}
              />
            );
          }}
        />

        <Controller
          name="technologies"
          control={control}
          render={({ field }) => {
            const selecteds: Level[] = Array.isArray(field.value)
              ? technologies.filter((lvl) => field.value?.includes(lvl))
              : [];
            return (
              <Autocomplete
                multiple
                id="technologies-autocomplete"
                options={technologies}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={Array.isArray(field.value) ? field.value : []}
                onChange={(_, newValues) => {
                  field.onChange(newValues); // Save full objects, not just IDs
                }}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Kỹ năng" />
                )}
              />
            );
          }}
        />
      </Box>

      {fields.map((field, index) => (
        <>
          {index > 0 && (
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#0074C2",
                margin: "20px 0",
              }}
            />
          )}
          <Box
            className={styles.flexRow}
            key={field.id}
            style={{ marginBottom: "20px" }}
          >
            <div
              style={{
                width: "600px",
                marginRight: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <InputComponent
                title="Kỹ năng"
                name={`skill.${index}.detail`}
                register={register}
                inputStyle={styles.customInput}
              />

              <div className={styles.flexRow} style={{ gap: "20px" }}>
                <InputComponent
                  title="Nơi đạt được"
                  name={`skill.${index}.work_space`}
                  register={register}
                  inputStyle={styles.customInput}
                />
                <InputComponent
                  title="Năm đạt được"
                  allowNumbers={true}
                  name={`skill.${index}.yearStart`}
                  register={register}
                  inputStyle={styles.customInput}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className={styles.imgCtn} style={{ width: "80px" }}>
                <Avatar
                  alt={`Skill ${index + 1}`}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={previews[index] || "/static/images/avatar/2.jpg"}
                />
              </div>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                Upload ảnh
                <VisuallyHiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, index)}
                />
              </Button>
              <div className={styles.flexRow} style={{ marginTop: "5px" }}>
                <IconButton aria-label="add" onClick={addNewSkill}>
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => fields.length > 1 && removeEducation(index)}
                  disabled={fields.length <= 1}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </Box>
        </>
      ))}

      <Box
        className={styles.flexRow}
        sx={{
          justifyContent: "flex-end",
          borderTop: "1px solid #ccc",
          margin: "20px -20px 0px -20px",
          padding: "20px 20px 0px 20px",
        }}
      >
        <button
          className={styles.buttonReject}
          disabled={loading}
          onClick={() => Reset()}
          style={{
            color: nothingChanged ? "#cccccc" : "black",
            cursor: nothingChanged ? "not-allowed" : "pointer",
          }}
        >
          Hủy
        </button>
        <button
          className={styles.buttonAcp}
          style={{
            background: nothingChanged ? "#cccccc" : Color.gradient,
            cursor: nothingChanged ? "not-allowed" : "pointer",
          }}
          disabled={loading || nothingChanged}
          onClick={() => SaveeducationBackground()}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </Box>
    </>
  );
};

export default UpdateSkillModal;
