import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Event triggered");
      const req = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
      });

      alert(req.data.response);
      if (req.data.loginStatus) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-wrapper">
      
    
    
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .login-wrapper {
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

          .login-container {
            background: rgba(255, 255, 255, 0.9);
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
            text-align: center;
            width: 320px;
            z-index: 2;
          }

          .login-container h2 {
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

          .login-button {
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

          .login-button:hover {
            background-color: #004d40;
            transform: scale(1.05);
          }

          .login-container p {
            margin-top: 15px;
            font-size: 14px;
            color: #555;
          }

          .login-container a {
            color: #00796b;
            text-decoration: none;
            font-weight: bold;
          }

          .login-container a:hover {
            text-decoration: underline;
          }

          @media (max-width: 480px) {
            .login-container {
              width: 90%;
              padding: 20px;
            }
          }
        `}
      </style>

      <div className="login-container">
        <h2>Login</h2>
        <form method="POST" onSubmit={handleLogin}>
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
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
