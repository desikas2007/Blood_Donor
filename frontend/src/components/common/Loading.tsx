export default function Loading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-8 h-8 border-2 border-border border-t-red-600 rounded-full animate-spin" />
      <p className="mt-3 text-[13px] text-muted">{message}</p>
    </div>
  );
}
