import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ClientProfileCard from "../Card/ClientProfileCard/ClientProfileCard";

function DetailClientDialog(props) {
  const { open, handleChangeOpen, profile } = props;

  return (
    <Dialog onOpenChange={handleChangeOpen} open={open}>
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{"Client's Information"}</DialogTitle>
          <DialogDescription></DialogDescription>
          <ClientProfileCard profile={profile} clasName="mt-4" />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DetailClientDialog;
