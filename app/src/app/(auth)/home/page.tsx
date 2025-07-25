
import { getSession } from '@/lib/session'
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getSession()
  const isSuperUser = session?.isSuperUser


  if (isSuperUser) {
    redirect('/admin')
  } else {
    redirect('/dashboard')
  }
}
