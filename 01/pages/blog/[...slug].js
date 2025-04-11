import {useRouter} from "next/router";

export default function BlogPage() {
  const route = useRouter()

  console.log(route.query);

  return <div>
    <h1>Blog Page</h1>
  </div>

}