'use client'
import { Usuario } from "@/types/usuario";
import { redirect } from 'next/navigation';

export default function TabelaUsuario({ lista, session }: { lista?: Usuario[], session: any }) {

    async function editarUsuario(event: any) {
        event.stopPropagation();
        const linha = event.target.closest('tr');
        const idUsuario = linha.dataset.id;
        redirect(`/usuario/${idUsuario}`)
    }

    if (lista != undefined) {

        return (

            <table className="border-separate border-spacing-3 border border-gray-400">
                <caption className="caption-top">
                    Todos os Usuários
                </caption>
                <thead>
                    <tr>
                        <th className="border border-gray-300 dark:border-gray-600">Username</th>
                        <th className="border border-gray-300 dark:border-gray-600">E-mail</th>
                        <th className="border border-gray-300 dark:border-gray-600">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lista?.map((usuario: Usuario) => (
                            <tr key={usuario.id} data-id={usuario.id}>
                                <td className="border border-gray-300 dark:border-gray-700">{usuario.username}</td>
                                <td className="border border-gray-300 dark:border-gray-700">{usuario.email}</td>
                                <td className="border border-gray-300 dark:border-gray-700">
                                    <button onClick={event => editarUsuario(event)}>Editar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
    else {
        return (<></>)
    }
}