import { LoaderCircle } from "lucide-react";

export default function LoadingState({ label = "Loading" }: { label?: string }) {
  return <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 py-16" role="status" aria-live="polite"><div className="relative grid h-14 w-14 place-items-center"><span className="absolute inset-0 rounded-full border-2 border-[#a5f3fc]/15" /><span className="absolute inset-0 animate-ping rounded-full border border-[#a5f3fc]/20" /><LoaderCircle className="animate-spin text-[#a5f3fc]" size={30} strokeWidth={1.8} /></div><div className="text-center"><p className="text-sm font-semibold text-white/75">{label}</p><div className="mx-auto mt-2 flex gap-1"><span className="h-1 w-1 animate-bounce rounded-full bg-[#a5f3fc] [animation-delay:-.2s]" /><span className="h-1 w-1 animate-bounce rounded-full bg-[#a5f3fc] [animation-delay:-.1s]" /><span className="h-1 w-1 animate-bounce rounded-full bg-[#a5f3fc]" /></div></div></div>;
}
