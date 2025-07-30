'use client'

import { logoutAction } from "@/data/actions/auth-actions";
import { SessionPayload } from "@/types/sessionPayload";
import { NavLink } from '@mantine/core';
import { IconRefresh, IconLogout2, IconHome } from '@tabler/icons-react';


export default function Header(parm: { session: SessionPayload }) {

    async function logout(event: any) {
        event.preventDefault()
        await logoutAction()
    }

    return (
        <header className="w-screen bg-blue-600 text-white h-10">
            <nav>
                <ul className='flex justify-end justify-items-center gap-4 mr-4'>
                    <i className="mt-2">Bem vindo, {parm.session.username} !</i>
{/*                     <i><NavLink
                        href={''}
                        label="Atualizar Dashboard"
                        onClick={event => atualizaBase(event)}
                        leftSection={<IconRefresh size={16} stroke={1.5} />}
                    /></i> */}
                    {<i><NavLink
                        href={'/home'}
                        label="Home"
                        leftSection={<IconHome size={16} stroke={1.5} />}
                    /></i>}
                    <i><NavLink
                        href={''}
                        label="Sair"
                        onClick={event => logout(event)}
                        leftSection={<IconLogout2 size={16} stroke={1.5} />}
                    /></i>
                </ul>
            </nav>
        </header>
    );
}