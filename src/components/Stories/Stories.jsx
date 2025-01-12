import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Video1 from "../../assets/videos/stories/1.mp4";
import Video2 from "../../assets/videos/stories/2.mp4";
import Video3 from "../../assets/videos/stories/3.mp4";
import Video4 from "../../assets/videos/stories/4.mp4";
import Video5 from "../../assets/videos/stories/5.mp4";
import Video6 from "../../assets/videos/stories/6.mp4";

import "./Stories.css";

export const Stories = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoDuration, setVideoDuration] = useState(11.8);
    const [isPlaying, setIsPlaying] = useState(true);

    const videos = [Video1, Video2, Video3, Video4, Video5, Video6];
    const videoRef = useRef(null);

    const nextVideo = () => {
        setIsPlaying(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    const prevVideo = () => {
        setIsPlaying(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
    };

    const handleVideoClick = (event) => {
        const videoWidth = event.target.offsetWidth;
        const clickX = event.nativeEvent.offsetX;

        if (clickX > videoWidth / 2) {
            nextVideo();
        } else {
            prevVideo();
        }
    };

    useEffect(() => {
        const videoElement = videoRef.current;

        const handleLoadedMetadata = () => {
            setVideoDuration(videoElement.duration || 5);
            setIsPlaying(true);
        };

        if (videoElement) {
            videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
            }
        };
    }, [currentIndex]);

    return (
        <div className="story-container">
            <div className="story-progress">
                {videos.map((_, index) => (
                    <div key={index} className="story-progress__bar">
                        <motion.div
                            className="story-progress__fill"
                            initial={{ width: "0%" }}
                            animate={{
                                width: currentIndex === index && isPlaying ? "100%" : "0%",
                            }}
                            transition={{
                                duration: currentIndex === index ? videoDuration : 0,
                                ease: "linear",
                            }}
                            onAnimationComplete={() => {
                                if (currentIndex === index) {
                                    nextVideo();
                                }
                            }}
                        ></motion.div>
                    </div>
                ))}
            </div>

            <div className="">
                <video
                    ref={videoRef}
                    className="story-video__content"
                    key={videos[currentIndex]}
                    autoPlay
                    muted
                    playsInline
                    onEnded={nextVideo}
                    onClick={handleVideoClick}
                >
                    <source
                        src={videos[currentIndex]}
                        type="video/mp4"
                    />
                </video>
            </div>
        </div>
    );
};
