import { redirect } from "next/navigation";
import atualizaDadosBaseCompromissos from "../services/atualiza-base-compromissos";

export async function atualizaBaseCompromissosAction() {

  await atualizaDadosBaseCompromissos();

  redirect("/compromissos");
}
