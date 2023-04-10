export interface AvatarProps {
  src: string;
  alt?: string;
}

export function Avatar({ src, alt }: AvatarProps) {
  return src ? (
    <img src={src} alt={alt} className="w-20 h-20 rounded-md" />
  ) : (
    <div className="w-20 h-20 rounded-md bg-slate-700 flex justify-center items-center text-center text-sm">
      No photo available
    </div>
  );
}
