import { Sidebar } from "@/components/navbar/sidebar/sidebar"
import { UpdateIcon } from "@radix-ui/react-icons"

export default function Loading() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="grid min-h-screen flex-1 place-items-center">
        <UpdateIcon className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    </div>
  )
}
