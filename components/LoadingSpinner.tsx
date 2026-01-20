export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
