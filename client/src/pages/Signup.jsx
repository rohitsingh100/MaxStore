import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [enabled, setEnabled] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password } = e.target.elements;

    if (
      name.value.trim() === "" ||
      email.value.trim() === "" ||
      phone.value.trim() === "" ||
      password.value.trim() === ""
    ) {
      toast({
        title: "Please fill all the fields",
        variant: "destructive",
      });
      return; // <-- important
    }

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/auth/signup",
        {
          name: name.value,
          phone: phone.value,
          email: email.value,
          password: password.value,
        }
      );

      toast({
        title: res.data.message,
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Signup failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-[60vw] lg:w-[25vw] mx-auto my-10 grid gap-3">
      <h1 className="text-2xl font-bold">Register your account</h1>
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <Input placeholder="Enter Your Name" type="text" name="name" />
        <Input placeholder="Enter Your Email" type="email" name="email" />
        <Input placeholder="Enter Your Phone" type="tel" name="phone" />
        <Input
          placeholder="Enter Your Password"
          type="password"
          name="password"
        />

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" onCheckedChange={(e) => setEnabled(e)} />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Accept terms and conditions
          </label>
        </div>

        <Button disabled={!enabled}>Sign Up</Button>

        <div className="flex gap-2 items-center">
          <p className="text-sm">Already have an account?</p>
          <Link to="/login" className="text-sm cursor-pointer">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
