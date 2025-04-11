import Link from "next/link";
import classes from './button.module.css';

export default function Button(props) {
  if (props.href) {
    return <Link className={classes.btn} href={props.href}>{props.children}</Link>
  }

  return <button className={classes.btn} onClick={props.onClick}>{props.children}</button>
}