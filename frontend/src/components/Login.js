import { useRef, useState, useEffect } from "react";
import axios from 'axios';
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "react-use-cart";
import "./Register.css";

const Login = () => {
    const { setAuth } = useAuth();
    const { items,  removeItem} = useCart();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
   
    function Clear()
    {
        items.map((item) => removeItem(item.id));
    }
    
    useEffect(() => {
        userRef.current.focus();
        Clear();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('UserName', user);
        formData.append('Password', pwd);

        try {
            const response = await axios.post('https://localhost:5001/auth/login',
                formData, { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.role;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');                     
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }


    return (
        <div className="register">
            <section className="register_section">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit} className="register_form">
                    <label className="register_label" htmlFor="username">Username:</label>
                    <input
                        className="register_input"
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label className="register_label" htmlFor="password">Password:</label>
                    <input
                        className="register_input"
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button className="register_button">Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to={'/register'}>Sign Up</Link>
                    </span>
                </p>
            </section>
        </div>
    )
}

export default Login