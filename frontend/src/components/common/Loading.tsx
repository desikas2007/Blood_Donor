export default function Loading({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary-200 border-t-primary-600" />
      <p className="mt-3 text-sm text-gray-500">{message}</p>
    </div>
  );
}
