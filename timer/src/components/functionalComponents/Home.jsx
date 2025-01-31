import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            font-family: 'Lato';
            height: 100%;
            overflow: hidden;
          }

          .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
           
          }

          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            position: relative;
            text-align: center;
            transparency:10;
          }

          .box {
            background-color: rgba(255, 255, 255, 0.85);
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            max-width: 500px;
          }

          .heading {
            font-size: 32px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 10px;
          }

          .caption {
            font-size: 18px;
            color: #555;
            margin-bottom: 20px;
            font-style: italic;
          }

          .quote {
            font-size: 16px;
            color: #444;
            margin-top: 15px;
            font-style: italic;
          }

          .button {
            padding: 12px 20px;
            font-size: 16px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            margin: 10px;
            transition: transform 0.2s ease-in-out;
            width: 150px;
          }

          .meditation-btn {
            background-color: #00796b;
            color: white;
          }

          .medication-btn {
            background-color: #d32f2f;
            color: white;
          }

          .button:hover {
            transform: scale(1.1);
          }
        `}
      </style>

      <img src="/bgihome.jpg" alt="Background" className="background" />

   
      <div className="container">
        <div className="box">
          <h1 className="heading">Welcome to HealSync!!!</h1>
          <p className="caption">
            Balance your well-being with meditation and medication.
          </p>
          <p className="text">Choose your path:</p>

          <button className="button meditation-btn" onClick={() => navigate("/meditation")}>
            Meditation
          </button>
          <button className="button medication-btn" onClick={() => navigate("/medication")}>
            Medication
          </button>

        
          <p className="quote">Meditation is the key to unlocking the door to inner peace.</p>
          <p className="quote">Medicine cures the body, but peace heals the soul.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
