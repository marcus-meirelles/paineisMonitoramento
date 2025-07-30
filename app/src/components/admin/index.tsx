'use client'

import { Usuario } from "@/types/usuario"
import TabelaUsuario from "../tabelas/usuario"
import Template from "../template"
import { SessionPayload } from "@/types/sessionPayload"

export default function Admin({session}: {session: SessionPayload }) {

    return (
        <Template session={session}>
            <></>
        </Template>
    )
}
