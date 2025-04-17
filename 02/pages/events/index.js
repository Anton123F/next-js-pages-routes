import {getAllEvents} from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import {useRouter} from "next/router";

export default function AllEventsPage(props) {
  const events = props.allEvents;
  const route = useRouter();
  const findEventsHandler = function(year, month) {
    const path = `/events/${year}/${month}/`
    route.push(path);
  }

  return <>
    <EventsSearch onSearch={findEventsHandler} />
    <EventList featureEvents={events} ></EventList>
  </>
}

export async function getStaticProps() {
  const allEvents = await getAllEvents();

  return {
    props: {
      allEvents
    },
    revalidate: 60
  }
}