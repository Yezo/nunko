type Props = {
  children: React.ReactNode
}
export const MainContainer = ({ children }: Props) => {
  return (
    <main className="container mx-auto flex-1 space-y-8 px-4 pb-24 pt-8 md:px-20">{children}</main>
  )
}
