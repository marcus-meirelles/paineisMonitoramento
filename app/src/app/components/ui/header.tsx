'use client'
import { logoutAction } from "@/app/data/actions/auth-actions";
import { NavLink } from '@mantine/core';
import { IconHome2, IconTicket, IconLogout2} from '@tabler/icons-react';


export default function Header(){
  return (
    <header className="w-screen bg-blue-600 text-white h-10">
            <nav>
                <ul className='flex justify-end justify-items-center gap-4 mr-4'>
                    <i><NavLink
                        href={``}
                        label="Atendimentos"
                        leftSection={<IconTicket size={16} stroke={1.5} />} 
                    /></i>
                    <i><NavLink
                        href={``}
                        label="Perfil"
                        leftSection={<IconHome2 size={16} stroke={1.5} />} 
                    /></i>
                    <i><NavLink
                        href={"/"}
                        label="Sair"
                        onClick={event => logoutAction()}
                        leftSection={<IconLogout2 size={16} stroke={1.5} />} 
                    /></i>
                </ul>
            </nav>
        </header>
  );
}