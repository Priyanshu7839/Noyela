
import axios from "axios";

// const BASE_URL = 'http://localhost:8002/api';
const BASE_URL = 'https://noyela-backend.onrender.com/api';

type CapturedImage = {
  angle: number;
  dataUrl: string;
  fileName: string;
};

export const analyzeFaceAPI = async (captured: CapturedImage[]) => {
  if (captured.length !== 3) {
    throw new Error("Exactly three facial images are required.");
  }

  const formData = new FormData();

  for (const image of captured) {
    const response = await fetch(image.dataUrl);
    const blob = await response.blob();

    const file = new File(
      [blob],
      image.fileName || `face-${image.angle}.jpg`,
      { type: blob.type || "image/jpeg" }
    );

    formData.append("images", file);
  }

  const response = await axios.post(
    `${BASE_URL}/analyze`,
    formData
  );

  return response.data;
};
