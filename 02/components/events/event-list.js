import EventItem from "./event-item";

import classes from './event-list.module.css';

export default function EventList(props) {
  const {featureEvents} = props
  return <ul className={classes.list}>
    {featureEvents.map(item => <EventItem key={item.id} item={item} />)}
  </ul>
}