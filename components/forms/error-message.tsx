import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

type ErrorMessageProps = {
  type: "inUse" | "handling"
}
export const ErrorMessage = ({ type }: ErrorMessageProps) => {
  return (
    <p className="flex min-w-full items-center justify-center gap-2 rounded-md bg-red-600 py-2 text-xs text-white">
      <ExclamationTriangleIcon className="h-[1rem] w-[1rem]" />
      <span className="uppercase tracking-wider ">
        {type === "inUse" && "This username/email is already in use."}
        {type === "handling" && "An error occurred while handling your request."}
      </span>
    </p>
  )
}
