import { NivelPermissao } from "./nivelPermissao"

export type Painel = {
    id: number,
    username: string,
    descricao: string,
    nivelPermissao: NivelPermissao,
}