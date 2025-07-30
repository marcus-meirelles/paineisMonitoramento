"use server";
import { z } from "zod";
import { registerUserService, loginUserService, logoutUserService } from "@/data/services/auth-service";
import { redirect } from "next/navigation";
import atualizaDadosBaseCompromissos from "../services/atualiza-base-compromissos";
import { createSession, deleteSession, getSession} from '@/lib/session'

export async function registerUserAction(prevState: any, formData: FormData) {

  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Campos faltando. Falha no registro.",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Algo deu errado.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Falha no registro.",
    };
  }

  redirect("/login");
}


export async function loginUserAction(prevState: any, formData: FormData) {

  const validatedFields = schemaSignIn.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Campos faltando.",
    };
  }

  const resp = await loginUserService(validatedFields.data);

  if (!resp) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Algo deu errado.",
    };
  }

  if (resp.error) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Falha no Login.",
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

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(5).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});


const schemaSignIn = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(5).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
});

