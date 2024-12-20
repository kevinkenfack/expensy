export default function LoadingCategories() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-2xl bg-white/5 p-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 animate-pulse" />
            <div className="flex-1">
              <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2" />
              <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 