import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { setUserLogin } from "@/redux/slices/authSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // const username = (e.target = e.target.username.value.trim());
    // const password = (e.target = e.target.password.value.trim());


    if (!username || !password) {
      return toast({
        title: "Please enter username and password",
      });
    }
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/auth/admin-login",
        { username, password }
      );
      const data = await res.data;
    
      dispatch(setUserLogin(data));
      toast({
        title: data.message,
      });
      navigate("/admin/dashboard");
    } catch (error) {
   
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <div className="w-[60vw] lg:w-[25vw] mx-auto my-32 grid gap-3">
        <h1 className="text-2xl font-bold">Login into your account</h1>
        <form className="grid gap-3" onSubmit={handleLogin}>
          <Input
            onChange={(e) => setUserName(e.target.value)}
            placeholder="User Name Here..."
            type="text"
            value={username}
            name="username"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password Here..."
            type="password"
            value={password}
            name="password"
          />

          <Button>Log In</Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
