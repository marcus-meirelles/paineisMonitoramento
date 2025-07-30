import { NivelPermissao } from "./nivelPermissao"

export type Painel = {
    id: number,
    nome: string,
    descricao: string,
    nivelPermissao: NivelPermissao,
}