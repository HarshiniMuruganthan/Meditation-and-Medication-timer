import { useState, useEffect } from "react";
import "../../App.css";

function Meditation() {
  const [isMeditationActive, setIsMeditationActive] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(5 * 60); 
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    let meditationInterval;

    if (isMeditationActive) {
      meditationInterval = setInterval(() => {
        setMeditationTime((prevTime) => prevTime + 1);
      }, 1000);

      if (meditationTime >= selectedDuration) {
        setIsMeditationActive(false);
        setSessionActive(false);
        clearInterval(meditationInterval);
        playAlarm(); 
      }
    } else {
      clearInterval(meditationInterval);
    }

    return () => clearInterval(meditationInterval);
  }, [isMeditationActive, meditationTime, selectedDuration]);

  const handleStartMeditation = () => {
    setMeditationTime(0);
    setIsMeditationActive(true);
    setSessionActive(true);
  };

  const handleStopMeditation = () => {
    setIsMeditationActive(false);
    setSessionActive(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const playAlarm = () => {
    const audio = new Audio("alarm.wav"); 
    audio.play().catch((error) => console.log("Audio play failed:", error));
  };

  return (
    <div className="App meditation-page">
      <video className="background-video" autoPlay loop muted>
        <source src="falls.mp4" type="video/mp4" />
      </video>

      
      <h1
        style={{
          background: "linear-gradient(90deg, #ff8c00, #ff0080)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "3rem",
          fontWeight: "bold",
          animation: "pulse 2s infinite alternate"
        }}
      >
        Guided Meditation Timer
      </h1>

      <div className="duration-selection">
        <label
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
          }}
        >
          Select Meditation Duration: 
        </label>
        <select
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(Number(e.target.value))}
          disabled={sessionActive}
          style={{
            padding: "8px",
            fontSize: "1rem",
            fontWeight: "bold",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#333"
          }}
        >
          <option value={5 * 60}>5 minutes</option>
          <option value={10 * 60}>10 minutes</option>
          <option value={15 * 60}>15 minutes</option>
          <option value={20 * 60}>20 minutes</option>
        </select>
      </div>

      
      <div className="timer-section">
        <p
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
            textShadow: "0px 0px 15px #00ffcc",
            transition: "text-shadow 0.3s ease-in-out"
          }}
        >
          {formatTime(meditationTime)}
        </p>

        {!isMeditationActive ? (
          <button
            onClick={handleStartMeditation}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1.1rem",
              marginTop: "20px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Start Meditation
          </button>
        ) : (
          <button
            onClick={handleStopMeditation}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ff4444",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1.1rem",
              marginTop: "20px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4444")}
          >
            Stop Meditation
          </button>
        )}
      </div>

      {!sessionActive && meditationTime > 0 && meditationTime >= selectedDuration && (
        <p
          className="session-end"
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#ffcc00",
            textShadow: "0px 0px 10px #ffcc00",
            animation: "fadeIn 1s ease-in-out"
          }}
        >
          Session Complete! Well done! 🎉
        </p>
      )}
    </div>
  );
}

export default Meditation;
