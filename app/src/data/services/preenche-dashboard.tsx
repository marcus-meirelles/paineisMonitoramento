import Dashboard from "@/components/dashborad";
import { getSession } from '@/lib/session'

export default async function PreencheDashboard() {

  const session = await getSession()

  const response = await fetch("http://127.0.0.1:8000/api/baseCompromissos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${session?.token}`,
    },

  });

  const result = await response.json()

  return (
    <Dashboard data={result} />
  )

}
