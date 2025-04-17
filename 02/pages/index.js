import {getFeaturedEvents} from "../helpers/api-utils";
import EventList from "../components/events/event-list";
import Head from "next/head";

export default function StartPage(props) {
  return <div>
    <Head>
      <title>NextJS App</title>
    </Head>
    <EventList featureEvents={props.featuredEvents} />
  </div>
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents
    },
    revalidate: 600
  }
}