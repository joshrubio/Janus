import { initials, avatarHue } from "@/lib/pipelines";

export default function Avatar({ name }: { name: string }) {
  const hue = avatarHue(name);
  return (
    <span
      className="inline-flex items-center justify-center size-5 rounded-full text-[10px] font-medium shrink-0"
      style={{
        backgroundColor: `oklch(0.3 0.08 ${hue})`,
        color: `oklch(0.88 0.06 ${hue})`,
      }}
      title={name}
    >
      {initials(name)}
    </span>
  );
}
