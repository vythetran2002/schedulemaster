export const UploadImageToCloudinary = async (formData) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Upload failed:", data);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
