type DetailHeaderProps = {
  title: string
}
export const DetailsHeader = ({ title }: DetailHeaderProps) => {
  return <h2 className="mb-4 text-[15px]">{title}</h2>
}
