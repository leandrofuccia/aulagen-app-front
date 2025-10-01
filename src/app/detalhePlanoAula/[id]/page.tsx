"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Loading from "@/components/Loading";
import {
  ErrorPopup,
  Heading3,
  Heading4,
  MainWrapper,
  Paragraph,
} from "@/components/Common";

import {
  PageWrapper,
  SectionCard,
  MarkdownCard,
  AulaCard,
  AulaTitle,
  AtividadesTable,
  StyledTable,
  TableHead,
  TableRow,
  TableCell,
  MarkdownH3,
  MarkdownP,
  MarkdownUl,
  MarkdownLi,
  MarkdownSectionTitle,
  MarkdownSubTitle,
  RecursoItem,
  RecursosList,
  AvaliacaoTexto,
  PlanoHeader,
  PlanoTitulo,
  PlanoInfoGrid,
  PlanoInfoItem,
} from "@/styles/detalhePlanoStyles";

import { IPlanoAulaDetalhado } from "@/types/planoAulaDetalhado";

const ReadPlanoAulaPage = () => {
  const [plano, setPlano] = useState<IPlanoAulaDetalhado | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();

  const renderDetalhesPlano = (texto: string) => {
    const linhas = texto.split("\n").filter((linha) => linha.trim() !== "");

    return linhas.map((linha, index) => {
      if (linha.toLowerCase().includes("contextualização")) {
        return <Heading4 key={index}>🎨 Contextualização</Heading4>;
      }

      if (linha.toLowerCase().includes("metodologia")) {
        return <Heading4 key={index}>🧪 Metodologia</Heading4>;
      }

      if (/^\d+\./.test(linha)) {
        return <Paragraph key={index} style={{ marginLeft: "20px" }}>{linha}</Paragraph>;
      }

      return <Paragraph key={index}>{linha}</Paragraph>;
    });
  };


  useEffect(() => {
    const fetchPlanoAula = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/detalhePlanoAula/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPlano(response.data.planos);
      } catch (error: any) {
        const message = error?.response?.data?.message || "Erro ao buscar plano de aula.";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanoAula();
  }, [params.id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (isLoading) return <Loading />;
  if (errorMessage)
    return (
      <ErrorPopup>
        {errorMessage}
        <button onClick={() => setErrorMessage(null)}>✖</button>
      </ErrorPopup>
    );

  return (
    <>
      <Sidebar links={[{ label: "Administração", href: "/admin" }]} />
      <MainWrapper>
        <Header onLogout={handleLogout} onBack={() => router.back()} />
        <PageWrapper>
          <SectionCard>     
            <PlanoHeader>
              <PlanoTitulo>📊 {plano?.titulo}</PlanoTitulo>

              <PlanoInfoGrid>
                <PlanoInfoItem>
                  <strong>⏱ Duração Total:</strong>
                  {plano?.duracao_total}
                </PlanoInfoItem>

                <PlanoInfoItem>
                  <strong>📘 Componente Curricular:</strong>
                  {plano?.habilidade_bncc?.componenteCurricular}
                </PlanoInfoItem>

                <PlanoInfoItem>
                  <strong>🎓 Ano/Série:</strong>
                  {plano?.habilidade_bncc?.anoSerie}
                </PlanoInfoItem>

                <PlanoInfoItem>
                  <strong>🧾 Código BNCC:</strong>
                  {plano?.habilidade_bncc?.codigo}
                </PlanoInfoItem>

                <PlanoInfoItem>
                  <strong>🧠 Habilidade BNCC:</strong>
                  {plano?.habilidade_bncc?.descricao}
                </PlanoInfoItem>
              </PlanoInfoGrid>
            </PlanoHeader>          
          </SectionCard>

          <SectionCard>
          <Heading4 style={{ color: "#0078D4" }}>
            📦 Recursos Gerais</Heading4>
          <RecursosList>
            {plano?.recursos_gerais.map((item, index) => (
              <RecursoItem key={index}>{item}</RecursoItem>
            ))}
          </RecursosList>
        </SectionCard>

          
          <MarkdownCard>
            <Heading4 style={{ fontSize: "1.8rem", color: "#0078D4", marginBottom: "20px" }}>
              📋 Detalhes do Plano
            </Heading4>

            <ReactMarkdown
              children={plano?.detalhes_plano_completo || ""}
              components={{
                h3: ({ node, ...props }) => <MarkdownSectionTitle  {...props} />,
                p: ({ node, ...props }) => {
                  const texto = String(props.children);
                  if (texto.includes("Plano de Aula Detalhado")) {
                    return <MarkdownSubTitle>{texto}</MarkdownSubTitle>;
                  }
                  return <MarkdownP>{texto}</MarkdownP>;
                },
                ul: ({ node, ...props }) => <MarkdownUl {...props} />,
                li: ({ node, ...props }) => <MarkdownLi {...props} />,
              }}
            />
          </MarkdownCard>
          
          <SectionCard>
            <Heading4 style={{ color: "#0078D4", fontSize: "1.5rem", marginBottom: "12px" }}>
              📝 Avaliação
            </Heading4>
            <AvaliacaoTexto>{plano?.avaliacao}</AvaliacaoTexto>
          </SectionCard>


          <SectionCard>
            <Heading4 style={{ color: "#0078D4" }}>📚 Aulas Planejadas</Heading4>
            <StyledTable>
              <TableHead>
                <TableRow>
                  <th>#</th>
                  <th>Título</th>
                  <th>Objetivo</th>
                  <th>Duração</th>
                </TableRow>
              </TableHead>
              <tbody>
                {plano?.aulas.map((aula) => (
                  <TableRow key={aula.id}>
                    <TableCell>{aula.numero_aula}</TableCell>
                    <TableCell>{aula.titulo}</TableCell>
                    <TableCell>{aula.objetivo}</TableCell>
                    <TableCell>{aula.duracao}</TableCell>
                  </TableRow>
                ))}
              </tbody>
            </StyledTable>
          </SectionCard>

          {plano?.aulas && plano.aulas.length > 0 && (
            <>
              <Heading4 style={{ marginTop: "30px", color: "#0078D4" }}>🧩 Atividades por Aula</Heading4>
              <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "10px" }}>
                {plano.aulas.map((aula) => (
                  <AulaCard key={aula.id}>
                    <AulaTitle>
                      Aula {aula.numero_aula}: {aula.titulo}
                    </AulaTitle>
                    <AtividadesTable>
                      <thead>
                        <tr>
                          <th>Etapa</th>
                          <th>Tempo</th>
                          <th>Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aula.atividades?.map((atividade, idx) => (
                          <tr key={atividade.id || idx}>
                            <td>{atividade.etapa}</td>
                            <td>{atividade.tempo}</td>
                            <td>{atividade.descricao}</td>
                          </tr>
                        ))}
                      </tbody>
                    </AtividadesTable>
                  </AulaCard>
                ))}
              </div>
            </>
          )}
        </PageWrapper>
      </MainWrapper>
    </>
  );
};

export default ReadPlanoAulaPage;