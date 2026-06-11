import Emoji from "#/components/emoji/emoji-btn";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { createCommentFormSchema, type TCreateCommentSchema } from "./schema";
import { useCreateCommentMutation } from "./mutation";
import { Loader2 } from "lucide-react";
import { useReplyStore } from "#/stores/useReplyStore";

type Props = {
  postId: string;
};

export default function CommentForm({ postId }: Props) {
  const { mutateAsync, isPending } = useCreateCommentMutation();

  const { getValues, setValue, reset, watch, register, handleSubmit } =
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

  const commentValue = watch("comment");
  const target = useReplyStore((state) => state.target);
  const clearTarget = useReplyStore((state) => state.clearTarget);

  // Ref untuk menyimpan target sebelumnya
  const prevTargetRef = useRef(target);

  useEffect(() => {
    // JIKA TARGET BERUBAH (dari null ke ada, atau dari user A ke user B)
    if (target && target !== prevTargetRef.current) {
      setValue("comment", `@${target.username} `, { shouldDirty: true });
      inputRef.current?.focus();
    }
    // JIKA USER MENGHAPUS INPUT SAMPAI KOSONG
    else if (commentValue === "" && target) {
      clearTarget();
    }
    // Selalu update target sebelumnya di akhir efek
    prevTargetRef.current = target;
  }, [target, commentValue, clearTarget, setValue]);

  const onSubmit = async (data: TCreateCommentSchema) => {
    try {
      await mutateAsync({
        comment: data.comment,
        postId: postId,
        commentParentId: target?.commentId,
      });
      clearTarget();
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
        <Button type="submit" size={"sm"}>
          Post
          {isPending && <Loader2 className="animate-spin" />}
        </Button>
      </form>
    </fieldset>
  );
}
