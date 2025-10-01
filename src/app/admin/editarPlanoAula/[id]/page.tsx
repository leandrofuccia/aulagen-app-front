/*"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";

import Header from "@/components/Header";
import {
  ErrorPopup,
  Heading3,
  Heading4,
  MainWrapper,
  Paragraph,
  PlanoContent,
  Button,
  Input,
} from "@/components/Common";
import Loading from "@/components/Loading";
import { IPlanoAulaDetalhado } from "@/types/planoAulaDetalhado";
import Sidebar from "@/components/Sidebar";

const EditPlanoAulaPage = () => {
  const [plano, setPlano] = useState<IPlanoAulaDetalhado | null>(null);
  const [detalhesPlano, setDetalhesPlano] = useState("");
  const [recursosGerais, setRecursosGerais] = useState<string[]>([]);
  const [avaliacao, setAvaliacao] = useState("");
  const [aulas, setAulas] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const params = useParams();
  const router = useRouter();

  const mdeOptions = useMemo(() => ({
    spellChecker: false,
    placeholder: "Edite os detalhes do plano aqui...",
    status: false,
  }), []);


  useEffect(() => {
    const fetchPlanoAula = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/detalhePlanoAula/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const planoData = response.data.planos;
        setPlano(planoData);
        setDetalhesPlano(planoData.detalhes_plano_completo || "");
        setRecursosGerais(planoData.recursos_gerais || []);
        setAvaliacao(planoData.avaliacao || "");
        setAulas(planoData.aulas || []);
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

  const handleSalvar = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");

      const markdownLimpo = detalhesPlano.replace(/\r\n/g, "\n");

      await axios.put(`/api/editarPlanoAula/${params.id}`, {
        detalhes_plano_completo: markdownLimpo,
        recursos_gerais: recursosGerais,
        avaliacao,
        aulas,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Plano de aula atualizado com sucesso!");
      router.push(`/detalhePlanoAula/${params.id}`);
    } catch (error) {
      console.error("Erro ao salvar plano:", error);
      alert("Erro ao salvar plano de aula.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRecursoChange = (index: number, value: string) => {
    const novos = [...recursosGerais];
    novos[index] = value;
    setRecursosGerais(novos);
  };

  const handleRemoveRecurso = (index: number) => {
    const novos = recursosGerais.filter((_, i) => i !== index);
    setRecursosGerais(novos);
  };

  const handleAddRecurso = () => {
    setRecursosGerais([...recursosGerais, ""]);
  };

  const handleAulaChange = (index: number, field: string, value: string) => {
    const novasAulas = [...aulas];
    novasAulas[index] = { ...novasAulas[index], [field]: value };
    setAulas(novasAulas);
  };

  const handleAtividadeChange = (aulaIndex: number, atividadeIndex: number, field: string, value: string) => {
    const novasAulas = [...aulas];
    const atividades = [...novasAulas[aulaIndex].atividades];
    atividades[atividadeIndex] = { ...atividades[atividadeIndex], [field]: value };
    novasAulas[aulaIndex].atividades = atividades;
    setAulas(novasAulas);
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
          <Heading3>✏️ Editar Plano: {plano?.titulo}</Heading3>
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

          <Heading4 style={{ marginTop: "30px" }}>📦 Editar Recursos Gerais</Heading4>
          {recursosGerais.map((recurso, index) => (
            <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <Input
                type="text"
                value={recurso}
                onChange={(e) => handleRecursoChange(index, e.target.value)}
                placeholder={`Recurso ${index + 1}`}
                style={{ flex: 1 }}
              />
              <button onClick={() => handleRemoveRecurso(index)}>❌</button>
            </div>
          ))}
          <Button type="button" onClick={handleAddRecurso} style={{ marginBottom: "20px" }}>
            ➕ Adicionar Recurso
          </Button>

          <Heading4>📋 Editar Detalhes do Plano</Heading4>
          <SimpleMDE
            value={detalhesPlano}
            onChange={setDetalhesPlano}
            options={mdeOptions}
          />

          <Heading4 style={{ marginTop: "30px" }}>🎯 Editar Avaliação</Heading4>
          <textarea
            value={avaliacao}
            onChange={(e) => setAvaliacao(e.target.value)}
            rows={4}
            style={{ width: "100%", padding: "10px", marginTop: "10px" }}
          />

          <Heading4 style={{ marginTop: "30px" }}>📚 Editar Aulas Planejadas</Heading4>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {aulas.map((aula, aulaIndex) => (
              <div key={aula.id} style={{
                background: "#f9f9f9",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}>
                <Paragraph><strong>Aula {aula.numero_aula}</strong></Paragraph>

                <Paragraph><strong>Título:</strong></Paragraph>
                <Input
                  type="text"
                  value={aula.titulo}
                  onChange={(e) => handleAulaChange(aulaIndex, "titulo", e.target.value)}
                  placeholder="Título da aula"
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    marginBottom: "10px"
                  }}
                />

                <Paragraph><strong>Objetivo:</strong></Paragraph>
                <textarea
                  value={aula.objetivo}
                  onChange={(e) => handleAulaChange(aulaIndex, "objetivo", e.target.value)}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    resize: "vertical"
                  }}
                />

                {Array.isArray(aula.atividades) && aula.atividades.length > 0 && (
                  <>
                    <Heading4 style={{ marginTop: "20px" }}>🧩 Atividades</Heading4>
                    {aula.atividades.map((atividade: any, atividadeIndex: number) => (
                      <div key={atividade.id || atividadeIndex} style={{
                        background: "#fff",
                        padding: "15px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        marginBottom: "15px"
                      }}>
                        <Paragraph><strong>Etapa:</strong></Paragraph>
                        <Input
                          type="text"
                          value={atividade.etapa}
                          onChange={(e) => handleAtividadeChange(aulaIndex, atividadeIndex, "etapa", e.target.value)}
                          placeholder="Etapa da atividade"
                          style={{ width: "100%", marginBottom: "10px" }}
                        />

                        <Paragraph><strong>Tempo:</strong></Paragraph>
                        <Input
                          type="text"
                          value={atividade.tempo}
                          onChange={(e) => handleAtividadeChange(aulaIndex, atividadeIndex, "tempo", e.target.value)}
                          placeholder="Tempo estimado"
                          style={{ width: "100%", marginBottom: "10px" }}
                        />

                        <Paragraph><strong>Descrição:</strong></Paragraph>
                        <textarea
                          value={atividade.descricao}
                          onChange={(e) => handleAtividadeChange(aulaIndex, atividadeIndex, "descricao", e.target.value)}
                          rows={3}
                          style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #ccc",
                            resize: "vertical"
                          }}
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>

          <Button
            type="button"
            onClick={handleSalvar}
            style={{ marginTop: "30px" }}
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </PlanoContent>
      </main>
    </MainWrapper>
    </>
  );
};

export default EditPlanoAulaPage;

*/


