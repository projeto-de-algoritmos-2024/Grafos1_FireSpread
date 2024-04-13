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
  receivedInviteId?: number;

};

export function RegisterForm({ className }: AuthFormProps) {
  const {
    register,
    handleSubmit,

  } = useForm<Inputs>()

  const navigate = useNavigate();

  async function registerUser(data: Inputs) {
    try {
      console.log(data);
      const dataToSend: { [key: string]: any } = {};
      for (const key in data) {
        if (data.hasOwnProperty(key) && data[key as keyof Inputs] !== undefined) {
          dataToSend[key] = data[key as keyof Inputs];
        }
      }
      if (dataToSend.receivedInviteId){
        dataToSend.receivedInviteId = parseInt(dataToSend.receivedInviteId);
      }
      const res = await api.post("/users/create", dataToSend);
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
    const { status } = await registerUser(user); 
    if(status == 201) {
      navigate("/login");
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
      <div>
      <label className="text-[#E8E8E8] text-sm">Nome</label>
      <input className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
        type="text"
        placeholder="Salivan Silveira da Silva"
        {...register("name", { required: true })}
      />
      </div>
      <div>
      <label className="text-[#E8E8E8] text-sm">Matrícula</label>
      <input className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
        type="text"
        placeholder="000000000"
        {...register("enrollment", { required: true })}
      />
      </div>
      <div>
      <label className="text-[#E8E8E8] text-sm">Email</label>
      <input className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
        type="email"
        placeholder="000000000@aluno.unb.br"
        {...register("email", { required: true })}
      />
      </div>
      <div>
      <label className="text-[#E8E8E8] text-sm">Senha</label>
      <input className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
        type="password"
        placeholder="Senha"
        {...register("password", { required: true })}
      />
      </div>
      <div>
      <label className="text-[#E8E8E8] text-sm">Data de nascimento</label>
      <input className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
        type="date"
        placeholder="Data de nascimento"
        {...register("dateOfBirth", { required: true })}
      />
      </div>
      <div>
      <label className="text-[#E8E8E8] text-sm">Código de convite</label>
      <input className=" w-full h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
        type="number"
        placeholder="0000"
        {...register("receivedInviteId")}
      />
      </div>
      
      
      <button className="mt-2 bg-primaryButton text-primaryText" type="submit">Registrar-me</button>
    </form>
  )
}