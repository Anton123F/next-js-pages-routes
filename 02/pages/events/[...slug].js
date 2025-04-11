import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filters = router.query.slug;

  if (!filters) {
    return <p className='center'>Loading...</p>
  }

  const year = +filters[0];
  const month = +filters[1];

  if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
    return <>
      <ErrorAlert>
        <p>Invalid filter. Please adjust your values</p>
      </ErrorAlert>
      <div className='center'>
        <Button href='/events'>Show All Events</Button>
      </div>
    </>
  }

  const filteredEvents = getFilteredEvents({
    year,
    month
  })

  if (!filteredEvents || filteredEvents.length === 0) {
    return <>
      <ErrorAlert>
        <p>No events found for the chosen events</p>
      </ErrorAlert>
      <div className='center'>
        <Button href='/events'>Show All Events</Button>
      </div>
    </>
  }

  const date = new Date(year, month - 1);

  return <>
    <ResultsTitle date={date}/>
    <EventList featureEvents={filteredEvents}/>
  </>
}