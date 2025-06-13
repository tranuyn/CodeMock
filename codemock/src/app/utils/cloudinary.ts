export const uploadImages = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "morriweb");
  formData.append("cloud_name", "dzdso60ms");
  formData.append("api_key", "112278112619619"); // API key vẫn ở trong formData

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dzdso60ms/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading image:", error);
    return null;
  }
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("upload_preset", "morriweb");
  formData.append("cloud_name", "dzdso60ms");
  formData.append("api_key", "112278112619619");
  formData.append("file", file);
  formData.append("resource_type", "raw");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/<your_cloud_name>/raw/upload",
      { method: "POST", body: formData }
    );
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error(err);
    return null;
  }
};
