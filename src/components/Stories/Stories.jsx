import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "./Stories.css";
import PropTypes from "prop-types";

export const Stories = ({ videos }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [videoDuration, setVideoDuration] = useState(11.8);
    const [isPlaying, setIsPlaying] = useState(true);

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

            <div>
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

Stories.propTypes = {
    videos: PropTypes.array.isRequired,
};
