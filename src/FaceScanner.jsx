
import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceScanner() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const [status, setStatus] = useState("Initializing scanner...");

  useEffect(() => {
    let stopped = false;
    let stream;
    let landmarker;
    let animationId;

    async function startScanner() {
      try {
        setStatus("Requesting camera access...");

        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (stopped) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        setStatus("Loading face detection model...");

        const vision = await FilesetResolver.forVisionTasks(
          "/mediapipe/wasm"
        );

        landmarker = await FaceLandmarker.createFromOptions(
          vision,
          {
            baseOptions: {
              modelAssetPath: "/models/face_landmarker.task",
            },
            runningMode: "VIDEO",
            numFaces: 2,
          }
        );

        if (stopped) {
          landmarker.close();
          return;
        }

        landmarkerRef.current = landmarker;

        function detectFrame() {
          if (stopped) return;

          const video = videoRef.current;

          if (video && video.readyState >= 2) {
            const result = landmarker.detectForVideo(
              video,
              performance.now()
            );

            const count = result.faceLandmarks?.length ?? 0;

            setStatus(
              count === 1
                ? "Face detected — hold still"
                : count === 0
                  ? "Position your face inside the guide"
                  : "Please ensure only one face is visible"
            );
          }

          animationId = requestAnimationFrame(detectFrame);
        }

        detectFrame();
      } catch (error) {
        console.error("Face scanner error:", error);
        setStatus(error.message || "Unable to start scanner");
      }
    }

    startScanner();

    return () => {
      stopped = true;
      cancelAnimationFrame(animationId);
      landmarkerRef.current?.close();
      landmarkerRef.current = null;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div style={{ maxWidth: 480, margin: "auto", padding: 16 }}>
      <h2>NOYELA Face Scanner</h2>

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 24,
          background: "#111",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: "100%",
            display: "block",
            transform: "scaleX(-1)",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "12% 13%",
            border: "2px solid white",
            borderRadius: "48%",
            pointerEvents: "none",
          }}
        />
      </div>

      <p role="status">{status}</p>
    </div>
  );
}
