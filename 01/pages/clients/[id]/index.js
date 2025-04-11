import {useRouter} from "next/router";

export default function ClientsProject() {
  const route = useRouter();

  const bthClickHandler = () => {
    route.push('/clients/max/projectA');
  }

  return <div>
    <h1>Clients Project</h1>
    <button onClick={bthClickHandler}>Go to a project A</button>
  </div>
}