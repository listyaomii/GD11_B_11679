import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { toast } from "sonner";

const FormLogin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.username === "" || user.password === "") {
      toast.error("Username dan Password Tidak Boleh Kosong!");
      return;
    } else if (
      user.username !== "Listya" || // Ganti dengan username yang benar
      user.password !== "11679" // Ganti dengan password (5 digit NPM) yang benar
    ) {
      toast.error("Username harus dengan nama depan dan password harus 5 digit NPM!");
      return;
    } else {
      const newUser = {
        ...user,
        loginAt: new Date(),
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("Login berhasil!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px", margin: "auto" }}>
      <Alert variant="info">
        <strong>Info!</strong> Username harus dengan nama depan dan password harus 5 digit NPM.
      </Alert>
      <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
        <Form.Control
          type="text"
          placeholder="name@example.com"
          name="username"
          onChange={handleChange}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          autoComplete="off"
        />
      </FloatingLabel>
      <Button variant="primary" type="submit" className="mt-3 w-100">
        Login
      </Button>
    </form>
  );
};

export default FormLogin;
