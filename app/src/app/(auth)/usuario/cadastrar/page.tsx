import React from "react";
import { getSession } from '@/lib/session'
import Template from "@/components/template";
import { SessionPayload } from "@/types/sessionPayload";
import FormUsuario from "@/components/forms/usuario";

export default async function pageUsuarioCadastro() {

  const session: SessionPayload = await getSession()

  return (
    <Template session={session}>
      <FormUsuario session={session} />
    </Template>
  )
}