"use server";

import { registerUserService, loginUserService, logoutUserService } from "@/data/services/auth-service";
import { redirect } from "next/navigation";
import atualizaDadosBaseCompromissos from "../services/atualiza-base-compromissos";
import { createSession, deleteSession} from '@/lib/session'
import {LoginUserProps} from "@/types/loginUserProps"
import {RegisterUserProps}  from "@/types/registerUserProps"

export async function registerUserAction(userData: RegisterUserProps) {

  const responseData = await registerUserService(userData);

  if (!responseData) {
    return {
      error: true,
      message: "Ops! Algo deu errado."
    };
  }

  if (responseData.error) {
    return {
      error: true,
      message: "Falha no registro."
    };
  }

  redirect("/login");
}


export async function loginUserAction(userData: LoginUserProps) {

  const resp = await loginUserService(userData);

  if(resp.error){
   return {
      error: true,
      message: "Falha no login."
    };
  }
  
  await createSession(resp.userId, resp.username, resp.token, resp.nivelPermissao, resp.isSuperUser)

  redirect("/home");

}

export async function logoutAction() {

  logoutUserService();
  await deleteSession()
  redirect("/login");
}

export async function atualizaBaseCompromissosAction() {

  await atualizaDadosBaseCompromissos();

  redirect("/compromissos");
}

