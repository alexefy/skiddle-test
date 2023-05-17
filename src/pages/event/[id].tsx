import React from "react"
import { type NextPage, type GetServerSidePropsContext, type InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import Link from "next/link";
import { useQuery } from "react-query"
import { fetchEvent } from "../../api"
import { type EventDetail, type Artist } from "types"
import Header from "../../components/header"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const eventId = context.query.id 

  try {
    const fetchedData: EventDetail = await fetchEvent(eventId)
    return { props: {
      fetchedData
    } }
  } catch (error) {
    console.error("Error fetching events:", error)
    return { props: { fetchedData: null } }
  }
}

type EventPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Event: NextPage<EventPageProps> = ({fetchedData}) => {
  const router = useRouter()
  const { id, keyword } = router.query

  const { data, status } = useQuery(["events", id], () => fetchEvent(id), {
    initialData: fetchedData,
    enabled: !!id,
  });

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "error") {
    return <div>Error finding events</div>
  }

  const {
    id: eventId,
    eventname,
    venue,
    date,
    MinAge,
    artists,
    imageurl,
  }: EventDetail = data.results

  console.log(artists)

  return (
    <>
      <main className="min-h-[100vh] bg-gray-100">
        <Header />
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div>
            <Link href={`/?keyword=${keyword}`}>Back to search</Link>
            {data?.results && (
              <>
                <div key={eventId}>
                  <img src={imageurl} alt={eventname} />
                  <p>{eventname}</p>
                  <p>{venue.name}</p>
                  <p>{venue.town}</p>
                  <p>{date}</p>
                  <p>{MinAge}</p>

                  {artists?.length > 0 &&
                    artists.map((artist: Artist) => (
                      <div key={artist.artistid}>
                        <Link
                          href={`/artist/${artist.artistid}?eventId=${eventId}&keyword=${keyword}`}
                        >
                          {artist.name}
                        </Link>
                      </div>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Event
