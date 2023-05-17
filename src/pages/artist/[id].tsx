import React from "react"
import { type NextPage, type GetServerSidePropsContext, type InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import Link from 'next/link'
import { useQuery } from "react-query"
import { fetchArtist } from "../../api"
import { type Artist } from "types"
import Header from "../../components/header"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const artistId = context.query.id 

  try {
    const fetchedData: Artist = await fetchArtist(artistId)
    return { props: {
      fetchedData
    } }
  } catch (error) {
    console.error("Error fetching events:", error)
    return { props: { fetchedData: null } }
  }
}

type ArtistPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Artist: NextPage<ArtistPageProps> = ({fetchedData}) => {
  const router = useRouter()
  const { id, eventId, keyword } = router.query

  const { data, status } = useQuery(
    ["artist", id],
    () => fetchArtist(id),
    {
      initialData: fetchedData,
      enabled: !!id,
    }
  )

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "error") {
    return <div>Error finding events</div>
  }

  const { name, imageurl, description }: Artist = data.results

  return (
    <>
      <main className="bg-gray-100 min-h-[100vh]">
          <Header />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div>
            <Link href={`/event/${eventId}?keyword=${keyword}`}>Back to Event</Link>
            {data && (
              <div>
                <img src={imageurl} alt={`picture of ${name}`}/>
                <p>{name}</p>
                <p>{description}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Artist
