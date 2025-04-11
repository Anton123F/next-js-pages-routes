import {getFeaturedEvents} from "../dummy-data";
import EventList from "../components/events/event-list";

export default function StartPage() {
  const featureEvents = getFeaturedEvents();

  return <div>
    <EventList featureEvents={featureEvents} />
  </div>
}