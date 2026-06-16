"use client";

import FacebookLogin from "@/components/FacebookLogin";

export default function FakeWeb4() {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "markzuckerberg@fakemail.com" && password === "thisisafakefacebook") {
      alert("Congratulation, you get the flag");
    } else {
      alert("Wrong Email or Password");
    }
  };

  return (
    <FacebookLogin 
      title={`The founder use "cybersecurity" as the key`} 
      onLogin={handleLogin} 
    />
  );
}
