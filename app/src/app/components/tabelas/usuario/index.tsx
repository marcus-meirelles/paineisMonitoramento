'use client'
import { Usuario } from "@/types/usuario";

export default function TabelaUsuario({usuarios} : {usuarios? : Usuario[]}) {

    
    return (
        <table className="border-separate border-spacing-3 border border-gray-400">
            <caption className="caption-top">
                    Todos os Usuários
            </caption>
            <thead>
                <tr>
                    <th className="border border-gray-300 dark:border-gray-600">Nome</th>
                    <th className="border border-gray-300 dark:border-gray-600">E-mail</th>
                    <th className="border border-gray-300 dark:border-gray-600">Ações</th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios?.map((usuario: Usuario) => (
                        <tr >
                            <td className="border border-gray-300 dark:border-gray-700">{usuario.username}</td>
                            <td className="border border-gray-300 dark:border-gray-700">{usuario.email}</td>
                            <td className="border border-gray-300 dark:border-gray-700">
                                <button >Editar</button><button>Apagar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}