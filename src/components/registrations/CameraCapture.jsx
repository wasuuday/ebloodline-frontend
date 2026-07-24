import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import imageCompression from "browser-image-compression";
import { Camera, RotateCcw } from "lucide-react";

export default function CameraCapture({ photo, setPhoto }) {

    const webcamRef = useRef(null);

    const [devices, setDevices] = useState([]);

    const [deviceId, setDeviceId] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function loadDevices() {

            const allDevices = await navigator.mediaDevices.enumerateDevices();

            const cameras = allDevices.filter(
                (device) => device.kind === "videoinput"
            );

            setDevices(cameras);

            if (cameras.length > 1) {

                setDeviceId(cameras[cameras.length - 1].deviceId);

            } else if (cameras.length === 1) {

                setDeviceId(cameras[0].deviceId);

            }

        }

        loadDevices();

    }, []);

    async function capturePhoto() {

        setLoading(true);

        const imageSrc = webcamRef.current.getScreenshot();

        const response = await fetch(imageSrc);

        const blob = await response.blob();

        const compressed = await imageCompression(blob, {

            maxSizeMB: 0.15,

            maxWidthOrHeight: 800,

            useWebWorker: true

        });

        const preview = URL.createObjectURL(compressed);

        setPhoto({

            file: compressed,

            preview

        });

        setLoading(false);

    }

    function retake() {

        if (photo?.preview) {

            URL.revokeObjectURL(photo.preview);

        }

        setPhoto(null);

    }

    return (

        <div className="bg-white rounded-xl shadow-sm border p-6">

            <h2 className="text-xl font-semibold mb-6">

                Donor Photograph

            </h2>

            {
                !photo ? (

                    <>

                        <div className="rounded-lg overflow-hidden border">

                            <Webcam

                                ref={webcamRef}

                                audio={false}

                                screenshotFormat="image/jpeg"

                                videoConstraints={{
                                    deviceId
                                }}

                                className="w-full"

                            />

                        </div>

                        {
                            devices.length > 1 && (

                                <select

                                    className="mt-4 w-full border rounded-lg p-3"

                                    value={deviceId}

                                    onChange={(e) => setDeviceId(e.target.value)}

                                >

                                    {

                                        devices.map((camera) => (

                                            <option

                                                key={camera.deviceId}

                                                value={camera.deviceId}

                                            >

                                                {camera.label || "Camera"}

                                            </option>

                                        ))

                                    }

                                </select>

                            )
                        }

                        <button

                            type="button"

                            onClick={capturePhoto}

                            disabled={loading}

                            className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex justify-center items-center gap-2"

                        >

                            <Camera size={18} />

                            {

                                loading

                                    ? "Capturing..."

                                    : "Capture Photo"

                            }

                        </button>

                    </>

                ) : (

                    <>

                        <img

                            src={photo.preview}

                            alt="Captured"

                            className="rounded-lg w-full border"

                        />

                        <button

                            type="button"

                            onClick={retake}

                            className="mt-5 w-full bg-gray-800 hover:bg-black text-white py-3 rounded-lg flex justify-center items-center gap-2"

                        >

                            <RotateCcw size={18} />

                            Retake

                        </button>

                    </>

                )
            }

        </div>

    );

}