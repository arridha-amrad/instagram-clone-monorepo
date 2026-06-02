import { createPostFormSchema, type TCreatePostFormSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FieldGroup } from "@/components/ui/field";
import Accessibility from "../accessibility";
import AdvanceSettings from "../advance-settings";
import {
  Steps,
  useCreatePost,
  type MediaWithTaggedUsers,
} from "../create-post-context";
import ShareTo from "../share-to";
import CaptionTextarea from "./caption-textarea";
import CollaboratorsInput from "./collaborators-input";
import LocationInput from "./location-input";
import { useCreatePostMutation } from "../../mutation";
import { uploadToCloudinary } from "#/lib/cloudinaryFn";
import { getCloudinaryUploadSignature } from "../../api";

export default function FormCaption() {
  const { formRef, mediaWithTaggedUsers, aspectRatio, setStep } =
    useCreatePost();
  const { mutateAsync: createPostMutation } = useCreatePostMutation();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    register,
  } = useForm<TCreatePostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
  });

  const onSubmit = async (data: TCreatePostFormSchema) => {
    try {
      setStep(Steps.Submitting);

      // 1. Upload media
      const promises = mediaWithTaggedUsers.map(async (m) => {
        const { apiKey, cloudName, signature, timestamp } =
          await getCloudinaryUploadSignature("instagram-monorepo-hono/post");

        // 2. Upload
        const { secure_url } = await uploadToCloudinary({
          apiKey,
          cloudName,
          timestamp,
          file: m.file,
          signature,
          folder: "instagram-monorepo-hono/post",
        });
        const newMedia: Omit<MediaWithTaggedUsers, "file"> = {
          src: secure_url,
          taggedUsers: m.taggedUsers,
          type: m.type,
          order: m.order,
        };
        return newMedia;
      });

      const media = await Promise.all(promises);

      await createPostMutation({
        caption: data.caption,
        location: data.location,
        collaborators: data.collaborators,
        media,
        aspectRatio,
      });

      setStep(Steps.Submitted);
    } catch (err) {
      console.log(err);
      setStep(Steps.MakeCaption);
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        <div className="flex flex-col gap-4 p-4">
          <form
            ref={formRef}
            id="caption-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <FieldGroup>
              <CaptionTextarea
                name="caption"
                getValues={getValues}
                setValue={setValue}
                register={register}
                control={control}
                error={errors.caption?.message}
              />

              <LocationInput
                name="location"
                setValue={setValue}
                error={errors.location?.message}
              />

              <Controller
                name="collaborators"
                control={control}
                render={({ field }) => (
                  <>
                    <CollaboratorsInput field={field} />
                    {errors.collaborators && (
                      <p className="mt-1 text-xs font-medium text-destructive">
                        {errors.collaborators.message}
                      </p>
                    )}
                  </>
                )}
              />

              <div className="space-y-1">
                <ShareTo />
                <Accessibility />
                <AdvanceSettings />
              </div>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
