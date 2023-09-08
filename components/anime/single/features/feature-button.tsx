type AnimeListFeatureButtonProps = {
  children: React.ReactNode
  title: string
}
export const AnimeListFeatureButton = ({ children, title }: AnimeListFeatureButtonProps) => {
  return (
    <div className="space-y-2">
      <button className="mx-auto rounded-lg border px-6 py-2 shadow-sm transition-colors duration-300 hover:bg-accent  md:px-8 md:py-3.5">
        {children}
      </button>
      <p className="text-center text-xs text-muted-foreground">{title}</p>
    </div>
  )
}
