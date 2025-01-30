import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      console.log("Event triggered");
      const req = axios.post("http://localhost:3001/signup", {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
      });
      console.log(req);
      navigate("/Login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup-wrapper">
    
      

    
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .signup-wrapper {
            position: relative;
            width: 100%;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }

          .background-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;
            filter: blur(3px);
          }

          .signup-container {
            background: rgba(255, 255, 255, 0.9);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 350px;
            z-index: 2;
          }

          .signup-container h2 {
            margin-bottom: 20px;
            font-size: 24px;
            color: #333;
          }

          .input-field {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 8px;
            font-size: 16px;
          }

          .signup-button {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
            border: none;
            border-radius: 8px;
            background-color: #00796b;
            color: white;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
          }

          .signup-button:hover {
            background-color: #004d40;
            transform: scale(1.05);
          }

          .signup-container p {
            margin-top: 15px;
            font-size: 14px;
            color: #555;
          }

          .signup-container a {
            color: #00796b;
            text-decoration: none;
            font-weight: bold;
          }

          .signup-container a:hover {
            text-decoration: underline;
          }

          @media (max-width: 480px) {
            .signup-container {
              width: 90%;
              padding: 20px;
            }
          }
        `}
      </style>

  
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form method="POST" onSubmit={handleSignup}>
          <input
            className="input-field"
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First Name"
            required
          />
          <input
            className="input-field"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last Name"
            required
          />
          <input
            className="input-field"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className="signup-button" type="submit">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <a href="/Login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
