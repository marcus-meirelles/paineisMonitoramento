import Compromissos from "@/components/dashborads/compromissos";
import { getSession } from '@/lib/session'
import { SessionPayload } from "@/types/sessionPayload";

export default async function PreencheDashboard() {

  const session :SessionPayload = await getSession()

  const response = await fetch("http://127.0.0.1:8000/api/baseCompromissos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${session?.token}`,
    },

  });

  const result = await response.json()

  return (
    <Compromissos data={result} session={session}/>
  )

}
