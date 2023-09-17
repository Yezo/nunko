import { UpdateIcon } from "@radix-ui/react-icons"

export const FullscreenLoadingWithNoSession = () => {
  return (
    <main className="grid h-[calc(100vh-80px)] flex-1 place-items-center">
      <UpdateIcon className="h-8 w-8 animate-spin text-muted-foreground" />
    </main>
  )
}
