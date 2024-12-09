import { useState } from "react";

export const usePasswordStrength = () => {
  const [strength, setStrength] = useState(0);
  const [label, setLabel] = useState("Weak");

  const calculateStrength = (password: string) => {
    if (!password) {
      setStrength(0);
      setLabel("Weak");
      return;
    }

    const hasLowercase :number = /[a-z]/.test(password)? 1:0;
    const hasUppercase :number= /[A-Z]/.test(password)? 1:0;
    const hasNumber :number= /[0-9]/.test(password)? 1:0;
    const hasSpecialChar:number = /[!@#$%^&*(),.?":{}|<>]/.test(password)? 1:0;

    const newStrength =
      hasLowercase + hasUppercase + hasNumber + hasSpecialChar;

    setStrength(newStrength);
    if (newStrength === 4) setLabel("Strong");
    else if (newStrength === 3) setLabel("Medium");
    else setLabel("Weak");
  };

  return { strength, label, calculateStrength };
};
