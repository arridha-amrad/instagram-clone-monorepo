import { Button } from "#/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Textarea } from "#/components/ui/textarea";
import { authQueryOptions } from "#/features/auth/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userProfileQueryOptions } from "../fetch-profile/query";
import { useEditProfileMutation } from "./mutation";
import { editProfileSchema, type TEditProfileSchema } from "./zod-schema";

type Props = {
  children: React.ReactNode;
};

export default function EditProfileForm({ children }: Props) {
  const { data: authUser } = useQuery(authQueryOptions());
  const { data: profile } = useQuery(
    userProfileQueryOptions(authUser?.user.username || ""),
  );

  const { mutateAsync } = useEditProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    values: {
      name: profile?.name || "",
      location: profile?.userProfile?.location || "",
      bio: profile?.userProfile?.bio || "",
      occupation: profile?.userProfile?.occupation || "",
      web: profile?.userProfile?.web || "",
    },
  });

  const btnCloseDialogRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (data: TEditProfileSchema) => {
    await mutateAsync(data);
    btnCloseDialogRef.current?.click();
    toast.success("profile updated");
  };

  return (
    <FieldSet disabled={isSubmitting}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-3">
            <Field>
              <FieldLabel htmlFor="name-1">Name</FieldLabel>
              <Input id="name-1" placeholder="Name" {...register("name")} />
              {errors.name?.message && (
                <FieldError errors={[{ message: errors.name.message }]} />
              )}
            </Field>

            <Field data-disabled>
              <FieldLabel htmlFor="input-demo-disabled">Username</FieldLabel>
              <Input
                id="input-demo-disabled"
                defaultValue={profile?.username}
                disabled
              />
              <FieldDescription>You cannot change username</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                placeholder="Location"
                {...register("location")}
              />
              {errors.location?.message && (
                <FieldError errors={[{ message: errors.location.message }]} />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <Textarea id="bio" placeholder="Bio" {...register("bio")} />
              {errors.bio?.message && (
                <FieldError errors={[{ message: errors.bio.message }]} />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="occupation">Occupation</FieldLabel>
              <Input
                id="occupation"
                placeholder="Software Engineer"
                {...register("occupation")}
              />
              {errors.occupation?.message && (
                <FieldError errors={[{ message: errors.occupation.message }]} />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="website">Website</FieldLabel>
              <Input
                id="website"
                placeholder="https://example.com"
                {...register("web")}
              />
              {errors.web?.message && (
                <FieldError errors={[{ message: errors.web.message }]} />
              )}
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button ref={btnCloseDialogRef} type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              Save changes
              {isSubmitting && <Loader2 className="animate-spin" />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </FieldSet>
  );
}
