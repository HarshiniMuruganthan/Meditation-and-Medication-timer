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
    <div className="App medication-page">
     
      <img src="medication.jpg" alt="Medication Background" className="background-image" />

      {/* Content */}
      <div className="content">
        <h1>Medication Reminder</h1>

        <div className="medication-form">
          <input
            type="text"
            placeholder="Medicine Name"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />
          <br />
          <input
            type="time"
            value={medicineTime}
            onChange={(e) => setMedicineTime(e.target.value)}
          />
          <br />
          <button onClick={handleAddMedication}>Add Medication</button>
        </div>
        <br />

        <div className="medication-list">
          <h2>Scheduled Medications</h2>
          {medications.length > 0 ? (
            <ul>
              {medications.map((med, index) => (
                <li key={index}>
                  {med.name} - {med.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>No medications scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Medication;
