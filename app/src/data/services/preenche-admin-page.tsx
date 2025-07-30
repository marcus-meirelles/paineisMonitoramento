import { getSession } from '@/lib/session'
import TabelaUsuario from '@/components/tabelas/usuario';
import Admin from '@/components/admin';
import { SessionPayload } from '@/types/sessionPayload'

export default async function PreencheAdminPage() {

  const session :SessionPayload = await getSession()
  const token = session?.token

/*   const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },

  });

  const result = await response.json() */

  return (
    <Admin session={session} />
  )

}
