import { DropdownMenuItem } from "../ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

export default function EditProfile() {
  return (
    <DialogEditProfile>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        Edit Profile
      </DropdownMenuItem>
    </DialogEditProfile>
  );
}

function DialogEditProfile({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                placeholder="Name"
                defaultValue="Pedro Duarte"
              />
            </Field>
            <Field data-disabled>
              <FieldLabel htmlFor="input-demo-disabled">Username</FieldLabel>
              <Input
                id="input-demo-disabled"
                defaultValue={"@john_doe"}
                disabled
              />
              <FieldDescription>You cannot change username</FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input id="location" placeholder="Location" />
            </Field>
            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea id="bio" placeholder="Bio" />
            </Field>
            <Field>
              <FieldLabel htmlFor="occupation">Occupation</FieldLabel>
              <Input id="occupation" placeholder="Software Engineer" />
            </Field>
            <Field>
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <Input id="website" placeholder="https://example.com" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
