import React, { useEffect, useRef, useState } from 'react';
import { Camera, Check, X, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '../utils/sound';

export function CameraCapture({ onSave }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [cameraStream, setCameraStream] = useState(null);
  const fileInputRef = useRef(null);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    setCameraStream(null);
  };

  useEffect(() => () => stopCamera(), []);

  useEffect(() => {
    if (!cameraStream || !videoRef.current) return;
    videoRef.current.srcObject = cameraStream;
    videoRef.current.play().catch(() => {});
  }, [cameraStream]);

  const openDeviceCamera = () => {
    window.setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const startCamera = async () => {
    stopCamera();
    setIsOpen(true);
    setPhoto(null);
    setError('');

    if (!navigator.mediaDevices?.getUserMedia) {
      setError(!window.isSecureContext
        ? 'Live camera needs HTTPS here. Open this app on localhost or use an HTTPS URL on your phone.'
        : 'Live camera is not supported by this browser. You can use your device camera below instead.');
      return;
    }

    try {
      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'user' }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
      } catch (preferredError) {
        // Some laptop drivers reject optional camera constraints even though the camera works.
        if (preferredError.name !== 'OverconstrainedError' && preferredError.name !== 'NotReadableError') throw preferredError;
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }
      streamRef.current = stream;
      setCameraStream(stream);
    } catch (cameraError) {
      const errorMessages = {
        NotAllowedError: 'Camera permission was blocked. Allow camera access for this site in your browser settings, then try again.',
        NotFoundError: 'No camera was found. Connect a webcam and try again.',
        NotReadableError: 'The camera is already being used by another app. Close Teams, Zoom, OBS, or other camera tabs, then try again.',
        OverconstrainedError: 'The camera does not support the requested settings. Try again with the device camera option.',
        SecurityError: 'The browser blocked camera access for this page. Check the site camera permission.',
      };
      setError(errorMessages[cameraError.name]
        || (!window.isSecureContext
          ? 'Live camera needs HTTPS here. Open this app on localhost or use an HTTPS URL on your phone.'
          : `Unable to access the camera (${cameraError.name || 'unknown error'}). Close other camera apps and try again.`));
    }
  };

  const handlePhotoFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      setError('');
      sound.playChime();
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const capturePhoto = () => {
    if (!videoRef.current || videoRef.current.readyState < 2) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setPhoto(canvas.toDataURL('image/jpeg', 0.82));
    sound.playChime();
  };

  const closeCamera = () => {
    stopCamera();
    setIsOpen(false);
    setPhoto(null);
    setError('');
  };

  const savePhoto = () => {
    if (!photo) return;
    onSave({ label: 'Camera', image: photo });
    closeCamera();
  };

  return (
    <>
      <button
        type="button"
        onClick={startCamera}
        className="px-4 py-2 rounded-full bg-emerald-900/80 text-gold-300 border border-gold-400/40 shadow-md hover:bg-emerald-800 font-black text-xs transition-all flex items-center gap-1.5"
      >
        <Camera className="w-3.5 h-3.5" /> TAKE A PHOTO
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-emerald-950/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="w-full max-w-xl glass-panel-gold rounded-3xl p-5 border border-gold-400/50 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-gold-400 uppercase">Memory Camera</span>
                  <h2 className="text-xl font-serif font-black text-cream-50">Capture a Maveli moment</h2>
                </div>
                <button type="button" onClick={closeCamera} className="p-2 rounded-full text-cream-200 hover:text-gold-300" aria-label="Close camera">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-gold-500/30 flex items-center justify-center">
                {photo ? (
                  <img src={photo} alt="Captured memory preview" className="w-full h-full object-contain" />
                ) : (
                  <video ref={videoRef} muted playsInline className="w-full h-full object-cover" />
                )}
              </div>

              {error && <p className="mt-3 text-xs text-rose-300 bg-rose-950/50 border border-rose-500/30 rounded-xl p-3">{error}</p>}

              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {!photo && !error && (
                  <button type="button" onClick={capturePhoto} className="px-5 py-2.5 rounded-full bg-gold-500 text-emerald-950 font-black text-xs flex items-center gap-2">
                    <Camera className="w-4 h-4" /> CAPTURE PHOTO
                  </button>
                )}
                {!photo && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handlePhotoFile}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={openDeviceCamera}
                      className="px-4 py-2.5 rounded-full bg-emerald-900/80 text-gold-300 border border-gold-400/40 font-black text-xs flex items-center gap-2"
                    >
                      <Camera className="w-4 h-4" /> USE DEVICE CAMERA
                    </button>
                  </>
                )}
                {photo && (
                  <>
                    <button type="button" onClick={() => setPhoto(null)} className="px-4 py-2.5 rounded-full bg-emerald-900/80 text-cream-200 border border-gold-500/30 font-bold text-xs flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" /> RETAKE
                    </button>
                    <button type="button" onClick={savePhoto} className="px-5 py-2.5 rounded-full bg-gold-500 text-emerald-950 font-black text-xs flex items-center gap-2">
                      <Check className="w-4 h-4" /> SAVE TO MEMORIES
                    </button>
                  </>
                )}
                {error && <button type="button" onClick={startCamera} className="px-4 py-2.5 rounded-full bg-gold-500 text-emerald-950 font-black text-xs">TRY LIVE CAMERA AGAIN</button>}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
