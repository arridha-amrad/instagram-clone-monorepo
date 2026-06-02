type Params = {
  file: File;
  apiKey: string;
  cloudName: string;
  signature: string;
  timestamp: number;
  folder: string;
  transformation?: string;
};

export const uploadToCloudinary = async ({
  file,
  apiKey,
  cloudName,
  signature,
  timestamp,
  folder,
}: Params) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", apiKey);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());
    formData.append("folder", folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${file.type.startsWith("image") ? "image" : "video"}/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data as {
      secure_url: string;
      public_id: string;
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
