import { UpdateIcon } from "@radix-ui/react-icons"

export const MiniLoadingWithNoSession = () => {
  return (
    <main className="grid h-[300px] flex-1 place-items-center">
      <UpdateIcon className="h-6 w-6 animate-spin text-muted-foreground" />
    </main>
  )
}
