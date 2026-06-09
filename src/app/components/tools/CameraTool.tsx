import { useState, useRef, useCallback } from "react";
import { Video, StopCircle, Download, Camera } from "lucide-react";

export function CameraTool() {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordedUrl, setRecordedUrl] = useState("");
  const [snapshotUrl, setSnapshotUrl] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
    } catch (e) {
      alert("Camera access denied. Please allow camera permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
      setRecording(false);
    }
  }, [stream]);

  const startRecording = useCallback(() => {
    if (!stream) return;
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      setRecordedUrl(URL.createObjectURL(blob));
    };
    recorderRef.current = recorder;
    recorder.start();
    setRecording(true);
  }, [stream]);

  const stopRecording = () => {
    recorderRef.current?.stop();
    setRecording(false);
  };

  const takeSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    setSnapshotUrl(canvas.toDataURL('image/png'));
  };

  return (
    <div className="space-y-3">
      {!stream ? (
        <div className="text-center p-8 bg-accent/20 rounded-xl">
          <Video className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
          <button onClick={startCamera} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 mx-auto">
            <Camera className="w-4 h-4"/> Start Camera
          </button>
        </div>
      ) : (
        <>
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay muted playsInline className="w-full max-h-80 object-cover" />
            {recording && <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-500 animate-pulse" />}
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex justify-center gap-2 flex-wrap">
            {!recording ? (
              <button onClick={startRecording} className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2"><Video className="w-4 h-4"/> Record</button>
            ) : (
              <button onClick={stopRecording} className="px-4 py-2 bg-amber-600 text-white rounded-lg flex items-center gap-2"><StopCircle className="w-4 h-4"/> Stop</button>
            )}
            <button onClick={takeSnapshot} className="px-4 py-2 border rounded-lg flex items-center gap-2"><Camera className="w-4 h-4"/> Snapshot</button>
            <button onClick={stopCamera} className="px-4 py-2 border rounded-lg flex items-center gap-2">Close Camera</button>
          </div>
        </>
      )}
      {snapshotUrl && (
        <div className="p-3 bg-accent/20 rounded-lg">
          <p className="text-sm mb-2">Snapshot</p>
          <img src={snapshotUrl} alt="snapshot" className="max-w-full rounded" />
          <a href={snapshotUrl} download="snapshot.png" className="text-xs text-primary mt-1 inline-block"><Download className="w-3 h-3 inline"/> Download</a>
        </div>
      )}
      {recordedUrl && (
        <div className="p-3 bg-accent/20 rounded-lg">
          <p className="text-sm mb-2">Recording</p>
          <video src={recordedUrl} controls className="max-w-full rounded" />
          <a href={recordedUrl} download="recording.webm" className="text-xs text-primary mt-1 inline-block"><Download className="w-3 h-3 inline"/> Download</a>
        </div>
      )}
    </div>
  );
}
