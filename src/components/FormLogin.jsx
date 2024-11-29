import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const FormLogin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.username === "" || user.password === "") {
            toast.error("Username dan Password tidak boleh kosong!");
            return;
        } else if (user.password.length !== 5 || user.username !== "Listya" || user.password !== "11679") {
            toast.error("Username dan Password harus 5 digit NPM yang benar!");
            return;
        } else {
            const newUser = {
                ...user,
                loginAt: new Date(),
            };
            localStorage.setItem("user", JSON.stringify(newUser));
            toast.success("Login Berhasil!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "auto" }}>
            <Alert variant="info">
                <strong>Info!</strong> Username harus dengan nama depan dan password harus 5 digit NPM
            </Alert>

            {/* Username input */}
            <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="name@example.com"
                    name="username"
                    onChange={handleChange}
                />
            </FloatingLabel>

            {/* Password input with toggle */}
            <FloatingLabel controlId="floatingPassword" label="Password" className="position-relative">
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                    autoComplete="off"
                    className="pe-5" // Padding to make space for the icon
                />
                {/* Button to toggle password visibility */}
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                    style={{ right: "10px", cursor: "pointer" }}
                >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
            </FloatingLabel>

            {/* Submit button */}
            <Button variant="primary" type="submit" className="mt-3 w-100">
                Login
            </Button>
        </form>
    );
};

export default FormLogin;
