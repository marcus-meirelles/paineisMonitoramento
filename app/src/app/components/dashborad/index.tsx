'use client'

import { useState, useEffect } from 'react';
import Template from "@/app/components/ui/template";
import { BaseCompromissos } from '@/types/baseCompromisso';
import { CompromissosOrgao } from '@/types/compromissosOrgao';
import { EspecificacaoCompromissos } from '@/types/especificacaoCompromissos';
import { HistoricoStatus } from '@/types/hitoricoStatus'
import { DistriComproGrupoStatus } from '@/types/distriComproGrupoStatus'
import { LineChart, BarChart } from '@mantine/charts';

export default function Dashboard({ data }: any) {

  const baseCompromisso: BaseCompromissos[] = data.base

  const compromissosTotais = baseCompromisso.length;

  const compromissosConcluidos = baseCompromisso.filter(item => item.previsao_final === "C").length;

  const compromissosParcialmenteConcluidos = baseCompromisso.filter(item => item.previsao_final === "PC").length;

  const compromissosACumprir = baseCompromisso.filter(item => item.previsao_final == 'nan').length;

  const dominioOrgaos: string[] = JSON.parse(data.dominioOrgao)

  const dominioGrupo: string[] = JSON.parse(data.dominioGrupo)

  const [selectedCiclo, setSelectCiclo] = useState('0');

  const [selectedOrgao, setSelectOrgao] = useState('0');

  useEffect(() => {
    const elementCompromissosConcluidos = document.getElementById('idCompromissosConcluidos');
    const elementParcialmenteConcluido = document.getElementById('idCompromissosParcialmenteConcluidos');
    const elementCompromissosACumprir = document.getElementById('idCompromissosACumprir');

    if (elementCompromissosConcluidos) {
      if (selectedCiclo == '0' && selectedOrgao == '0')
        elementCompromissosConcluidos.textContent = '' + compromissosConcluidos
      else if (selectedCiclo == '0' && selectedOrgao != '0') {
        elementCompromissosConcluidos.textContent = '' + calculaValorAgragado('', selectedOrgao);
      }
      else if (selectedCiclo != '0' && selectedOrgao == '0') {
        elementCompromissosConcluidos.textContent = '' + calculaValorAgragado('C', '');
      }
      else {
        elementCompromissosConcluidos.textContent = '' + calculaValorAgragado('C', selectedOrgao);
      }
    }

    if (elementParcialmenteConcluido) {
      if (selectedCiclo == '0' && selectedOrgao == '0')
        elementParcialmenteConcluido.textContent = '' + compromissosParcialmenteConcluidos
      else {
        elementParcialmenteConcluido.textContent = '' + calculaValorAgragado('PC', selectedOrgao);
      }
    }


    if (elementCompromissosACumprir) {
      if (selectedCiclo == '0' && selectedOrgao == '0')
        elementCompromissosACumprir.textContent = '' + compromissosACumprir
      else {
        elementCompromissosACumprir.textContent = '' + calculaValorAgragado('nan', selectedOrgao);
      }
    }
  }, [selectedCiclo, selectedOrgao]);

  const [linhasCompromissosOrgao, setLinhasCompromissosOrgao] = useState<CompromissosOrgao[]>([]);

  useEffect(() => {
    setLinhasCompromissosOrgao(preencherCompromissosOrgao(selectedCiclo, baseCompromisso, dominioOrgaos))
  }, [selectedCiclo]);

  const [linhasEspecificacaoCompromissos, setLinhasEspecificacaoCompromissos] = useState<EspecificacaoCompromissos[]>([]);

  useEffect(() => {
    setLinhasEspecificacaoCompromissos(preencherEspecificacaoCompromissos(selectedCiclo, selectedOrgao, baseCompromisso))
  }, [selectedCiclo, selectedOrgao]);

  const [dadosHistoricoStatus, setDadosHistoricoStatus] = useState<HistoricoStatus[]>([]);

  useEffect(() => {
    setDadosHistoricoStatus(geraDadosHistoricoStatus(selectedOrgao, baseCompromisso))
  }, [selectedOrgao]);


  const [dadosDistriComprGrupoStatus, setDadosDistriComprGrupoStatus] = useState<DistriComproGrupoStatus[]>([]);

  useEffect(() => {
    setDadosDistriComprGrupoStatus(geraDadosDistriComprGrupoStatus(selectedCiclo, dominioGrupo, baseCompromisso))
  }, [selectedCiclo]);


  function calculaValorAgragado(tipoFiltro: string, orgao: string): number {

    switch (selectedCiclo) {
      case '1':
        if (tipoFiltro != '' && orgao == '') {
          return baseCompromisso.filter(item => item.cem_dias == tipoFiltro).length;
        }
        else if (tipoFiltro == '' && orgao != '') {
          return baseCompromisso.filter(item => item.orgao == orgao).length;
        }
        return baseCompromisso.filter(item => item.cem_dias == tipoFiltro && item.orgao == orgao).length;

      case '2':
        if (tipoFiltro != '' && orgao == '') {
          return baseCompromisso.filter(item => item.duzentos_dias == tipoFiltro).length;
        }
        else if (tipoFiltro == '' && orgao != '') {
          return baseCompromisso.filter(item => item.orgao == orgao).length;
        }
        return baseCompromisso.filter(item => item.duzentos_dias == tipoFiltro && item.orgao == orgao).length;

      case '3':
        if (tipoFiltro != '' && orgao == '') {
          return baseCompromisso.filter(item => item.trezentos_dias == tipoFiltro).length;
        }
        else if (tipoFiltro == '' && orgao != '') {
          return baseCompromisso.filter(item => item.orgao == orgao).length;
        }
        return baseCompromisso.filter(item => item.trezentos_dias == tipoFiltro && item.orgao == orgao).length;

      case '4':
        if (tipoFiltro != '' && orgao == '0') {
          return baseCompromisso.filter(item => item.seisentos_dias == tipoFiltro).length;
        }
        else if (tipoFiltro == '' && orgao != '') {
          return baseCompromisso.filter(item => item.orgao == orgao).length;
        }
        return baseCompromisso.filter(item => item.seisentos_dias == tipoFiltro && item.orgao == orgao).length;

      case '5':
        if (tipoFiltro != '' && orgao == '') {
          return baseCompromisso.filter(item => item.setecentos_trinta_dias == tipoFiltro).length;
        }
        else if (tipoFiltro == '' && orgao != '') {
          return baseCompromisso.filter(item => item.orgao == orgao).length;
        }
        return baseCompromisso.filter(item => item.setecentos_trinta_dias == tipoFiltro && item.orgao == orgao).length;

      case '6':
        if (tipoFiltro != '' && orgao == '') {
          return baseCompromisso.filter(item => item.previsao_final == tipoFiltro).length;
        }
        else if (tipoFiltro == '' && orgao != '') {
          return baseCompromisso.filter(item => item.orgao == orgao).length;
        }
        return baseCompromisso.filter(item => item.previsao_final == tipoFiltro && item.orgao == orgao).length;

      default:
        return baseCompromisso.filter(item => item.previsao_final == tipoFiltro).length;
    }
  }

  return (
    <div>
      <>
        <Template>
          <div className="flex flex-row gap-4 px-2 py-2">
            <div className="border-1 px-8 py-8 w-1/6">
              <p>Compromissos Totais: </p>
              <p id='idCompromissosTotais'>{compromissosTotais}</p>
            </div>

            <div className="border-1 px-8 py-8 w-1/6">
              <p>Concluídos: </p>
              <p id='idCompromissosConcluidos'>{compromissosConcluidos}</p>
            </div>

            <div className="border-1 px-8 py-8 w-1/6">
              <p>Parcialmente Concluídos: </p>
              <p id='idCompromissosParcialmenteConcluidos'>{compromissosParcialmenteConcluidos}</p>
            </div>

            <div className="border-1 px-8 py-8 w-1/6">
              <p> A Cumprir: </p>
              <p id='idCompromissosACumprir'>{compromissosACumprir}</p>
            </div>

            <div className="border-1 px-8 py-8 w-2/6">
              <div>Filtros<br /></div>
              <div className="flex flex-row">
                <p>Orgão</p>
                <div>
                  <select name="selectOrgao" id="selectOrgao" className="border border-sky-600 rounded-sm" value={selectedOrgao} onChange={e => setSelectOrgao(e.target.value)}>
                    <option value="0" > Todos </option>
                    {dominioOrgaos.map((s: string) => (<option key={`${s}`} value={s}> {s}</option>))}
                  </select>
                </div>
                <></>
                <p>Ciclo</p>
                <div className="border border-sky-600 rounded-sm ">
                  <select value={selectedCiclo} onChange={e => setSelectCiclo(e.target.value)}>
                    <option value="0">Todos</option>
                    <option value="1">Cem dias</option>
                    <option value="2">Duzentos dias</option>
                    <option value="3">Trezentos Dias</option>
                    <option value="4">Seisentos Dias</option>
                    <option value="5">Setecentos e Trinta Dias</option>
                    <option value="6">Previsao Final</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 px-2 py-2 ">
            <div className="">
              <div className="flex flex-row gap-4 h-80">
                <div className="border-1 basis-1/3">
                  <p>Histórico do Status</p>
                  <div className='border-1 h-74'>
                    <LineChart
                      h={260}
                      w={580}
                      withLegend
                      data={dadosHistoricoStatus}
                      xAxisProps={{ padding: { left: 30, right: 30 } }}
                      dataKey="ciclo"
                      series={[
                        { name: 'A_cumprir', color: 'indigo.6' },
                        { name: 'Parc_concluídos', color: 'blue.6' },
                        { name: 'Concluídos', color: 'teal.6' },
                      ]}
                      curveType="linear"
                    />
                  </div>
                </div>
                <div className="border-1 basis-2/3">
                  <p>Distribuição dos Compromissos por Grupo e Status</p>
                  <div className='border-1 h-74'>
                    <BarChart
                      h={260}
                      withLegend
                      data={dadosDistriComprGrupoStatus}
                      dataKey="grupo"
                      type="stacked"
                      maxBarWidth={50}
                      xAxisProps={{ padding: { left: 30, right: 30}}}
                      series={[
                        { name: 'Parc_concluídos', color: 'violet.6' },
                        { name: 'Concluídos', color: 'blue.6' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex flex-row gap-4 h-80">
                <div className="border-1 basis-1/3">
                  <p>Compromissos por Órgão</p>
                  <div className='border-1 h-74 max-h-100 overflow-y-auto
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500' >
                    <table className=''>
                      <thead >
                        <tr className='border'>
                          <th className='border px-4 w-30'>Órgão</th>
                          <th className='border px-4 w-30'>Concluido</th>
                          <th className='border px-4 w-30'>Parcialmente</th>
                          <th className='border px-4 w-30'>nan</th>
                          <th className='border px-4 w-30'>Total</th>
                        </tr>
                      </thead>
                      <tbody>

                        {linhasCompromissosOrgao.map((row, index) => (
                          <tr key={index} className='border'>
                            <td className='border text-center '>{row.nomeOrgao}</td>
                            <td className='border text-center '>{row.concluidos}</td>
                            <td className='border text-center '>{row.parcialmente}</td>
                            <td className='border text-center '>{row.nan}</td>
                            <td className='border text-center '>{row.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="border-1 basis-2/3">
                  <p>Especificação dos Compromissos</p>
                  <div className='border-1 h-74 max-h-100 overflow-y-auto
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:bg-gray-300
                        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500' >
                    <table className=''>
                      <thead >
                        <tr className='border'>
                          <th className='border px-4 w-30'>ID</th>
                          <th className='border px-4 w-30'>Órgão</th>
                          <th className='border px-4 w-30'>Natureza</th>
                          <th className='border px-4 w-200'>Descrição</th>
                          <th className='border px-4 w-30'>Status</th>
                        </tr>
                      </thead>
                      <tbody>

                        {linhasEspecificacaoCompromissos.map((row, index) => (
                          <tr key={index} className='border'>
                            <td className='border text-center '>{row.identificador}</td>
                            <td className='border text-center '>{row.orgao}</td>
                            <td className='border text-center '>{row.natureza}</td>
                            <td className='border justify-center '>{row.descricao}</td>
                            <td className='border text-center '>{row.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

function preencherCompromissosOrgao(selectedCiclo: string, baseCompromisso: BaseCompromissos[], dominioOrgaos: string[]): CompromissosOrgao[] {

  let resultado: CompromissosOrgao[] = []
  let concluidos: number = 0
  let parcialmente: number = 0
  let nan: number = 0
  let total: number = 0
  let nomeOrgao: string = ''

  if (selectedCiclo == '0') {
    dominioOrgaos.forEach(orgao => {
      concluidos = baseCompromisso.filter(item => item.previsao_final == 'C' && item.orgao == orgao).length
      parcialmente = baseCompromisso.filter(item => item.previsao_final == 'PC' && item.orgao == orgao).length
      nan = baseCompromisso.filter(item => item.previsao_final == 'nan' && item.orgao == orgao).length
      total = concluidos + parcialmente + nan
      nomeOrgao = orgao
      let tupla: CompromissosOrgao = { nomeOrgao, concluidos, parcialmente, nan, total }
      resultado.push(tupla)
    })
    return resultado
  }
  else {
    switch (selectedCiclo) {
      case '1':
        dominioOrgaos.forEach(orgao => {
          concluidos = baseCompromisso.filter(item => item.cem_dias == 'C' && item.orgao == orgao).length
          parcialmente = baseCompromisso.filter(item => item.cem_dias == 'PC' && item.orgao == orgao).length
          nan = baseCompromisso.filter(item => item.cem_dias == 'nan' && item.orgao == orgao).length
          total = concluidos + parcialmente + nan
          nomeOrgao = orgao
          let tupla: CompromissosOrgao = { nomeOrgao, concluidos, parcialmente, nan, total }
          resultado.push(tupla)
        })
        return resultado

      case '2':
        dominioOrgaos.forEach(orgao => {
          concluidos = baseCompromisso.filter(item => item.duzentos_dias == 'C' && item.orgao == orgao).length
          parcialmente = baseCompromisso.filter(item => item.duzentos_dias == 'PC' && item.orgao == orgao).length
          nan = baseCompromisso.filter(item => item.duzentos_dias == 'nan' && item.orgao == orgao).length
          total = concluidos + parcialmente + nan
          nomeOrgao = orgao
          let tupla: CompromissosOrgao = { nomeOrgao, concluidos, parcialmente, nan, total }
          resultado.push(tupla)
        })
        return resultado

      case '3':
        dominioOrgaos.forEach(orgao => {
          concluidos = baseCompromisso.filter(item => item.trezentos_dias == 'C' && item.orgao == orgao).length
          parcialmente = baseCompromisso.filter(item => item.trezentos_dias == 'PC' && item.orgao == orgao).length
          nan = baseCompromisso.filter(item => item.trezentos_dias == 'nan' && item.orgao == orgao).length
          total = concluidos + parcialmente + nan
          nomeOrgao = orgao
          let tupla: CompromissosOrgao = { nomeOrgao, concluidos, parcialmente, nan, total }
          resultado.push(tupla)
        })
        return resultado

      case '4':
        dominioOrgaos.forEach(orgao => {
          concluidos = baseCompromisso.filter(item => item.seisentos_dias == 'C' && item.orgao == orgao).length
          parcialmente = baseCompromisso.filter(item => item.seisentos_dias == 'PC' && item.orgao == orgao).length
          nan = baseCompromisso.filter(item => item.seisentos_dias == 'nan' && item.orgao == orgao).length
          total = concluidos + parcialmente + nan
          nomeOrgao = orgao
          let tupla: CompromissosOrgao = { nomeOrgao, concluidos, parcialmente, nan, total }
          resultado.push(tupla)
        })
        return resultado

      case '5':
        dominioOrgaos.forEach(orgao => {
          concluidos = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'C' && item.orgao == orgao).length
          parcialmente = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'PC' && item.orgao == orgao).length
          nan = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'nan' && item.orgao == orgao).length
          total = concluidos + parcialmente + nan
          nomeOrgao = orgao
          let tupla: CompromissosOrgao = { nomeOrgao, concluidos, parcialmente, nan, total }
          resultado.push(tupla)
        })
        return resultado

      default:

        dominioOrgaos.forEach(orgao => {
          concluidos = baseCompromisso.filter(item => item.previsao_final == 'C' && item.orgao == orgao).length
          parcialmente = baseCompromisso.filter(item => item.previsao_final == 'PC' && item.orgao == orgao).length
          nan = baseCompromisso.filter(item => item.previsao_final == 'nan' && item.orgao == orgao).length
          total = concluidos + parcialmente + nan
          nomeOrgao = orgao
          let tupla: CompromissosOrgao = { nomeOrgao, concluidos, parcialmente, nan, total }
          resultado.push(tupla)
        })
        return resultado
    }
  }


}
function preencherEspecificacaoCompromissos(selectedCiclo: string, orgao: string, baseCompromisso: BaseCompromissos[]): EspecificacaoCompromissos[] {

  let tuplas: BaseCompromissos[] = []
  if (orgao == '0') {
    tuplas = baseCompromisso
  } else {
    tuplas = baseCompromisso.filter(item => item.orgao == orgao)
  }

  switch (selectedCiclo) {
    case '0':
      return tuplas.map(item => ({
        identificador: item.identificador,
        orgao: item.orgao,
        natureza: item.natureza,
        descricao: item.compromisso,
        status: item.previsao_final
      } as EspecificacaoCompromissos))

    case '1':
      return tuplas.map(item => ({
        identificador: item.identificador,
        orgao: item.orgao,
        natureza: item.natureza,
        descricao: item.compromisso,
        status: item.cem_dias
      } as EspecificacaoCompromissos))

    case '2':
      return tuplas.map(item => ({
        identificador: item.identificador,
        orgao: item.orgao,
        natureza: item.natureza,
        descricao: item.compromisso,
        status: item.duzentos_dias
      } as EspecificacaoCompromissos))

    case '3':
      return tuplas.map(item => ({
        identificador: item.identificador,
        orgao: item.orgao,
        natureza: item.natureza,
        descricao: item.compromisso,
        status: item.trezentos_dias
      } as EspecificacaoCompromissos))

    case '4':
      return tuplas.map(item => ({
        identificador: item.identificador,
        orgao: item.orgao,
        natureza: item.natureza,
        descricao: item.compromisso,
        status: item.seisentos_dias
      } as EspecificacaoCompromissos))

    case '5':
      return tuplas.map(item => ({
        identificador: item.identificador,
        orgao: item.orgao,
        natureza: item.natureza,
        descricao: item.compromisso,
        status: item.setecentos_trinta_dias
      } as EspecificacaoCompromissos))

    default:
      return tuplas.map(item => ({
        identificador: item.identificador,
        orgao: item.orgao,
        natureza: item.natureza,
        descricao: item.compromisso,
        status: item.previsao_final
      } as EspecificacaoCompromissos))
  }

}

function geraDadosHistoricoStatus(orgao: string, baseCompromisso: BaseCompromissos[]): HistoricoStatus[] {

  let retorno: HistoricoStatus[] = []
  const ciclos = ['Status 100 dias', 'Status 200 dias', 'Status 300 dias', 'Status 600 dias', 'Status 630 dias']

  if (orgao == '0') {
    ciclos.forEach(item => {
      let ciclo = ''
      let A_cumprir = 0
      let Parc_concluídos = 0
      let Concluídos = 0
      let tupla: HistoricoStatus = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      if (item == 'Status 100 dias') {
        ciclo = item
        A_cumprir = baseCompromisso.filter(item => item.cem_dias == 'nan').length
        Parc_concluídos = baseCompromisso.filter(item => item.cem_dias == 'PC').length
        Concluídos = baseCompromisso.filter(item => item.cem_dias == 'C').length
        tupla = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      }
      else if (item == 'Status 200 dias') {
        ciclo = item
        A_cumprir = baseCompromisso.filter(item => item.duzentos_dias == 'nan').length
        Parc_concluídos = baseCompromisso.filter(item => item.duzentos_dias == 'PC').length
        Concluídos = baseCompromisso.filter(item => item.duzentos_dias == 'C').length
        tupla = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      }
      else if (item == 'Status 300 dias') {
        ciclo = item
        A_cumprir = baseCompromisso.filter(item => item.trezentos_dias == 'nan').length
        Parc_concluídos = baseCompromisso.filter(item => item.trezentos_dias == 'PC').length
        Concluídos = baseCompromisso.filter(item => item.trezentos_dias == 'C').length
        tupla = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      }
      else if (item == 'Status 600 dias') {
        ciclo = item
        A_cumprir = baseCompromisso.filter(item => item.seisentos_dias == 'nan').length
        Parc_concluídos = baseCompromisso.filter(item => item.seisentos_dias == 'PC').length
        Concluídos = baseCompromisso.filter(item => item.seisentos_dias == 'C').length
        tupla = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      }
      else if (item == 'Status 630 dias') {
        ciclo = item
        A_cumprir = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'nan').length
        Parc_concluídos = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'PC').length
        Concluídos = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'C').length
        tupla = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      }
      retorno.push(tupla)
    })
  }
  else {
    ciclos.forEach(item => {
      let ciclo = ''
      let A_cumprir = 0
      let Parc_concluídos = 0
      let Concluídos = 0
      let tupla: HistoricoStatus = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      if (item == 'Status 100 dias') {
        ciclo = item
        A_cumprir = baseCompromisso.filter(item => item.cem_dias == 'nan' && item.orgao == orgao).length
        Parc_concluídos = baseCompromisso.filter(item => item.cem_dias == 'PC' && item.orgao == orgao).length
        Concluídos = baseCompromisso.filter(item => item.cem_dias == 'C' && item.orgao == orgao).length
        tupla = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      }
      else if (item == 'Status 200 dias') {
        ciclo = item
        A_cumprir = baseCompromisso.filter(item => item.duzentos_dias == 'nan' && item.orgao == orgao).length
        Parc_concluídos = baseCompromisso.filter(item => item.duzentos_dias == 'PC' && item.orgao == orgao).length
        Concluídos = baseCompromisso.filter(item => item.duzentos_dias == 'C' && item.orgao == orgao).length
        tupla = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      }
      else if (item == 'Status 300 dias') {
        ciclo = item
        A_cumprir = baseCompromisso.filter(item => item.trezentos_dias == 'nan' && item.orgao == orgao).length
        Parc_concluídos = baseCompromisso.filter(item => item.trezentos_dias == 'PC' && item.orgao == orgao).length
        Concluídos = baseCompromisso.filter(item => item.trezentos_dias == 'C' && item.orgao == orgao).length
        tupla = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      }
      else if (item == 'Status 600 dias') {
        ciclo = item
        A_cumprir = baseCompromisso.filter(item => item.seisentos_dias == 'nan' && item.orgao == orgao).length
        Parc_concluídos = baseCompromisso.filter(item => item.seisentos_dias == 'PC' && item.orgao == orgao).length
        Concluídos = baseCompromisso.filter(item => item.seisentos_dias == 'C' && item.orgao == orgao).length
        tupla = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      }
      else if (item == 'Status 630 dias') {
        ciclo = item
        A_cumprir = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'nan' && item.orgao == orgao).length
        Parc_concluídos = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'PC' && item.orgao == orgao).length
        Concluídos = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'C' && item.orgao == orgao).length
        tupla = { ciclo, A_cumprir, Parc_concluídos, Concluídos }
      }
      retorno.push(tupla)
    })
  }
  return retorno
}

function geraDadosDistriComprGrupoStatus(selectedCiclo: string, dominioGrupo: string[], baseCompromisso: BaseCompromissos[]): DistriComproGrupoStatus[] {


  let retorno: DistriComproGrupoStatus[] = []

  console.log(dominioGrupo)

  dominioGrupo.forEach((item, index) => {
    if (item == 'INFRAESTRUTURA') {
      dominioGrupo[index] = 'INFRA.'
    }
    else if (item == 'DESENVOLVIMENTO RURAL') {
      dominioGrupo[index] = 'DES. RURAL'
    }
    else if (item == 'GESTÃO (EFICIÊNCIA E TRANSPARÊNCIA)') {
      dominioGrupo[index] = 'GEST. (EFIC. E TRANSP.)'
    }
    else if (item == 'DESENVOLVIMENTO ECONÔMICO') {
      dominioGrupo[index] = 'DES. ECONÔMICO'
    }
    else if (item == 'DESENVOLVIMENTO SOCIAL') {
      dominioGrupo[index] = 'DES. SOCIAL'
    }
  });

  let grupo = ''
  let Concluídos = 0
  let Parc_concluídos = 0
  let tupla: DistriComproGrupoStatus = { grupo, Parc_concluídos, Concluídos }

  switch (selectedCiclo) {
    case '0':
      dominioGrupo.forEach(item => {
        grupo = item
        Concluídos = baseCompromisso.filter(item => item.previsao_final == 'C' && item.grupo == grupo).length
        Parc_concluídos = baseCompromisso.filter(item => item.previsao_final == 'PC' && item.grupo == grupo).length
        tupla = { grupo, Concluídos, Parc_concluídos }
        retorno.push(tupla)
      })
      return retorno

    case '1':
      dominioGrupo.forEach(item => {
        grupo = item
        Concluídos = baseCompromisso.filter(item => item.cem_dias == 'C' && item.grupo == grupo).length
        Parc_concluídos = baseCompromisso.filter(item => item.cem_dias == 'PC' && item.grupo == grupo).length
        tupla = { grupo, Concluídos, Parc_concluídos }
        retorno.push(tupla)
      })
      return retorno
    case '2':
      dominioGrupo.forEach(item => {
        grupo = item
        Concluídos = baseCompromisso.filter(item => item.duzentos_dias == 'C' && item.grupo == grupo).length
        Parc_concluídos = baseCompromisso.filter(item => item.duzentos_dias == 'PC' && item.grupo == grupo).length
        tupla = { grupo, Concluídos, Parc_concluídos }
        retorno.push(tupla)
      })
      return retorno

    case '3':
      dominioGrupo.forEach(item => {
        grupo = item
        Concluídos = baseCompromisso.filter(item => item.trezentos_dias == 'C' && item.grupo == grupo).length
        Parc_concluídos = baseCompromisso.filter(item => item.trezentos_dias == 'PC' && item.grupo == grupo).length
        tupla = { grupo, Concluídos, Parc_concluídos }
        retorno.push(tupla)
      })
      return retorno

    case '4':
      dominioGrupo.forEach(item => {
        grupo = item
        Concluídos = baseCompromisso.filter(item => item.seisentos_dias == 'C' && item.grupo == grupo).length
        Parc_concluídos = baseCompromisso.filter(item => item.seisentos_dias == 'PC' && item.grupo == grupo).length
        tupla = { grupo, Concluídos, Parc_concluídos }
        retorno.push(tupla)
      })
      return retorno

    case '5':
      dominioGrupo.forEach(item => {
        grupo = item
        Concluídos = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'C' && item.grupo == grupo).length
        Parc_concluídos = baseCompromisso.filter(item => item.setecentos_trinta_dias == 'PC' && item.grupo == grupo).length
        tupla = { grupo, Concluídos, Parc_concluídos }
        retorno.push(tupla)
      })
      return retorno

    default:
      dominioGrupo.forEach(item => {
        grupo = item
        Concluídos = baseCompromisso.filter(item => item.previsao_final == 'C' && item.grupo == grupo).length
        Parc_concluídos = baseCompromisso.filter(item => item.previsao_final == 'PC' && item.grupo == grupo).length
        tupla = { grupo, Concluídos, Parc_concluídos }
        retorno.push(tupla)
      })
      return retorno
  }

}



