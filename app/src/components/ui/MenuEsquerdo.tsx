'use client'

import { NivelPermissao } from '@/types/nivelPermissao';
import { SessionPayload } from '@/types/sessionPayload';
import { NavLink } from '@mantine/core';
import { IconChartBar, IconChartLine, IconCalendarCheck, IconBuildingCommunity, IconList, IconUser, IconUserPlus, IconBrowserPlus } from '@tabler/icons-react';

export default function MenuEsquerdo(parm: { session: SessionPayload }) {

  const nivelPermissao = parm.session.nivelPermissao != null ? parm.session.nivelPermissao : 0

  if (parm.session.isSuperUser) {
    return (
      <>
        <NavLink href="#" label="Dashboards" leftSection={<IconChartLine size={16} stroke={1.5} />} childrenOffset={10}>
          <NavLink label="Compromissos" href="/compromissos" leftSection={<IconCalendarCheck size={16} stroke={1.5} />} />
          <NavLink label="Obras e Convenios" href="/obras-e-convenios" leftSection={<IconBuildingCommunity size={16} stroke={1.5} />} />
        </NavLink>
        <NavLink href="#" label="Usuários" leftSection={<IconUser size={16} stroke={1.5} />} childrenOffset={10}>
          <NavLink href="/usuario" label="Listar" leftSection={<IconList size={16} stroke={1.5} />} childrenOffset={10}/>
          <NavLink href="/usuario/cadastrar" label="Cadastrar" leftSection={<IconUserPlus size={16} stroke={1.5} />} />
        </NavLink>
        <NavLink href="#" label="Painéis" leftSection={<IconChartBar size={16} stroke={1.5} />} childrenOffset={10}>
          <NavLink href="/painel" label="Listar" leftSection={<IconList size={16} stroke={1.5} />} childrenOffset={10}/>
          <NavLink href="/painel/cadastrar" label="Cadastrar" leftSection={<IconBrowserPlus size={16} stroke={1.5} />} />
        </NavLink>
      </>
    );
  }
  else if (nivelPermissao == NivelPermissao.ALTO) {
    return (
      <>
        <NavLink href="#required-for-focus" label="Paineis" leftSection={<IconChartBar size={16} stroke={1.5} />} >
          <NavLink label="Compromissos" href="/compromissos" leftSection={<IconCalendarCheck size={16} stroke={1.5} />} />
          <NavLink label="Obras e Convenios" href="/obras-e-convenios" leftSection={<IconBuildingCommunity size={16} stroke={1.5} />} />
        </NavLink>
      </>
    );
  }
  else if (nivelPermissao == NivelPermissao.MEDIO) {
    return (
      <>
        <NavLink href="#required-for-focus" label="Paineis" leftSection={<IconChartBar size={16} stroke={1.5} />} >
          <NavLink label="Obras e Convenios" href="/obras-e-convenios" leftSection={<IconBuildingCommunity size={16} stroke={1.5} />} />
        </NavLink>
      </>
    );
  }
  else if (nivelPermissao == NivelPermissao.BAIXO) {
    return (
      <>
        <NavLink href="#required-for-focus" label="Paineis" leftSection={<IconChartBar size={16} stroke={1.5} />} >
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