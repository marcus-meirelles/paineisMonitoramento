'use client'
import { NivelPermissao } from "@/types/nivelPermissao";
import { redirect } from 'next/navigation';
import { ActionIcon, Button, Group, Table } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { Painel } from "@/types/painel";
import { IconBrowserPlus } from '@tabler/icons-react';

export default function TabelaPainel({ lista }: { lista: Painel[] }) {

    const rows = lista?.map((element, key) => (
        <Table.Tr key={element.id} data-id={element.id}>
            <Table.Td>{element.id}</Table.Td>
            <Table.Td>{element.nome}</Table.Td>
            <Table.Td>{element.descricao}</Table.Td>
            <Table.Td>{NivelPermissao[element.nivelPermissao + 1]}</Table.Td>
            {<Table.Td>{<ActionIcon size={30} onClick={event => editarPainel(event)} title='Editar Painel'>
                <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>}</Table.Td>}
        </Table.Tr>
    ));

    async function editarPainel(event: any) {
        event.stopPropagation();
        const linha = event.target.closest('tr');
        const id = linha.dataset.id;
        redirect(`/painel/${id}`)
    }

    async function cadastrarPainel(event: any) {
        event.stopPropagation();
        redirect("/painel/cadastrar")
    }

    if (lista != undefined) {

        return (
            <div>
                <Table striped highlightOnHover withTableBorder withColumnBorders >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Nome</Table.Th>
                            <Table.Th>Descrição</Table.Th>
                            <Table.Th>Nível Permissão</Table.Th>
                            <Table.Th>Ação</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
                <Group justify="flex-end" mt="md">
                    <Button leftSection={<IconBrowserPlus size={16} stroke={1.5} />} onClick={event => cadastrarPainel(event)}>Cadastrar</Button>
                </Group>
            </div>
        )
    }
    else {
        return (<></>)
    }
}