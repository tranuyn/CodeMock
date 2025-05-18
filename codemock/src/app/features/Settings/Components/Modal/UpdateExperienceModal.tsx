"use client";
import { RootState } from "@/store/redux";
import { Avatar, Box, Button, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../setting.module.css";
import { Color } from "@/assets/Color";
import { AuthState, experience_detail } from "@/store/types";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { uploadImages } from "@/app/utils/cloudinary";
import { useForm, useFieldArray } from "react-hook-form";
import { ChangeEvent, useState } from "react";
import { UserActions } from "@/store/actions";
import InputComponent from "@/app/features/Interview/create-interview/Component/InputComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

const educationEntrySchema = z.object({
  position: z
    .string()
    .min(1, { message: "Vui lòng nhập nghề nghiệp, chức vụ" }),
  work_space: z.string().min(1, { message: "Vui lòng nhập nơi làm việc" }),
  yearStart: z
    .number()
    .min(1900, { message: "Năm bắt đầu không hợp lệ" })
    .max(new Date().getFullYear(), {
      message: "Năm bắt đầu không thể lớn hơn năm hiện tại",
    }),
  url_company: z
    .string()
    .min(1, { message: "Vui lòng chọn ảnh mô tả nơi làm việc" }),
});

// Schema for the entire form
const formSchema = z.object({
  experiences: z.array(educationEntrySchema),
});

const UpdateExperienceModal = ({ user, onClose }: SkillFormProp) => {
  const methods = useForm<{
    experiences: experience_detail[];
  }>({
    defaultValues: {
      experiences: user.experiences?.length
        ? user.experiences
        : [{ position: "", work_space: "", yearStart: 0, url_company: "" }],
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(formSchema),
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const [previews, setPreviews] = useState<string[]>(
    fields.map((field) => field.url_company || "")
  );
  const [fileTempArray, setFileTempArray] = useState<(File | undefined)[]>(
    Array(fields.length).fill(undefined)
  );

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  const addNewEducation = () => {
    append({
      position: "",
      work_space: "",
      yearStart: 0,
      yearEnd: 0,
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
    JSON.stringify(watch("experiences")) ===
      JSON.stringify(
        user.experiences || [
          {
            position: "",
            work_space: "",
            yearStart: 0,
            yearEnd: 0,
            url_company: "",
          },
        ]
      ) && !fileTempArray.some((file) => file !== undefined);

  const Reset = () => {
    setValue(
      "experiences",
      user.experiences || [
        {
          position: "",
          work_space: "",
          yearStart: 0,
          yearEnd: 0,
          url_company: "",
        },
      ]
    );
    setPreviews(
      (user.experiences || [{ url_company: "" }]).map(
        (entry) => entry.url_company || ""
      )
    );
    setFileTempArray(Array(user.experiences?.length || 1).fill(undefined));
  };

  const Saveexperiences = async () => {
    setLoading(true);
    const updatedEducation = [...getValues("experiences")].map((entry) => ({
      ...entry,
      yearStart: Number(entry.yearStart), // Đảm bảo là kiểu số
      yearEnd: Number(entry.yearEnd), // Đảm bảo là kiểu số
    }));

    for (let i = 0; i < fileTempArray.length; i++) {
      const file = fileTempArray[i];
      if (file instanceof File) {
        const imageUrl = await uploadImages(file);
        updatedEducation[i].url_company = imageUrl;
      }
    }

    dispatch(
      UserActions.updateUserAction.request({
        experiences: updatedEducation,
      })
    );

    onClose();
    setLoading(false);
  };

  return (
    <>
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
                title="Nghề nghiệp, chức vụ"
                name={`experiences.${index}.position`}
                register={register}
                inputStyle={styles.customInput}
              />
              <InputComponent
                title="Nơi làm việc"
                name={`experiences.${index}.work_space`}
                register={register}
                inputStyle={styles.customInput}
              />
              <div className={styles.flexRow} style={{ gap: "20px" }}>
                <InputComponent
                  title="Năm bắt đầu"
                  allowNumbers={true}
                  name={`experiences.${index}.yearStart`}
                  register={register}
                  inputStyle={styles.customInput}
                />
                <InputComponent
                  title="Năm kết thúc"
                  allowNumbers={true}
                  name={`experiences.${index}.yearEnd`}
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
              <div className={styles.imgCtn} style={{ width: "120px" }}>
                <Avatar
                  alt={`Education ${index + 1}`}
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
              <div className={styles.flexRow} style={{ marginTop: "20px" }}>
                <IconButton aria-label="add" onClick={addNewEducation}>
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
          onClick={() => Saveexperiences()}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </button>
      </Box>
    </>
  );
};

export default UpdateExperienceModal;
