import React from "react";
import { getSession } from '@/lib/session'
import Template from "@/components/template";
import { SessionPayload } from "@/types/sessionPayload";
import FormPainel from "@/components/forms/painel";

export default async function pagePainelCadastro() {

  const session: SessionPayload = await getSession()

  return (
    <Template session={session}>
      <FormPainel session={session} />
    </Template>
  )
}