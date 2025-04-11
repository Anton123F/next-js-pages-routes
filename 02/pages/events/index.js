import {getAllEvents} from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import {useRouter} from "next/router";

export default function AllEventsPage() {
  const events = getAllEvents();
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