import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { AxiosError } from "axios";

interface AddFriendFormProps {
  className?: string;
}

type Inputs = {
  inviteId: number;
};

export function AddFriendForm({ className }: AddFriendFormProps) {
    const {
        register,
        handleSubmit,
    
      } = useForm<Inputs>()
    
      async function addFriend(data: Inputs) {
        try {
            if (data.inviteId){
                data.inviteId = parseInt(data.inviteId);
              }
          const res = await api.post("/users/addFriend", data);
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
        const { status, body } = await addFriend(user); 
    
    
        if(status == 200) {
            console.log({
                title: "Amigo adicionado",
                description: "O amigo foi adicionado com sucesso",
                variant: "success"
            });
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
            type="number"
            placeholder="Código"
            {...register("inviteId", { required: true })}
          />
          <button className="bg-primaryButton text-primaryText" type="submit">Adicionar</button>
        </form>
      )
    }