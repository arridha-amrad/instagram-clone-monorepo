import EditProfileForm from "#/features/users/edit-profile/edit-profile-form";
import { Dialog } from "@/components/ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import type { TFetchProfile } from "#/features/users/fetch-profile/api";
import { useState } from "react";

type Props = {
  profile: TFetchProfile;
};

export default function EditProfile({ profile }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <DialogEditProfile profile={profile} open={open} onOpenChange={setOpen}>
      <DropdownMenuItem onSelect={(e) => {
        e.preventDefault();
        setOpen(true);
      }}>
        Edit Profile
      </DropdownMenuItem>
    </DialogEditProfile>
  );
}

function DialogEditProfile({
  children,
  profile,
  open,
  onOpenChange,
}: {
  children: React.ReactNode;
  profile: TFetchProfile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <EditProfileForm profile={profile} onSuccess={() => onOpenChange(false)}>
        {children}
      </EditProfileForm>
    </Dialog>
  );
}

