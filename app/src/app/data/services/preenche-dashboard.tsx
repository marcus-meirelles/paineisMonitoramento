
import { BaseCompromissos } from "@/types/baseCompromisso";
import { getAuthToken } from "./get-token";
import Dashboard from "@/app/components/dashborad";

export default async function PreencheDashboard() {

  const authToken = await getAuthToken();

  const response = await fetch("http://127.0.0.1:8000/api/baseCompromissos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${authToken}`,
    },

  });

  const result = await response.json()

  const baseCompromisso: BaseCompromissos[] = result.data

  const compromissosConcluidos = baseCompromisso.filter(item => item.previsao_final === "C").length;

  const compromissosTotais = baseCompromisso.length;

  const compromissosParcialmenteConcluidos = baseCompromisso.filter(item => item.previsao_final === "PC").length;

  const compromissosACumprir = baseCompromisso.filter(item => item.previsao_final == 'nan').length;

  const dominioOrgaos: string[] = JSON.parse(result.dominioOrgao)

  const data = {
    'compromissosTotais': compromissosTotais,
    'compromissosConcluidos': compromissosConcluidos,
    'compromissosParcialmenteConcluidos': compromissosParcialmenteConcluidos,
    'compromissosACumprir': compromissosACumprir,
    'dominioOrgaos': dominioOrgaos,
  }

  return (
    <Dashboard data = { data } />
  )

}
