import { UpdateIcon } from "@radix-ui/react-icons"

export const FullscreenLoadingWithSession = () => {
  return (
    <main className="grid min-h-screen flex-1 place-items-center">
      <UpdateIcon className="h-6 w-6 animate-spin text-muted-foreground" />
    </main>
  )
}
