import {getEventById, getFeaturedEvents} from "../../helpers/api-utils";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";

export default function EventDetailPage(props) {
  const event = props.selectedEvent

  if (!event) {
    return <p className='center'>Loading...</p>
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

export async function getStaticProps(context) {
  const eventId = context.params.id;
  const selectedEvent = await getEventById(eventId);
  return {
    props: {
      selectedEvent
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({params: {id: event.id}}))
  return {
    paths,
    fallback: 'blocking'
  }
}