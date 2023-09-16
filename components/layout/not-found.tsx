"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const NotFoundRedirect = () => {
  const router = useRouter()

  useEffect(() => {
    //The url below is wherever you want to redirect the user to
    //Caution: it'll cause infinite redirects if you redirect to a place that redirects
    router.push("/")
  }, [router])

  return <></>
}
