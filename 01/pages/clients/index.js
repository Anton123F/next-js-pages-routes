import Link from "next/link";

export default function ClientsPage() {
  const clients = [
    {id: "max", name: 'Maximilian'},
    {id: "menu", name: 'Menual'}
  ];
  return <div>
    <h1>Clients Page</h1>
    <ul>
      {clients.map(client => <li key={client.id}><Link href={`/clients/${client.id}`}>{client.name}</Link></li>)}
    </ul>
  </div>
}