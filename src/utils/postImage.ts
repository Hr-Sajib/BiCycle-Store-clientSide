// utils/postImage.ts
export const postImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("key", "1c611875f6706fbb73909bc6c876e775"); // Your ImgBB API key
    formData.append("image", file); // Binary file for upload
    // Optional: Add expiration (e.g., 600 seconds = 10 minutes)
    formData.append("expiration", "600");
  
    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (result.success && result.status === 200 && result.data?.url) {
        return result.data.url; // Return the direct image URL
      } else {
        throw new Error(result.error?.message || "Failed to upload image to ImgBB");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };