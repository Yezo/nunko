import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type Props = {
  children: React.ReactNode
  errorPosition: "top" | "bottom"
  title: string
  widthFull?: boolean
}
export const FormFieldItem = ({ children, errorPosition, title, widthFull }: Props) => {
  return (
    <FormItem className={`${widthFull === true && "basis-1/2"}`}>
      <div className="flex min-h-[16px] items-center gap-2 pb-1">
        <FormLabel className="text-sm font-medium text-foreground">{title}</FormLabel>
        {errorPosition === "top" && <FormMessage className="text-xs dark:text-red-600" />}
      </div>
      <FormControl>{children}</FormControl>
      {errorPosition === "bottom" && <FormMessage className="text-xs dark:text-red-600" />}
    </FormItem>
  )
}
