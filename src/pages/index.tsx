import React, { useState } from "react"
import { type NextPage, type GetServerSidePropsContext, type InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { useQuery } from "react-query"
import { searchEvents } from "../api"
import { type FetchedData, type Event } from "types"
import Header from "../components/header"
import EventCard from "../components/eventCard"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const keyword = context.query.keyword 

  if (typeof keyword !== "string" || !keyword) {
    return { props: { fetchedData: null } }
  }

  try {
    const fetchedData: FetchedData = await searchEvents(keyword)
    return { props: {
      fetchedData
    } }
  } catch (error) {
    console.error("Error fetching events:", error)
    return { props: { fetchedData: null } }
  }
}

type HomeProps = InferGetServerSidePropsType<typeof getServerSideProps>

const Home: NextPage<HomeProps> = ({fetchedData}) => {

  const router = useRouter()
  const keywordParam: string | null = typeof router.query.keyword === 'string' ? router.query.keyword : null

  const [keyword, setKeyword] = useState<string | null>(keywordParam)
  const [inputValue, setInputValue] = useState<string | null>('')

  const { data, status } = useQuery(
    ["search", keyword],
    () => searchEvents(keyword),
    {
      initialData: fetchedData,
      enabled: !!keyword,
    }
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setKeyword(inputValue)
    if (inputValue) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, keyword: inputValue },
      })
    }
  }

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    setInputValue(event.target.value)
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "error") {
    return <div>Error finding events</div>
  }

  return (
    <>
      <Head>
        <title>Skiddle Test</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-100 min-h-[100vh]">
          <Header />

          <div className="bg-brand flex justify-center p-4 pb-6">
            <form className="w-full max-w-[600px]" onSubmit={handleSubmit}>
              <input
                className="w-full text-center py-2 px-4 rounded"
                type="text"
                onChange={handleOnChange}
                placeholder="search for events"
              />
            </form>
          </div>

          <div className="py-8 px-4 w-full max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {data &&
  data.results.map((event:Event) => <EventCard key={event.id} event={event} keyword={keyword} />)}
            </div>
          </div>
      </main>
    </>
  )
}

export default Home