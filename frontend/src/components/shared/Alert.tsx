import { Alert } from "@material-tailwind/react";

interface AlertDismissibleProps {
  type?: "success" | "error" | "warning";
  message: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AlertDismissible({
  type = "success",
  message,
  open,
  setOpen,
}: AlertDismissibleProps) {
  const AlertIcon = () => {
    switch (type) {
      case "success":
        return <i className="fas fa-check-circle"></i>;
      case "error":
        return <i className="fas fa-exclamation-circle"></i>;
      case "warning":
        return <i className="fas fa-exclamation-triangle"></i>;
      default:
        return <i className="fas fa-info-circle"></i>;
    }
  };

  return (
    <>
      <Alert
        className="absolute bottom-10 left-5 w-[90vw] z-50 flex bg-opacity-50"
        icon={<AlertIcon />}
        open={open}
        onClose={() => setOpen(false)}
        color={type as "red"}
      >
        <div className="flex-1">
          <span className="block sm:inline">{message}</span>
        </div>
      </Alert>
    </>
  );
}
