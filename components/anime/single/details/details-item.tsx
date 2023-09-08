import { Demographic } from "@/types/anime/type-anime"

type DetailItemProps = {
  data: string | number | Demographic[] | null
  title: string
}

export const DetailItem = ({ data, title }: DetailItemProps) => {
  const dataIsAString = typeof data === "string"
  const dataIsANumber = typeof data === "number"
  const dataIsAnArray = Array.isArray(data)

  return (
    <>
      {!data ? null : null}

      {dataIsAString ? <Item title={title}>{data}</Item> : null}

      {dataIsANumber && data > 0 ? (
        <Item title={title}>
          {title === "Rank" || title === "Popularity"
            ? `#${data.toLocaleString("en-US")}`
            : data.toLocaleString("en-US")}
        </Item>
      ) : null}

      {dataIsAnArray && data.length > 0 ? (
        <Item title={title}>
          {data.map((item, index) => (
            <div key={index}>{item.name}</div>
          ))}
        </Item>
      ) : null}
    </>
  )
}

const Item = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="px-6">
      <div className="font-medium">{title}</div>
      <div className="capitalize text-muted-foreground">{children}</div>
    </div>
  )
}
