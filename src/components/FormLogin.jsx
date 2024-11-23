import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FloatingLabel, Button, Alert } from "react-router-dom";
import { toast } from "sonner";

const FormLogin = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState({username:"",password:""});
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value});
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(user.username ==="" || user.password ===""){
            toast.error("Username dan Password tidak boleh kosong!");
            return;
        }else if (user.password.length !==5 || user.username !== "Leotinus" || user.password !== "11231"){
            toast.error("Username dan Password harus 5 digit sama dengan 11231!");
            return;
        }else{
            const newUser ={
                ...user,
                loginAt: new Date(),
            };
            localStorage.setItem("user",JSON.stringify(newUser));
            toast.success("Login Berhasil!");
            setTimeout(() =>{
                navigate("/dashboard");
            },1000);
        }
    };
    return (
        <form onSubmit={handleSubmit} style={{maxWidth: "700px", margin: "auto"}} >
            <Alert variant="info">
                <strong>Info!</strong> Username harus dengan nama depan dan password harus 5 digit NPM
            </Alert>
            <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                <Form.Control type="text" placeholder="name@example.com" name="username" onChange={handleChange} />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" >
                <Form.Control type="password" placeholder="password" name="password" onChange={handleChange} autoComplete="off" />
            </FloatingLabel>

            <Button variant="primary" type="sumbit" className="mt-3 w-100">
                Login
            </Button>

        </form>
    );
};

export default FormLogin;