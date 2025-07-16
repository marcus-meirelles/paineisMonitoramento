'use client'

import Template from "@/app/components/ui/template";

export default function Dashboard({ data }: any) {

  return (
    <div>
      <>
        <Template>
          <div className="">
            <div className="flex flex-row gap-4 px-2 py-2">
              <div className="border-1 px-8 py-8 w-1/6">
                <p>Compromissos Totais: </p>
                <p>{data.compromissosTotais}</p>
              </div>

              <div className="border-1 px-8 py-8 w-1/6">
                <p>Concluídos: </p>
                <p>{data.compromissosConcluidos}</p>
              </div>

              <div className="border-1 px-8 py-8 w-1/6">
                <p>Parcialmente Concluídos: </p>
                <p>{data.compromissosParcialmenteConcluidos}</p>
              </div>

              <div className="border-1 px-8 py-8 w-1/6">
                <p> A Cumprir: </p>
                <p>{data.compromissosACumprir}</p>
              </div>

              <div className="border-1 px-8 py-8 w-2/6">
                <div>Filtros<br /></div>
                <div className="flex flex-row">
                  <p>Orgão</p>
                  <div>
                    <select name="selectOrgao" id="selectOrgao" className="border border-sky-600 rounded-sm ">
                      <option value="" > -- </option>
                      {data.dominioOrgaos.map((s: string) => (<option key={`${s}`} value={s}> {s}</option>))}
                    </select>
                  </div>
                  <></>
                  <p>Ciclo</p>
                  <div>
                    <select name="selectCiclo" id="selectCiclo" className="border border-sky-600 rounded-sm " >
                      <option value="0" > -- </option>
                      <option value="1" >100 dias</option>
                      <option value="2" >200 dias</option>
                      <option value="3" >trezentos dias</option>
                      <option value="4" >Seisentos Dias</option>
                      <option value="5" >Setecentos e Trinta Dias</option>
                      <option value="6" >Previsao Final</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 px-2 py-2">
              <div className="">
                <div className="flex flex-row gap-4 ">
                  <div className="border-1 basis-1/3 p-4">
                    Nada aqui!
                  </div>
                  <div className="border-1 basis-2/3">
                    Nada aqui!
                  </div>
                </div>
              </div>
              <div>
                <div className="">
                  <div className="flex flex-row gap-4 ">
                    <div className="border-1 basis-1/3">
                      Nem aqui!
                    </div>
                    <div className="border-1 basis-2/3">
                      Aqui tbm não!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Template>
      </>
    </div>
  );
}
