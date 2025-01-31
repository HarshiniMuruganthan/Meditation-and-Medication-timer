import { useState, useEffect } from "react";
import "../../App.css";

function Medication() {
  const [medications, setMedications] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [medicineTime, setMedicineTime] = useState("");

  useEffect(() => {
    const checkMedicationTime = setInterval(() => {
      const currentTime = new Date();
      const formattedTime =
        currentTime.getHours().toString().padStart(2, "0") +
        ":" +
        currentTime.getMinutes().toString().padStart(2, "0");

      medications.forEach((med) => {
        if (med.time === formattedTime) {
          triggerAlarm(med.name);
        }
      });
    }, 60000);

    return () => clearInterval(checkMedicationTime);
  }, [medications]);

  const handleAddMedication = () => {
    if (medicineName.trim() && medicineTime) {
      setMedications([...medications, { name: medicineName, time: medicineTime }]);
      setMedicineName("");
      setMedicineTime("");
    } else {
      alert("Please enter both Medicine Name and Time!");
    }
  };

  const triggerAlarm = (medicine) => {
    alert(`Time to take your medicine: ${medicine}`);
    playAlarmSound();
  };

  const playAlarmSound = () => {
    const audio = new Audio("alarm.wav");
    audio.play().catch((error) => console.log("Audio play failed:", error));
  };

  return (
    <div className="App medication-page" style={{ position: "relative", height: "100vh" }}>
     
      <img
        src="medication.jpg"
        alt="Medication Background"
        className="background-image"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
        }}
      />

      <div
        className="content"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.85)", 
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "auto",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
        }}
      >
        <h1 style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>Medication Reminder</h1>

        <div className="medication-form" style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Medicine Name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            style={{
              padding: "12px",
              fontSize: "16px",
              marginBottom: "15px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s",
            }}
          />
          <br />
          <input
            type="time"
            value={medicineTime}
            onChange={(e) => setMedicineTime(e.target.value)}
            style={{
              padding: "12px",
              fontSize: "16px",
              marginBottom: "15px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ddd",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s",
            }}
          />
          <br />
          <button
            onClick={handleAddMedication}
            style={{
              padding: "12px 25px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            Add Medication
          </button>
        </div>
        <br />

        <div className="medication-list">
          <h2 style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>Scheduled Medications</h2>
          {medications.length > 0 ? (
            <ul style={{ listStyleType: "none", padding: "0" }}>
              {medications.map((med, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "12px",
                    fontSize: "16px",
                    color: "#555",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  {med.name} - {med.time}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontSize: "16px", color: "#777" }}>No medications scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Medication;
