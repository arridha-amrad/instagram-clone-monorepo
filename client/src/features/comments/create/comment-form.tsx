import Emoji from "#/components/emoji/emoji-btn";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { createCommentFormSchema, type TCreateCommentSchema } from "./schema";
import { useCreateCommentMutation } from "./mutation";
import { Loader2 } from "lucide-react";

type Props = {
  postId: string;
};

export default function CommentForm({ postId }: Props) {
  const { mutateAsync, isPending } = useCreateCommentMutation();

  const { getValues, setValue, reset, register, handleSubmit } =
    useForm<TCreateCommentSchema>({
      resolver: zodResolver(createCommentFormSchema),
    });

  const { ref: registerRef, ...commentRegister } = register("comment");

  const inputRef = useRef<HTMLInputElement>(null);
  const cursorPositionRef = useRef<number>(0);

  const handleCursorPosition = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const position = e.currentTarget.selectionStart;
    cursorPositionRef.current = position || 0;
  };

  const onSubmit = async (data: TCreateCommentSchema) => {
    try {
      await mutateAsync({
        comment: data.comment,
        postId: postId,
      });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <fieldset disabled={isPending} className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2"
      >
        <Emoji
          disabled={false}
          cursorPositionRef={cursorPositionRef}
          inputRef={inputRef}
          setText={(val: string | ((prev: string) => string)) => {
            const currentVal = getValues("comment") || "";
            const newValue = typeof val === "function" ? val(currentVal) : val;
            setValue("comment", newValue, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        />
        <Input
          {...commentRegister}
          ref={(e) => {
            registerRef(e);
            inputRef.current = e;
          }}
          onClick={handleCursorPosition}
          onKeyUp={handleCursorPosition}
          onInput={handleCursorPosition}
          placeholder="Add a comment..."
          className="border-none bg-transparent px-2 text-sm shadow-none focus-visible:ring-0"
        />
        <Button size={"sm"}>
          Post
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </fieldset>
  );
}
