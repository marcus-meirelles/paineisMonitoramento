'use client'

import { SessionPayload } from '@/types/sessionPayload';
import { NavLink } from '@mantine/core';
import { IconChartBar, IconCalendarCheck, IconBuildingCommunity, IconUsers } from '@tabler/icons-react';

export default function MenuEsquerdo(parm: { session: SessionPayload }) {

  const nivelPermissao = parm.session.nivelPermissao != null ? parm.session.nivelPermissao : 0


  if(parm.session.isSuperUser){
    return (
      <>
        <NavLink href="#required-for-focus" label="Paineis" leftSection={<IconChartBar size={16} stroke={1.5} />} childrenOffset={10}>
          <NavLink label="Compromissos" href="/compromissos" leftSection={<IconCalendarCheck size={16} stroke={1.5} />} />
          <NavLink label="Obras e Convenios" href="/obras-e-convenios" leftSection={<IconBuildingCommunity size={16} stroke={1.5} />} />
        </NavLink>
        <NavLink href="/admin" label="Usuários" leftSection={<IconUsers size={16} stroke={1.5} />} childrenOffset={10}>
        </NavLink>
      </>
    );
  }
  else if (nivelPermissao == 3) {
    return (
      <>
        <NavLink href="#required-for-focus" label="Paineis" leftSection={<IconChartBar size={16} stroke={1.5} />} childrenOffset={10}>
          <NavLink label="Compromissos" href="/compromissos" leftSection={<IconCalendarCheck size={16} stroke={1.5} />} />
          <NavLink label="Obras e Convenios" href="/obras-e-convenios" leftSection={<IconBuildingCommunity size={16} stroke={1.5} />} />
        </NavLink>
      </>
    );
  }
  else if (nivelPermissao == 2) {
    return (
      <>
        <NavLink href="#required-for-focus" label="Paineis" leftSection={<IconChartBar size={16} stroke={1.5} />} childrenOffset={10}>
          <NavLink label="Obras e Convenios" href="/obras-e-convenios" leftSection={<IconBuildingCommunity size={16} stroke={1.5} />} />
        </NavLink>
      </>
    );
  }
  else if (nivelPermissao == 1) {
    return (
      <>
        <NavLink href="#required-for-focus" label="Paineis" leftSection={<IconChartBar size={16} stroke={1.5} />} childrenOffset={10}>
          <NavLink label="Obras e Convenios" href="/obras-e-convenios" leftSection={<IconBuildingCommunity size={16} stroke={1.5} />} />
        </NavLink>
      </>
    );
  }
  else {
    return (
      <>
        
      </>
    );
  }
}