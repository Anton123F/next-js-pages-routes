import {getFeaturedEvents} from "../helpers/api-utils";
import EventList from "../components/events/event-list";

export default function StartPage(props) {
  return <div>
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