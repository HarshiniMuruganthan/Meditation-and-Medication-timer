
import { Link } from "react-router-dom";
import "./Nav.css";

const Navbar = () => {
    return (
        <header>
            <nav>
                <ol>
                <li><Link to='/' className="link">Signup</Link></li>
                <li><Link to='/login' className="link">Login</Link></li>
                <li><Link to='/home' className="link">Home</Link></li>
                    <li><Link to='/medication' className="link">Medication</Link></li>
                    <li><Link to='/meditation' className="link">Meditation</Link></li>
                   
                    </ol>
            </nav>
        </header>
    );
};

export default Navbar;


