import React from "react";
import { getSession } from '@/lib/session'
import Template from "@/components/template";
import { SessionPayload } from "@/types/sessionPayload";
import TabelaUsuario from "@/components/tabelas/usuario";

export default async function pageUsuario() {

    const session :SessionPayload = await getSession()

   const response = await fetch("http://127.0.0.1:8000/api/usuarios/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${session.token}`,
    },

  });

  const result = await response.json()

    return (
        <Template session={session}>
            <TabelaUsuario lista={result} />
        </Template>
    )
}