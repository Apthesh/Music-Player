import { useRef, useState } from "react";
import Audio1 from "./audio1.mp3";
import Audio2 from "./audio2.mp3";
import leo from './leo.mp3';
import dabzee from "./dabzee.mp3";
import devara from './devara.mp3';
import "./App.css";
import illuminati from './Aavesham.jpg';
import thallumala from './thall2.jpg';
import hari from "./hari.jpg";
import leoimg from './leo.webp';
import dabz from './Dabzee.webp';
import devaraimg from './devaraorg.avif';
import paviya from './paviya.mp3';
import { FaRegPauseCircle, FaPlayCircle, FaBackward, FaForward, FaSyncAlt, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Main = () => {
    let [play, setPlay] = useState(false);
    let [currentTime, setCurrentTime] = useState(0);
    let [isLooping, setIsLooping] = useState(false); // Loop state
    let [isMuted, setIsMuted] = useState(false); // Mute state
    let audioRef = useRef(null);

    let songs = [
        {
            Title: "THALLUMALA",
            src: Audio1,
            img: thallumala
        }, {
            Title: "ILLUMINATI",
            src: Audio2,
            img: illuminati
        },
        {
            Title: "LEO",
            src: leo,
            img: leoimg
        },
        {
            Title: "VATTEPAM",
            src: dabzee,
            img: dabz
        },
        {
            Title: "DEVARA",
            src: devara,
            img: devaraimg
        },
        {
            Title: "PAVIYA MAZHAYE",
            src: paviya,
            img: hari
        },
    ];

    let [currentSongIndex, setCurrentSongIndex] = useState(0);
    let currentSong = songs[currentSongIndex];

    let PlayOrPause = () => {
        if (play) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setPlay(!play);
    };

    let timeUpdateHandler = (e) => {
        setCurrentTime(e.target.currentTime);
    };

    let dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setCurrentTime(e.target.value);
    };

    let skipForwardPlayHandler = (direction) => {
        if (direction === "skip-forward") {
            setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
        } else if (direction === "skip-back") {
            setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
        }
    };

    // Loop Toggle Handler
    let toggleLoop = () => {
        setIsLooping(!isLooping);
        audioRef.current.loop = !isLooping; // Toggle loop attribute on the audio element
    };

    // Mute Toggle Handler
    let toggleMute = () => {
        setIsMuted(!isMuted);
        audioRef.current.muted = !isMuted; // Toggle mute attribute on the audio element
    };

    return (
        <>
        <div className='cardPlay'>
            <audio
                src={currentSong.src}
                ref={audioRef}
                onTimeUpdate={timeUpdateHandler}
                onEnded={() => skipForwardPlayHandler("skip-forward")}
                loop={isLooping} // Loop property
            ></audio>

            <img src={currentSong.img} className='image' alt="img" />
            <h1 className='heading'>{currentSong.Title}</h1>

            <div>
                <input
                    className='range'
                    type="range"
                    value={currentTime}
                    max={audioRef.current ? audioRef.current.duration : 0}
                    onChange={dragHandler}
                />
            </div>

            <div className='divCard'>
                <button onClick={() => skipForwardPlayHandler("skip-back")}><FaBackward /></button>
                <button onKeyUp={PlayOrPause}>{play ? <FaRegPauseCircle /> : <FaPlayCircle />}</button>
                <button onClick={() => skipForwardPlayHandler("skip-forward")}><FaForward /></button>
            </div>

            <div className='divCard'>
                {/* Loop Button */}
                <button onClick={toggleLoop} style={{ color: isLooping ? "green" : "black" }}>
                    <FaSyncAlt /> {isLooping ? "Looping" : "Loop"}
                </button>
                
                {/* Mute Button */}
                <button onClick={toggleMute} style={{ color: isMuted ? "red" : "black" }}>
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />} {isMuted ? "Muted" : "Mute"}
                </button>
            </div>
        </div>
        </>
    );
}

export default Main;
