import {useRouter} from "next/router";
import {getFilteredEvents} from "../../helpers/api-utils";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEventsPage(props) {
  const router = useRouter();
  // const filters = router.query.slug;

  // if (!filters) {
  //   return <p className='center'>Loading...</p>
  // }

  // const year = +filters[0];
  // const month = +filters[1];

  if (props.hasError) {
    return <>
      <ErrorAlert>
        <p>Invalid filter. Please adjust your values</p>
      </ErrorAlert>
      <div className='center'>
        <Button href='/events'>Show All Events</Button>
      </div>
    </>
  }

  const filteredEvents = props.filteredEvents;

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

  const {year, month} = props.date;

  const date = new Date(year, month - 1);

  return <>
    <ResultsTitle date={date}/>
    <EventList featureEvents={filteredEvents}/>
  </>
}

export async function getServerSideProps(context) {
  const {params} = context;
  const year = +params.slug[0];
  const month = +params.slug[1];

  if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
    return {
      props: {hasError: true}
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    }
  }

  const filteredEvents = await getFilteredEvents({
    year,
    month
  })

  return {
    props: {
      filteredEvents,
      date: {
        year,
        month
      }
    }
  }
}