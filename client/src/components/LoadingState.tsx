const LOADING_GIF = "https://media.tenor.com/uRlxzRNgp2MAAAAj/anime-girl.gif";

export default function LoadingState({ label: _label = "Loading" }: { label?: string }) {
  return <div className="flex min-h-[280px] items-center justify-center py-16" role="status" aria-label={_label}><img src={LOADING_GIF} alt="" className="h-44 w-44 object-contain sm:h-56 sm:w-56" /></div>;
}
