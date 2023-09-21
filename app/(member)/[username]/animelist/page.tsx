import { handleResponseError } from "@/lib/fetchJikan"
import { Main } from "@/components/layout/main"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { editAnimeStatus } from "@/lib/actions/anime-entry/editAnimeStatus"
import Image from "next/image"
import { Dummy } from "@/components/dummy"
import { IAnimes } from "@/app/anime/[id]/layout"

//feed
//feed should be taking in anime and manga entries from all users
// it should search both collections

async function fetchUserAnimes(username: string | undefined): Promise<IAnimes> {
  //   const url = `http://nunko-amber.vercel.app/api/animes/${id}`
  const url = `http://localhost:3000/api/user/animelist/${username}`
  const res = await fetch(url)
  handleResponseError(res)
  return res.json()
}

export default async function UsernameAnimeListPage({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions)
  const DATA = await fetchUserAnimes(params.username)

  return (
    <Main>
      <Dummy data={DATA} />
      <section>
        {/* {animes.map((item) => (
          <div key={item.mal_id}>{item.title}</div>
        ))} */}
      </section>
    </Main>
  )
}
