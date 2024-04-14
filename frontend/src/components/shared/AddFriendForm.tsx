import { useForm } from "react-hook-form";
import { api } from "../../lib/api";
import { AxiosError } from "axios";
import { useState } from "react";
import { AlertDismissible } from "./Alert";

interface AddFriendFormProps {
  className?: string;
}

type Inputs = {
  inviteId: number;
};

export function AddFriendForm({ className }: AddFriendFormProps) {
  const { register, handleSubmit } = useForm<Inputs>();

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertStatus, setAlertStatus] = useState<
    "success" | "error" | "warning"
  >("success");

  async function addFriend(data: Inputs) {
    try {
      if (data.inviteId) {
        data.inviteId = parseInt(data.inviteId);
      }
      const res = await api.post("/users/addFriend", data);
      return {
        status: res.status,
        body: res.data,
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

    if (status == 200) {
      setAlertMessage(body.message);
      setAlertStatus("success");
      setAlertOpen(true);
    } else if (status === 404) {
      setAlertMessage("Usuário não encontrado");
      setAlertStatus("error");
      setAlertOpen(true);
    } else {
      setAlertMessage(
        "Ocorreu um erro com o servidor, tente novamente mais tarde"
      );
      setAlertStatus("error");
      setAlertOpen(true);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        <input
          className="h-10 text-inputText rounded-md border-[0.5px] px-4 bg-input border-stroke"
          type="number"
          placeholder="Código"
          {...register("inviteId", { required: true })}
        />
        <button className="bg-primaryButton text-primaryText" type="submit">
          Adicionar
        </button>
      </form>
      <AlertDismissible
        open={alertOpen}
        setOpen={setAlertOpen}
        message={alertMessage}
        type={alertStatus}
      />
    </>
  );
}
