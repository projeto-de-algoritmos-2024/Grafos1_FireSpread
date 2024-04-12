import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { AxiosError } from "axios";

interface AuthFormProps {
  className?: string;
}

type Inputs = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  enrollment: string;
  receivedInviteId?: string;

};

export function RegisterForm({ className }: AuthFormProps) {
  const {
    register,
    handleSubmit,

  } = useForm<Inputs>()

  const navigate = useNavigate();

  async function register(data: Inputs) {
    try {
      const res = await api.post("/users/create", data);
      return {
        status: res.status,
        body: res.data
      };
    } catch (err) {
      console.log(err);
      const axiosErr = err as AxiosError;
      return {
        status: axiosErr.response?.status ?? 500,
        body: null,
      };
    }
  }
  
  async function onSubmit(user: Inputs) {
    const { status } = await register(user); 
    if(status == 200) {
      navigate("/");
    } else
      if (status === 404) {
        console.log({
          title: "Email ou senha incorretos",
          description: "Verifique se o email ou a senha foram digitados corretamente",
          variant: "destructive"
        });
      } else {
        console.log({
          title: "Erro ao fazer login",
          description: "Ocorreu um erro ao fazer login, tente novamente mais tarde",
          variant: "destructive"
        });
      }
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <input className="h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
        type="email"
        placeholder="E-mail"
        {...register("email", { required: true })}
      />
      <input className="h-10 rounded-md border-[0.5px] px-4 bg-input border-stroke"
        type="password"
        placeholder="Senha"
        {...register("password", { required: true })}
      />
      <button className="bg-primaryButton text-primaryText" type="submit">Entrar</button>
    </form>
  )
}