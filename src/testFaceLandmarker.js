import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

 async function testFaceLandmarker() {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "/mediapipe/wasm"
    );

    const landmarker = await FaceLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath: "/models/face_landmarker.task",
        },
        runningMode: "IMAGE",
        numFaces: 1,
      }
    );

    console.log("✅ MediaPipe initialized successfully!");

    landmarker.close();

    return true;
  } catch (error) {
    console.error("❌ MediaPipe initialization failed:", error);
    return false;
  }
}

export default testFaceLandmarker