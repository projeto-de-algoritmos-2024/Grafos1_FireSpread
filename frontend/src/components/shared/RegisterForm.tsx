import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { AxiosError } from "axios";
import { AlertDismissible } from "./Alert";
import { useEffect, useState } from "react";

interface AuthFormProps {
  className?: string;
}

type Inputs = {
  name: string;
  email: string;
  emailConfirmation: number;
  password: string;
  dateOfBirth: string;
  enrollment: string;
  receivedInviteId?: number;
};

export function RegisterForm({ className }: AuthFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<Inputs>();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [isLucky, setIsLucky] = useState(false);

  const [verifyButtonText, setVerifyButtonText] = useState(
    "receber email de confirmação"
  );
  const [VerifyButtonColor, setVerifyButtonColor] = useState("primaryButton");

  const navigate = useNavigate();

  const enrollment = watch("enrollment");

  useEffect(() => {
    const email = `${enrollment}@aluno.unb.br`;
    setValue("email", email, { shouldValidate: true });
  }, [enrollment, setValue]);

  useEffect(() => {
    const checkUserLuck = async () => {
      const res = await api.get("/users/isLucky");

      if (res.status === 200) {
        setIsLucky(true);
      }
    };

    checkUserLuck();
  });

  async function sendConfirmationEmail() {
    try {
      setVerifyButtonText("enviando email...");
      setVerifyButtonColor("gray");

      const res = await api.post("/email/create", {
        email: watch("email"),
      });

      setVerifyButtonText("email enviado com sucesso!");
      setVerifyButtonColor("red");

      return {
        status: res.status,
        body: res.data,
      };
    } catch (err) {
      const axiosErr = err as AxiosError;

      const responseData = axiosErr.response?.data as { message: string };

      setAlertMessage(responseData.message ?? "Erro ao enviar email");
      setAlertOpen(true);

      return {
        status: axiosErr.response?.status ?? 500,
        body: axiosErr.response?.data ?? {},
      };
    }
  }

  async function registerUser(data: Inputs) {
    try {
      if (!data.receivedInviteId) {
        const dataToSend = {
          name: data.name,
          email: data.email,
          password: data.password,
          dateOfBirth: data.dateOfBirth,
          enrollment: data.enrollment,
        };
        const res = await api.post("/users/create", dataToSend);
        return {
          status: res.status,
          body: res.data,
        };
      }

      data.receivedInviteId = parseInt(data.receivedInviteId.toString());
      const res = await api.post("/users/create", data);
      return {
        status: res.status,
        body: res.data,
      };
    } catch (err) {
      const axiosErr = err as AxiosError;
      return {
        status: axiosErr.response?.status ?? 500,
        body: axiosErr.response?.data ?? {},
      };
    }
  }

  async function onSubmit(user: Inputs) {
    const { status, body } = await registerUser(user);
    if (status == 201) {
      navigate("/login");
    } else if (status === 409) {
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
        <div>
          <label className="text-[#E8E8E8] text-sm">Nome</label>
          <input
            className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
            type="text"
            placeholder="Salivan Silveira da Silva"
            {...register("name", { required: true })}
            aria-invalid={errors.name ? "true" : "false"}
          />
        </div>
        <div>
          <label className="text-[#E8E8E8] text-sm">Matrícula</label>
          <input
            className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
            type="text"
            placeholder="000000000"
            {...register("enrollment", { required: true })}
            aria-invalid={errors.enrollment ? "true" : "false"}
          />
        </div>
        <div className="gap-2 flex flex-col">
          <label className="text-[#E8E8E8] text-sm">Email</label>
          <input
            className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke gap"
            type="email"
            placeholder="000000000@aluno.unb.br"
            {...register("email", { required: true })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          <div className="w-full flex gap-2 flex-col items-end">
            <input
              className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
              type="number"
              placeholder="Código de confirmação"
              {...register("emailConfirmation", { required: true })}
              aria-invalid={errors.emailConfirmation ? "true" : "false"}
            />
            <button
              className={`text-primaryText text-sm bg-${VerifyButtonColor} p-2 rounded-md`}
              type="button"
              onClick={sendConfirmationEmail}
            >
              {verifyButtonText}
            </button>
          </div>
        </div>
        <div>
          <label className="text-[#E8E8E8] text-sm">Senha</label>
          <input
            className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
            type="password"
            placeholder="Senha"
            {...register("password", { required: true })}
            aria-invalid={errors.password ? "true" : "false"}
          />
        </div>
        <div>
          <label className="text-[#E8E8E8] text-sm">Data de nascimento</label>
          <input
            className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
            type="date"
            placeholder="Data de nascimento"
            {...register("dateOfBirth", { required: true })}
            aria-invalid={errors.dateOfBirth ? "true" : "false"}
          />
        </div>
        <div>
          <label className="text-[#E8E8E8] text-sm">Código de convite</label>
          <input
            className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke animate-slide-placeholder-sm"
            type="number"
            placeholder={isLucky ? "Você foi sortudo, não precisa 😎" : "1234"}
            {...register("receivedInviteId")}
            disabled={isLucky}
          />
        </div>

        <button
          className="mt-2 bg-primaryButton text-primaryText"
          type="submit"
        >
          Registrar-me
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
