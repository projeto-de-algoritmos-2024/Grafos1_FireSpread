import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { RegisterForm } from "../components/shared/RegisterForm";


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
              Faça seu cadastro!
            </h1>
            <p className="text-sm text-[#E8E8E8] text-muted-foreground">
              Insira seus dados para se cadastrar na plataforma.
            </p>
          </div>
          <RegisterForm className="flex flex-col gap-5 mb-4" />
        </div>
      </main>
  );
}