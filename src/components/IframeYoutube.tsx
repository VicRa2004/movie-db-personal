function toYoutubeEmbed(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/,
  )
  return match ? `https://www.youtube.com/embed/${match[1]}` : null
}

interface IframeYoutubeProps {
  urlYoutube: string
  className?: string
}

export const IframeYoutube = ({
  urlYoutube,
  className = '',
}: IframeYoutubeProps) => {
  const src = toYoutubeEmbed(urlYoutube)
  if (!src) return null

  return (
    <iframe
      className={`aspect-video border-0 ${className}`}
      src={src}
      title="YouTube video player"
      allowFullScreen
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    />
  )
}
