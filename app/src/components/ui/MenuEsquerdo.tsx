'use client'

import { NivelPermissao } from '@/types/nivelPermissao';
import { SessionPayload } from '@/types/sessionPayload';
import { NavLink } from '@mantine/core';
import { IconChartBar, IconCalendarCheck, IconBuildingCommunity, IconUsers } from '@tabler/icons-react';

export default function MenuEsquerdo(parm: { session: SessionPayload }) {

  const nivelPermissao = parm.session.nivelPermissao != null ? parm.session.nivelPermissao : 0

  if (parm.session.isSuperUser) {
    return (
      <>
        <NavLink href="#required-for-focus" label="Paineis" leftSection={<IconChartBar size={16} stroke={1.5} />} childrenOffset={10}>
          <NavLink label="Compromissos" href="/compromissos" leftSection={<IconCalendarCheck size={16} stroke={1.5} />} />
          <NavLink label="Obras e Convenios" href="/obras-e-convenios" leftSection={<IconBuildingCommunity size={16} stroke={1.5} />} />
        </NavLink>
        <NavLink href="/usuario" label="Usuários" leftSection={<IconUsers size={16} stroke={1.5} />} childrenOffset={10}/>
        <NavLink href="/painel" label="Painéis" leftSection={<IconUsers size={16} stroke={1.5} />} childrenOffset={10}/>
      </>
    );
  }
  else if (nivelPermissao == NivelPermissao.ALTO) {
    return (
      <>
        <NavLink href="#required-for-focus" label="Paineis" leftSection={<IconChartBar size={16} stroke={1.5} />} childrenOffset={10}>
          <NavLink label="Compromissos" href="/compromissos" leftSection={<IconCalendarCheck size={16} stroke={1.5} />} />
          <NavLink label="Obras e Convenios" href="/obras-e-convenios" leftSection={<IconBuildingCommunity size={16} stroke={1.5} />} />
        </NavLink>
      </>
    );
  }
  else if (nivelPermissao == NivelPermissao.MEDIO) {
    return (
      <>
        <NavLink href="#required-for-focus" label="Paineis" leftSection={<IconChartBar size={16} stroke={1.5} />} childrenOffset={10}>
          <NavLink label="Obras e Convenios" href="/obras-e-convenios" leftSection={<IconBuildingCommunity size={16} stroke={1.5} />} />
        </NavLink>
      </>
    );
  }
  else if (nivelPermissao == NivelPermissao.BAIXO) {
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