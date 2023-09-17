import { UpdateIcon } from "@radix-ui/react-icons"

export const MiniLoadingWithSession = () => {
  return (
    <main className="grid h-[350px] flex-1 place-items-center">
      <UpdateIcon className="h-6 w-6 animate-spin text-muted-foreground" />
    </main>
  )
}
