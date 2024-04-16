import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

export function AboutDialog() {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => setOpen(!open);

  const AboutTheTeoryPopOver = () => {
    return (
      <Popover>
        <PopoverHandler>
          <p className="text-primaryButton inline-block cursor-pointer">
            teoria dos Seis Graus de Separação
          </p>
        </PopoverHandler>
        <PopoverContent className="z-[9999] bg-opacity-75">
          <div className="text-black bg-opacity-95">
            A teoria dos seis graus de separação é a ideia de que todas as
            pessoas estão conectadas por, no máximo, seis "apertos de mão".
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-foreground text-primaryText z-30"
      >
        <DialogHeader className="text-primaryText">
          Sobre o fire spread:
        </DialogHeader>
        <DialogBody className="text-primaryText inline-block">
          O fire spread é um site feito para a disciplina de projeto de
          algoritmos e foi inspirado pela {<AboutTheTeoryPopOver />}, cujo
          objetivo é verificar se conseguimos conectar todas as pessoas que usam
          a plataforma através de amizades de amigos de amigos. Atualmente a
          plataforma só aceita cadastros com emails universitários e além disso,
          para deixar as coisas um pouco mais difíceis, algumas pessoas precisam
          de código de amizade para criar sua conta.
        </DialogBody>
        <DialogFooter>
          <Button className="bg-primaryButton" onClick={handleOpen}>
            <span>fechar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
