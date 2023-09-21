import { IndividualLinksHeader } from "@/components/shared/individual-links-header"
import { Suspense } from "react"
import { Loading } from "@/components/ui/loading"
import { getIndividualAnime, handleResponseError } from "@/lib/fetchJikan"
import { AnimeDetailsContainer } from "@/components/anime/single/details/details-container"
import { FeatureContainer } from "@/components/anime/single/features/anime-feature-container"
import { Main } from "@/components/layout/main"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { editAnimeStatus } from "@/lib/actions/anime-entry/editAnimeStatus"
import Image from "next/image"
import { Dummy } from "@/components/dummy"
import { IAnimes } from "@/app/anime/[id]/layout"

//website.com/[username]/animelist
// grab the username params
//fetch the url using the username since its unique
// the fetch route should take in the username and find all anime entries that match the username
// should rework the animemodel to take in more stuff like episodes, airing, airingstatus, and username

//feed
//feed should be taking in anime and manga entries from all users
// it should search both collections

async function fetchUserAnimes(id: string | undefined): Promise<IAnimes> {
  const url = `http://nunko-amber.vercel.app/api/animes/${id}`
  const res = await fetch(url)
  handleResponseError(res)
  return res.json()
}

export default async function UserAnimeListPage({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions)
  const { animes } = await fetchUserAnimes(session?.user?.id)

  return (
    <Main>
      <Dummy data={animes} />
      <section>
        {animes.map((item) => (
          <div key={item.mal_id}>{item.title}</div>
        ))}
      </section>
    </Main>
  )
}
