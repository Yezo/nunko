import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"

type NoDataFoundProps = {
  type: string
}

export const NoDataFound = ({ type }: NoDataFoundProps) => {
  return (
    <section className="grid h-[28rem] place-items-center rounded-md border">
      <div className="flex flex-col items-center">
        <QuestionMarkCircledIcon className="mb-4 h-10 w-10" />
        <h2 className="font-domine text-lg font-medium">There's nothing here!</h2>
        <p className="text-sm text-muted-foreground">
          We couldn't find any {type} for this series.
        </p>
      </div>
    </section>
  )
}
