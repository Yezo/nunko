type DetailHeaderProps = {
  title: string
}
export const DetailsHeader = ({ title }: DetailHeaderProps) => {
  return <h2 className="mb-6 text-[15px]">{title}</h2>
}
