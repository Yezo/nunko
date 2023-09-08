type DetailHeaderProps = {
  title: string
}
export const DetailsHeader = ({ title }: DetailHeaderProps) => {
  return <h2 className="mb-4 text-[15px] font-medium">{title}</h2>
}
