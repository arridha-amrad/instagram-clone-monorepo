type Props = {
  authorUsername?: string;
  timeAgo?: string;
  caption?: string;
};

export default function Caption({ authorUsername, timeAgo, caption }: Props) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm">
        <span className="mr-2 font-bold">{authorUsername}</span>
        <span>{caption}</span>
      </p>
      <p className="text-[10px] font-medium text-muted-foreground uppercase">
        {timeAgo}
      </p>
    </div>
  );
}