"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "simplemde/dist/simplemde.min.css";

import Header from "@/components/Header";
import {
  ErrorPopup,
  MainWrapper,
  Paragraph,
  PlanoContent,  
} from "@/components/Common";
import Loading from "@/components/Loading";
import { IPlanoAulaDetalhado } from "@/types/planoAulaDetalhado";
import Sidebar from "@/components/Sidebar";

import {
  Section,
  Card,
  Textarea,
  RecursoRow,
  AulaCard,
  AtividadeCard,
  Input,
  Button,
  DeleteButton,
  Button as BaseButton
} from "@/styles/editarPlanoStyles";

import { Heading3 as BaseHeading3, Heading4 as BaseHeading4 } from "@/components/Common";
import { styled } from "styled-components";
import dynamic from "next/dynamic";


const EditPlanoAulaPage = () => {
  const [plano, setPlano] = useState<IPlanoAulaDetalhado | null>(null);
  const [detalhesPlano, setDetalhesPlano] = useState("");
  const [recursosGerais, setRecursosGerais] = useState<string[]>([]);
  const [avaliacao, setAvaliacao] = useState("");
  const [aulas, setAulas] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const params = useParams();
  const router = useRouter();

  /*const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
    
  });*/

  
  const Heading3 = styled(BaseHeading3)`
    color: ${(props) => props.theme.colors.primary};
  `;

  const Heading4 = styled(BaseHeading4)`
    color: ${(props) => props.theme.colors.primary};
  `;

  const FullWidthButton = styled(BaseButton)`
  width: 100%;
`;


  const mdeOptions = useMemo(() => ({
    spellChecker: false,
    placeholder: "Edite os detalhes do plano aqui...",
    status: false,
  }), []);

  useEffect(() => {
    const fetchPlanoAula = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/detalhePlanoAula/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const planoData = response.data.planos;
        setPlano(planoData);
        setDetalhesPlano(planoData.detalhes_plano_completo || "");
        setRecursosGerais(planoData.recursos_gerais || []);
        setAvaliacao(planoData.avaliacao || "");
        setAulas(planoData.aulas || []);
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

  const handleSalvar = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");
      const markdownLimpo = detalhesPlano.replace(/\r\n/g, "\n");

      await axios.put(`/api/editarPlanoAula/${params.id}`, {
        detalhes_plano_completo: markdownLimpo,
        recursos_gerais: recursosGerais,
        avaliacao,
        aulas,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Plano de aula atualizado com sucesso!");
      router.push(`/detalhePlanoAula/${params.id}`);
    } catch (error) {
      console.error("Erro ao salvar plano:", error);
      alert("Erro ao salvar plano de aula.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRecursoChange = (index: number, value: string) => {
    const novos = [...recursosGerais];
    novos[index] = value;
    setRecursosGerais(novos);
  };

  const handleRemoveRecurso = (index: number) => {
    const novos = recursosGerais.filter((_, i) => i !== index);
    setRecursosGerais(novos);
  };

  const handleAddRecurso = () => {
    setRecursosGerais([...recursosGerais, ""]);
  };

  const handleAulaChange = (index: number, field: string, value: string) => {
    const novasAulas = [...aulas];
    novasAulas[index] = { ...novasAulas[index], [field]: value };
    setAulas(novasAulas);
  };

  const handleAtividadeChange = (
    aulaIndex: number,
    atividadeIndex: number,
    field: string,
    value: string
  ) => {
    const novasAulas = [...aulas];
    const atividades = [...novasAulas[aulaIndex].atividades];
    atividades[atividadeIndex] = { ...atividades[atividadeIndex], [field]: value };
    novasAulas[aulaIndex].atividades = atividades;
    setAulas(novasAulas);
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
          <PlanoContent>
            <Heading3>✏️ Editar Plano: {plano?.titulo}</Heading3>
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

            <Section>
              <Heading4>📦 Editar Recursos Gerais</Heading4>
              {recursosGerais.map((recurso, index) => (
                <RecursoRow key={index}>
                  <Input
                    type="text"
                    value={recurso}
                    onChange={(e) => handleRecursoChange(index, e.target.value)}
                    placeholder={`Recurso ${index + 1}`}
                    style={{ flex: 1 }}
                  />
                  <DeleteButton onClick={() => handleRemoveRecurso(index)}>
                    <span className="icon">X</span>
                  </DeleteButton>
                </RecursoRow>
              ))}
              <Button type="button" onClick={handleAddRecurso}>
                ➕ Adicionar Recurso
              </Button>
            </Section>

            <Section>
              <Heading4>📋 Editar Detalhes do Plano</Heading4>
              <SimpleMDE value={detalhesPlano} onChange={setDetalhesPlano} options={mdeOptions} />
            </Section>

            <Section>
              <Heading4>🎯 Editar Avaliação</Heading4>
              <Textarea
                value={avaliacao}
                onChange={(e) => setAvaliacao(e.target.value)}
                rows={4}
              />
            </Section>

            <Section>
              <Heading4>📚 Editar Aulas Planejadas</Heading4>
              <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                {aulas.map((aula, aulaIndex) => (
                  <AulaCard key={aula.id}>
                    <Paragraph><strong>Aula {aula.numero_aula}</strong></Paragraph>

                    <Paragraph><strong>Título:</strong></Paragraph>
                    <Input
                      type="text"
                      value={aula.titulo}
                      onChange={(e) => handleAulaChange(aulaIndex, "titulo", e.target.value)}
                      placeholder="Título da aula"
                      style={{ marginBottom: "10px" }}
                    />

                    <Paragraph><strong>Objetivo:</strong></Paragraph>
                    <Textarea
                      value={aula.objetivo}
                      onChange={(e) => handleAulaChange(aulaIndex, "objetivo", e.target.value)}
                      rows={3}
                    />

                    {Array.isArray(aula.atividades) && aula.atividades.length > 0 && (
                      <Section>
                        <Heading4 style={{ marginTop: "20px" }}>🧩 Atividades</Heading4>
                        {aula.atividades.map((atividade: { id: any; etapa: string | number | readonly string[] | undefined; tempo: string | number | readonly string[] | undefined; descricao: string | number | readonly string[] | undefined; }, atividadeIndex: number) => (
                          <AtividadeCard key={atividade.id || atividadeIndex}>
                            <Paragraph><strong>Etapa:</strong></Paragraph>
                            <Input
                              type="text"
                              value={atividade.etapa}
                              onChange={(e) =>
                                handleAtividadeChange(aulaIndex, atividadeIndex, "etapa", e.target.value)
                              }
                              placeholder="Etapa da atividade"
                              style={{ marginBottom: "10px" }}
                            />

                            <Paragraph><strong>Tempo:</strong></Paragraph>
                            <Input
                              type="text"
                              value={atividade.tempo}
                              onChange={(e) =>
                                handleAtividadeChange(aulaIndex, atividadeIndex, "tempo", e.target.value)
                              }
                              placeholder="Tempo estimado"
                              style={{ marginBottom: "10px" }}
                            />

                            <Paragraph><strong>Descrição:</strong></Paragraph>
                            <Textarea
                              value={atividade.descricao}
                              onChange={(e) =>
                                handleAtividadeChange(aulaIndex, atividadeIndex, "descricao", e.target.value)
                              }
                              rows={3}
                            />
                          </AtividadeCard>
                        ))}
                      </Section>
                    )}
                  </AulaCard>
                ))}
              </div>
            </Section>

            <FullWidthButton type="button" onClick={handleSalvar} disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar Alterações"}
            </FullWidthButton>

          </PlanoContent>
        
      </MainWrapper>
    </>
  );
};

export default EditPlanoAulaPage;
                              