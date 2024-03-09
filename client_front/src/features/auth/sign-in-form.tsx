import axiosInstance from "@/shared/api/api-instance";
import { UiButton } from "@/shared/ui/ui-button";
import { UiTextField } from "@/shared/ui/ui-text-field";
import { UiTwoFactorModal } from "@/shared/ui/ui-two-factor-modal";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";

export function SignInForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isModal, setIsModal] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter()


  const handleRegistration = async () => {
    try {
      const response = await axiosInstance.post("/login", formData);
      setIsModal(true);
    } catch (error) {
      console.error("login error", error);
    }
  };
  const handleQrCode = async () => {
    try {
      const response = await axiosInstance.post("/two-factor-login", {code: code, email: formData.email });
      localStorage.setItem('accessToken', response.data?.token)
      router.push('/')
    } catch (error) {
      console.error("wronge code", error);
    }
  };

  const handleSetCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-2">
      <UiTextField
        label="Email"
        inputProps={{
          value: formData.email,
          name: "email",
          onChange: handleChange,
          type: "email",
        }}
      />
      <UiTextField
        label="Password"
        inputProps={{
          value: formData.password,
          name: "password",
          onChange: handleChange,
          type: "password",
        }}
      />
      <UiButton variant="secondary" onClick={handleRegistration} className="mt-2">
        Login
      </UiButton>

      {isModal && (
        <UiTwoFactorModal onClick={handleQrCode} onChange={handleSetCode} />
      )}
    </div>
  );
}
