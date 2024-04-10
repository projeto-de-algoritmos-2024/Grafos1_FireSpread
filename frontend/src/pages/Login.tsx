import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/shared/AuthForm";


export default function Login() {
  const navigation = useNavigate();
  const cookie = localStorage.getItem(import.meta.env.PUBLIC_TOKEN_COOKIE_NAME);
  if(cookie) {
    navigation("/employee/tasks");
  }

  return (
      <main className="w-screen h-screen bg-background justify-center items-center flex flex-col gap-4">
        <div className="md:w-1/4 w-1/2 p-16 rounded-sm bg-foreground flex-col gap-6">
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