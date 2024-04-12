import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/shared/AuthForm";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";


export default function Register() {
  const navigation = useNavigate()

  const { user } = useAuth(); 

  useEffect(() => {
    const checkAuth = async () => {
      if(user) {
        navigation('/')
      }
    }

    checkAuth()
  })


  return (
      <main className="w-screen h-screen bg-background justify-center items-center flex flex-col gap-4">
        <div className="xl:w-1/3 w-1/2 p-16 rounded-sm bg-foreground flex-col gap-6">
          <div className="text-center mb-14 flex flex-col gap-4">
            <h1 className="text-2xl text-primaryText font-semibold tracking-tight">
              Seja bem-vindo à aplicação!
            </h1>
            <p className="text-sm text-[#E8E8E8] text-muted-foreground">
              Insira seu e-mail e senha para entrar na plataforma.
            </p>
          </div>
          <AuthForm className="flex flex-col gap-8 mb-4" />
          <button className="w-full bg-secondaryButton text-secondaryText" type="submit">Cadastrar-me</button>
        </div>
      </main>
  );
}