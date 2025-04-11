import {useRouter} from "next/router";

export default function PortfolioProjectPage() {
  const route = useRouter();

  console.log(route.pathname);
  console.log(route.query);

  return <div>
    <h1>Portfolio project Page</h1>
  </div>
}