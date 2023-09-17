type Props = {
  children: React.ReactNode
}
export const Main = ({ children }: Props) => {
  return <main className="container mx-auto flex-1 px-4 sm:px-8 md:px-12 lg:px-20">{children}</main>
}
