import {JWTPayload} from '../../node_modules/jose/dist/types';
import { NivelPermissao } from './nivelPermissao';

export interface SessionPayload extends JWTPayload{
    userId : string,
    username : string,
    token : string,
    nivelPermissao: NivelPermissao,
    expiresAt: Date,
    isSuperUser: boolean
}