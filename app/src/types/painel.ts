import { NivelPermissao } from "./nivelPermissao"

export type Painel = {
    id: Number,
    username: string,
    descricao: string,
    nivelPermissao: NivelPermissao,
}