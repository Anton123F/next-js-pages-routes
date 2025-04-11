import {useRouter} from "next/router";

export default function SelectedClientsProjectPage() {
  const route = useRouter();
  console.log(route.query)
  return <div>
    <h1>A project Page for a specific client</h1>
  </div>
}