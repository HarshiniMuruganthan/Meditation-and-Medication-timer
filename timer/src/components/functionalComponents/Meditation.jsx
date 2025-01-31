import { useState, useEffect, useRef } from "react";
import "../../App.css";

function Meditation() {
  const [isMeditationActive, setIsMeditationActive] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(5 * 60);
  const [sessionActive, setSessionActive] = useState(false);

 
  const backgroundAudio = useRef(new Audio("bgm.mp3"));
  const alarmAudio = useRef(new Audio("alarm.wav"));

  useEffect(() => {
    let meditationInterval;

    if (isMeditationActive) {
      
      backgroundAudio.current.loop = true;
      backgroundAudio.current.volume = 0.5; 
      backgroundAudio.current.play().catch((error) => console.log("Audio play failed:", error));

      meditationInterval = setInterval(() => {
        setMeditationTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(meditationInterval);
    }

   
    if (meditationTime >= selectedDuration && isMeditationActive) {
      setIsMeditationActive(false);
      setSessionActive(false);
      playAlarm();
      backgroundAudio.current.pause(); 
    }

    return () => {
      clearInterval(meditationInterval);
      backgroundAudio.current.pause();
    };
  }, [isMeditationActive, meditationTime, selectedDuration]);

  const handleStartMeditation = () => {
    setMeditationTime(0);
    setIsMeditationActive(true);
    setSessionActive(true);

  
    backgroundAudio.current.currentTime = 0;
    backgroundAudio.current.play();
  };

  const handleStopMeditation = () => {
    setIsMeditationActive(false);
    setSessionActive(false);
    backgroundAudio.current.pause(); 
  };

  const playAlarm = () => {
    alarmAudio.current.play().catch((error) => console.log("Alarm play failed:", error));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="App meditation-page">
      <img src="medibg.jpg" alt="Background" className="background-image" />

      <div
        className="content-container"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "auto",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          className="title"
          style={{
            fontFamily: "Arial, sans-serif",
            color: "#1E2A47",
            fontSize: "32px",
            fontWeight: "600",
            marginBottom: "20px",
          }}
        >
          Guided Meditation Timer
        </h1>

        <div className="duration-selection" style={{ marginBottom: "20px" }}>
          <label
            style={{
              fontSize: "18px",
              fontWeight: "500",
              color: "#34495E",
            }}
          >
            Select Meditation Duration:
          </label>
          <select
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(Number(e.target.value))}
            disabled={sessionActive}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              outline: "none",
              cursor: sessionActive ? "not-allowed" : "pointer",
              backgroundColor: sessionActive ? "#f4f4f4" : "white",
              transition: "all 0.3s ease",
            }}
          >
            <option value={1 * 60}>1 minute</option>
            <option value={2 * 60}>2 minutes</option>
            <option value={5 * 60}>5 minutes</option>
            <option value={10 * 60}>10 minutes</option>
            <option value={15 * 60}>15 minutes</option>
            <option value={20 * 60}>20 minutes</option>
          </select>
        </div>

        <div className="timer-section" style={{ marginBottom: "20px" }}>
          <p
            className="timer"
            style={{
              fontSize: "40px",
              fontWeight: "600",
              color: "#1E2A47",
            }}
          >
            {formatTime(meditationTime)}
          </p>

          {!isMeditationActive ? (
            <button
              className="start-btn"
              onClick={handleStartMeditation}
              style={{
                padding: "12px 25px",
                fontSize: "18px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                marginTop: "20px",
              }}
            >
              Start Meditation
            </button>
          ) : (
            <button
              className="stop-btn"
              onClick={handleStopMeditation}
              style={{
                padding: "12px 25px",
                fontSize: "18px",
                backgroundColor: "#F44336",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                marginTop: "20px",
              }}
            >
              Stop Meditation
            </button>
          )}
        </div>

        {!sessionActive && meditationTime > 0 && meditationTime >= selectedDuration && (
          <p
            className="session-end"
            style={{
              fontSize: "18px",
              color: "#2ECC71",
              fontWeight: "500",
              marginTop: "30px",
            }}
          >
            Session Complete! Well done!
          </p>
        )}
      </div>
    </div>
  );
}

export default Meditation;
