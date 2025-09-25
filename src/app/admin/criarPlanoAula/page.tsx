"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import {
  Button,
  Input,
  StyledForm,
  MainWrapper,
  Heading5,
} from "@/components/Common";
import Sidebar from "@/components/Sidebar";

interface HabilidadeBNCC {
  id: number;
  codigo: string;
  descricao: string;
  etapa_ensino: string;
  componente_curricular: string;
  ano_serie: string;
  versao: string;
  status: string;
}

const CreatePlanoAulaPage = () => {
  const router = useRouter();

  const [dadosBNCC, setDadosBNCC] = useState<HabilidadeBNCC[]>([]);
  const [anoSelecionado, setAnoSelecionado] = useState("");
  const [componenteSelecionado, setComponenteSelecionado] = useState("");
  const [filtroDescricao, setFiltroDescricao] = useState("");

  useEffect(() => {
    const carregarDadosBNCC = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token não encontrado.");
          return;
        }

        const response = await axios.get("/api/habilidadeBNCC", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDadosBNCC(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados BNCC:", error);
      }
    };

    carregarDadosBNCC();
  }, []);

  const anosDisponiveis = [...new Set(dadosBNCC.map((item) => item.ano_serie))];

  const componentesFiltrados = [...new Set(
    dadosBNCC
      .filter((item) => item.ano_serie === anoSelecionado)
      .map((item) => item.componente_curricular)
  )];

  const descricoesFiltradas = dadosBNCC
    .filter(
      (item) =>
        item.ano_serie === anoSelecionado &&
        item.componente_curricular === componenteSelecionado &&
        item.descricao.toLowerCase().includes(filtroDescricao.toLowerCase())
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token não encontrado.");
      return;
    }

    const habilidadeSelecionada = descricoesFiltradas[0];
    if (!habilidadeSelecionada) {
      alert("Selecione uma habilidade BNCC.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/createPlanoAula",
        {
          codigo_BNCC: habilidadeSelecionada.codigo,
          componente_Curricular: componenteSelecionado,
          serie: anoSelecionado,
          duracao_aula: "50 minutos",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response.data?.planoAula? tela criação plano aula', response.data?.planoAula)
      const planoId = response.data?.planoAula?.id;
      console.log( 'tela criação ID', response.data?.planoAula?.id )
     
      if (planoId) {
        router.push(`/detalhePlanoAula/${planoId}`);
      } else {
        alert("Plano gerado, mas não foi possível obter o ID.");
      }
    } catch (error) {
      console.error("Erro ao gerar plano de aula:", error);
      alert("Erro ao gerar plano de aula.");
    }
  };

  return (
    <>
    { <Sidebar
        links={[
          { label: "Administração", href: "/admin" },
        ]}
    /> }
    <MainWrapper>
      <Header onLogout={() => router.push("/login")} onBack={() => router.back()} />
      <main>
        <Heading5>📚 Criar Plano de Aula</Heading5>

        <StyledForm onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="ano">Ano/Série:</label>
              <select
                id="ano"
                value={anoSelecionado}
                onChange={(e) => {
                  setAnoSelecionado(e.target.value);
                  setComponenteSelecionado("");
                }}
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="">Selecione</option>
                {anosDisponiveis.map((ano) => (
                  <option key={ano} value={ano}>{ano}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="componente">Componente Curricular:</label>
              <select
                id="componente"
                value={componenteSelecionado}
                onChange={(e) => setComponenteSelecionado(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="">Selecione</option>
                {componentesFiltrados.map((comp) => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="filtro">🔍 Filtro BNCC:</label>
              <Input
                id="filtro"
                type="text"
                value={filtroDescricao}
                onChange={(e) => setFiltroDescricao(e.target.value)}
                placeholder="Digite um termo..."
              />
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label htmlFor="descricao">Descrição (Habilidades BNCC):</label>
            <select
              id="descricao"
              multiple
              style={{ width: "100%", height: "120px", padding: "8px" }}
            >
              {descricoesFiltradas.map((item) => (
                <option key={item.codigo}>
                  {item.codigo} - {item.descricao}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" style={{ marginTop: "20px" }}>
            GERAR PLANO DE AULA
          </Button>
        </StyledForm>
      </main>
    </MainWrapper>
    </>
  );
};

export default CreatePlanoAulaPage;