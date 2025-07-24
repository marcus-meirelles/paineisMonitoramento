import { getSession } from '@/lib/session'
import Dashboard from "@/app/components/dashborad";

export default async function PreencheDashboard() {

    const session = await getSession()
    const token = session?.token

  const response = await fetch("http://127.0.0.1:8000/api/baseCompromissos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },

  });

  const result = await response.json()
  
  return (
    <Dashboard data = { result } />
  )

}
