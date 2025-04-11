import {useRouter} from "next/router";
import {getEventById} from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

export default function EventDetailPage() {
  const route = useRouter();
  const id = route.query.id;
  const event = getEventById(id);

  if (!event) {
    return <p>Event not found</p>
  }


  return <>
    <EventSummary title={event.title}/>
    <EventLogistics
      date={event.date}
      address={event.location}
      image={event.image}
      imageAlt={event.title}
    />
    <EventContent>
      <p>{event.description}</p>
    </EventContent>
  </>
}