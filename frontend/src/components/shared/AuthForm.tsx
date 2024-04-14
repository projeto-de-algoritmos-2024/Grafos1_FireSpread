import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { AxiosError } from "axios";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { AlertDismissible } from "./Alert";

interface AuthFormProps {
  className?: string;
}

type Inputs = {
  email: string;
  password: string;
};

export function AuthForm({ className }: AuthFormProps) {
  const { register, handleSubmit } = useForm<Inputs>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  async function authenticate(data: Inputs) {
    try {
      const res = await api.post("/users/authenticate", data);
      return {
        status: res.status,
        body: res.data,
      };
    } catch (err) {
      console.log(err);
      const axiosErr = err as AxiosError;
      return {
        status: axiosErr.response?.status ?? 500,
        body: axiosErr.response?.data ?? { message: "Erro ao fazer login" },
      };
    }
  }

  async function onSubmit(user: Inputs) {
    const { status, body } = await authenticate(user);

    if (status == 200) {
      login(body);

      navigate("/");
    } else if (status === 404) {
      setAlertMessage(body.message);
      setAlertOpen(true);
    } else {
      setAlertMessage(
        "Ocorreu um erro com o servidor, tente novamente mais tarde"
      );
      setAlertOpen(true);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        <input
          className="h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
          type="email"
          placeholder="E-mail"
          {...register("email", { required: true })}
        />
        <input
          className="h-10 rounded-md border-[0.5px] px-4 bg-input border-stroke"
          type="password"
          placeholder="Senha"
          {...register("password", { required: true })}
        />
        <button className="bg-primaryButton text-primaryText" type="submit">
          Entrar
        </button>
      </form>
      <AlertDismissible
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertMessage}
      />
    </>
  );
}
