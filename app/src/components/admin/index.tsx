'use client'

import { Usuario } from "@/types/usuario"
import TabelaUsuario from "../tabelas/usuario"
import Template from "../template"

export default function Admin({ lista }: { lista?: Usuario[] }) {

    return (
        <Template>
            <TabelaUsuario lista={lista} />
        </Template>
    )
}
