/* import Header from "../../components/ui/header";
import { getAuthToken } from "./get-token";


export default function RenderizaHeader() {

  const authToken = await getAuthToken();

  const response = await fetch("http://127.0.0.1:8000/api/usuario-logado/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${authToken}`,
    },
  });

  const result = await response.json() 

  return (
    <Header  />

  )

}*/
