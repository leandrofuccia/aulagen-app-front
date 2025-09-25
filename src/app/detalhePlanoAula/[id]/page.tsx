"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

import Header from "@/components/Header";
import {
  ErrorPopup,
  Heading3,
  Heading4,
  MainWrapper,
  Paragraph,
  PlanoContent,
} from "@/components/Common";
import Loading from "@/components/Loading";
import { IPlanoAulaDetalhado } from "@/types/planoAulaDetalhado";
import Sidebar from "@/components/Sidebar";

const ReadPlanoAulaPage = () => {
  const [plano, setPlano] = useState<IPlanoAulaDetalhado | null>(null);
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPlanoAula = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/detalhePlanoAula/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPlano(response.data.planos);
        setIsLoading(false);
      } catch (error: any) {
        const message = error?.response?.data?.message || "Erro ao buscar plano de aula.";
        setErrorMessage(message);
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
    { <Sidebar
      links={[
        { label: "Administração", href: "/admin" },
      ]}
    /> }
    <MainWrapper>
      <Header onLogout={handleLogout} onBack={() => router.back()} />
      <main style={{ padding: "30px", maxWidth: "1000px", margin: "auto" }}>
        <PlanoContent>
          <Heading3>📘 {plano?.titulo}</Heading3>
          <Paragraph><strong>Duração Total:</strong> {plano?.duracao_total}</Paragraph>
          {plano?.habilidade_bncc ? (
            <>
              <Paragraph><strong>Componente Curricular:</strong> {plano.habilidade_bncc.componenteCurricular}</Paragraph>
              <Paragraph><strong>Ano/Série:</strong> {plano.habilidade_bncc.anoSerie}</Paragraph>
              <Paragraph><strong>Código BNCC:</strong> {plano.habilidade_bncc.codigo}</Paragraph>
              <Paragraph><strong>Habilidade BNCC:</strong> {plano.habilidade_bncc.descricao}</Paragraph>
            </>
          ) : (
            <Paragraph style={{ color: "#888" }}>
              <strong>Habilidade BNCC:</strong> Não vinculada a este plano.
            </Paragraph>
          )}

          <Heading4 style={{ marginTop: "30px" }}>📦 Recursos Gerais</Heading4>
          <ul>
            {plano?.recursos_gerais.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <Heading4 style={{ marginTop: "30px" }}>📋 Detalhes do Plano</Heading4>
          <div style={{
            background: "#f9f9f9",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #ddd"
          }}>
            <ReactMarkdown
              children={plano?.detalhes_plano_completo || ""}
              components={{
                h3: ({ node, ...props }) => <h3 style={{ marginTop: "20px", color: "#0078D4" }} {...props} />,
                p: ({ node, ...props }) => <p style={{ marginBottom: "10px" }} {...props} />,
                ul: ({ node, ...props }) => <ul style={{ paddingLeft: "20px", marginBottom: "10px" }} {...props} />,
                li: ({ node, ...props }) => <li style={{ marginBottom: "5px" }} {...props} />,
              }}
            />
          </div>

          <Heading4 style={{ marginTop: "30px" }}>🎯 Avaliação</Heading4>
          <Paragraph>{plano?.avaliacao}</Paragraph>

          <Heading4 style={{ marginTop: "30px" }}>📚 Aulas Planejadas</Heading4>
          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px"
          }}>
            <thead>
              <tr style={{ background: "#eee" }}>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>#</th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>Título</th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>Objetivo</th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>Duração</th>
              </tr>
            </thead>
            <tbody>
              {plano?.aulas
                .sort((a, b) => a.numero_aula - b.numero_aula)
                .map((aula) => (
                  <tr key={aula.id}>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{aula.numero_aula}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{aula.titulo}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{aula.objetivo}</td>
                    <td style={{ padding: "8px", border: "1px solid #ccc" }}>{aula.duracao}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {plano?.aulas && plano.aulas.length > 0 && (
            <>
              <Heading4 style={{ marginTop: "30px" }}>🧩 Atividades por Aula</Heading4>
              <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "10px" }}>
                {plano.aulas.map((aula) => (
                  <div key={aula.id} style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "15px",
                    backgroundColor: "#fdfdfd",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                  }}>
                    <Paragraph style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "10px" }}>
                      Aula {aula.numero_aula}: {aula.titulo}
                    </Paragraph>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ backgroundColor: "#f0f0f0" }}>
                          <th style={{ padding: "8px", border: "1px solid #ccc" }}>Etapa</th>
                          <th style={{ padding: "8px", border: "1px solid #ccc" }}>Tempo</th>
                          <th style={{ padding: "8px", border: "1px solid #ccc" }}>Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        {aula.atividades?.map((atividade, idx) => (
                          <tr key={atividade.id || idx}>
                            <td style={{ padding: "8px", border: "1px solid #ccc", backgroundColor: "#fff" }}>
                              {atividade.etapa}
                            </td>
                            <td style={{ padding: "8px", border: "1px solid #ccc", backgroundColor: "#fff" }}>
                              {atividade.tempo}
                            </td>
                            <td style={{ padding: "8px", border: "1px solid #ccc", backgroundColor: "#fff" }}>
                              {atividade.descricao}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </>
          )}
        </PlanoContent>
      </main>
    </MainWrapper>
    </>
  );
};

export default ReadPlanoAulaPage;