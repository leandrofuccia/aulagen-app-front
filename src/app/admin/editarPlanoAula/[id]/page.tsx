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


/*"use client";

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
      <Sidebar links={[{ label: "Início", href: "/admin" }]} />
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

*/


// src/app/admin/editarPlanoAula/[id]/page.tsx
"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "simplemde/dist/simplemde.min.css";

import Header from "@/components/Header";
import {
  ErrorPopup,
  SuccessPopup,
  MainWrapper,
  Paragraph,
  PlanoContent,
  Heading3,
  Heading4,
} from "@/components/Common";
import Loading from "@/components/Loading";
import Sidebar from "@/components/Sidebar";
import { IPlanoAulaDetalhado } from "@/types/planoAulaDetalhado";

import {
  Section,
  Card,
  Textarea,
  RecursoRow,
  AulaCard,
  AtividadeCard,
  Input,
  Button as BaseButton,
  DeleteButton,
  Button,
} from "@/styles/editarPlanoStyles";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const stickyBannerStyle: React.CSSProperties = {
  position: "sticky",
  top: 88,
  zIndex: 60,
  background: "#fff7f0",
  border: "1px solid #ffd5b3",
  padding: "10px 14px",
  borderRadius: 6,
  marginBottom: 12,
  display: "flex",
  gap: 12,
  alignItems: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
};

const EditPlanoAulaPage = () => {
  const params = useParams();
  const router = useRouter();

  const [plano, setPlano] = useState<IPlanoAulaDetalhado | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  // para forçar banner quando backend retornar erros (opcional)
  const [showServerValidationBanner, setShowServerValidationBanner] = useState(false);

  const mdeOptions = useMemo(
    () => ({
      spellChecker: false,
      placeholder: "Edite os detalhes do plano aqui...",
      status: false,
    }),
    []
  );

  // manter todos os hooks no topo
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const fetchPlanoAula = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/detalhePlanoAula/${params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const planoData = response.data.planos;
        setPlano(planoData);
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

  // renderiza mensagens complexas (string | array | objeto)
  const renderErrorMessage = (msg: unknown): React.ReactNode => {
    if (typeof msg === "string") return msg;
    if (Array.isArray(msg)) {
      return msg.map((m, i) => (
        <div key={i} style={{ marginLeft: 12 }}>
          {renderErrorMessage(m)}
        </div>
      ));
    }
    if (msg && typeof msg === "object") {
      try {
        const values = Object.values(msg as Record<string, any>);
        for (const v of values) {
          const rendered = renderErrorMessage(v);
          if (rendered) return rendered;
        }
      } catch (e) {
        // ignore
      }
    }
    return null;
  };

  // converte errors (possivelmente aninhado ou em chave pontuada) para lista plana {path,msg}
  const flattenErrors = (obj: any, prefix = ""): Array<{ path: string; msg: any }> => {
    const out: Array<{ path: string; msg: any }> = [];
    if (obj == null) return out;

    // caso já seja um objeto com chaves pontuadas (ex: { 'aulas.0.titulo': '...' })
    const hasDotKeys = Object.keys(obj).some((k) => k.includes(".") || /\[\d+\]/.test(k));
    if (hasDotKeys) {
      for (const [k, v] of Object.entries(obj)) {
        out.push({ path: k, msg: v });
      }
      return out;
    }

    // caso seja aninhado (obj.aulas = [{titulo: ...}, ...])
    if (typeof obj === "string") {
      out.push({ path: prefix, msg: obj });
      return out;
    }
    if (Array.isArray(obj)) {
      obj.forEach((item, i) => {
        const p = prefix ? `${prefix}.${i}` : `${i}`;
        out.push(...flattenErrors(item, p));
      });
      return out;
    }
    if (typeof obj === "object") {
      Object.entries(obj).forEach(([k, v]) => {
        const p = prefix ? `${prefix}.${k}` : k;
        out.push(...flattenErrors(v, p));
      });
      return out;
    }
    return out;
  };

  // encontra primeiro caminho de erro — prioriza chaves pontuadas (caso existam)
  const findFirstErrorPath = (errorsObj: any): string | null => {
    if (!errorsObj) return null;
    // se keys pontuadas existirem, usa a primeira
    const keys = Object.keys(errorsObj);
    const dottedKey = keys.find((k) => k.includes(".") || /\[\d+\]/.test(k));
    if (dottedKey) return dottedKey;

    const flat = flattenErrors(errorsObj);
    if (flat.length === 0) return null;
    return flat[0].path || null;
  };

  // tenta localizar elemento no DOM a partir do path; aceita notações: 'aulas.0.titulo' e 'aulas[0].titulo'
  const scrollToPath = (path: string): boolean => {
    if (!path) return false;

    const trySelectors = (p: string) => {
      // name exato
      let el = document.querySelector(`[name="${p}"]`) as HTMLElement | null;
      if (el) return el;
      // data-field
      el = document.querySelector(`[data-field="${p}"]`) as HTMLElement | null;
      if (el) return el;
      // name que comece com (prefix)
      el = document.querySelector(`[name^="${p}"]`) as HTMLElement | null;
      if (el) return el;
      // tenta último segmento (ex: 'titulo')
      const last = p.split(".").slice(-1)[0];
      if (last) {
        el = document.querySelector(`[name$=".${last}"]`) as HTMLElement | null;
        if (el) return el;
        el = document.querySelector(`[data-field$=".${last}"]`) as HTMLElement | null;
        if (el) return el;
        el = document.querySelector(`[name*="${last}"]`) as HTMLElement | null;
        if (el) return el;
      }
      return null;
    };

    // gera candidatos (ponto e colchetes)
    const candidates = [path, path.replace(/\.(\d+)\./g, "[$1].").replace(/\.(\d+)$/g, "[$1]"), path.replace(/\[(\d+)\]/g, ".$1")];
    for (const cand of candidates) {
      const el = trySelectors(cand);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        try {
          (el as HTMLElement).focus({ preventScroll: true });
        } catch (e) {}
        // highlight temporário
        el.classList.add("error-highlight");
        setTimeout(() => el.classList.remove("error-highlight"), 2000);
        return true;
      }
    }
    return false;
  };

  const jumpToFirstError = (errorsObj: any) => {
    if (!errorsObj) return;
    const first = findFirstErrorPath(errorsObj);
    if (first) {
      const ok = scrollToPath(first);
      if (ok) return;
    }
    // fallback: tenta chaves de topo
    const keys = Object.keys(errorsObj || {});
    for (const key of keys) {
      if (scrollToPath(key)) return;
    }
  };

  if (isLoading) return <Loading />;
  if (errorMessage)
    return (
      <ErrorPopup>
        {errorMessage}
        <button onClick={() => setErrorMessage(null)}>✖</button>
      </ErrorPopup>
    );

  const initialValues = {
    detalhes_plano_completo: plano?.detalhes_plano_completo ?? "",
    recursosGerais: Array.isArray(plano?.recursos_gerais) ? plano!.recursos_gerais : [""],
    avaliacao: plano?.avaliacao ?? "",
    aulas:
      Array.isArray(plano?.aulas) && plano!.aulas.length > 0
        ? plano!.aulas.map((a: any) => ({
            id: a.id,
            numero_aula: a.numero_aula,
            titulo: a.titulo ?? "",
            objetivo: a.objetivo ?? "",
            duracao: a.duracao ?? "",
            atividades: Array.isArray(a.atividades)
              ? a.atividades.map((at: any) => ({
                  id: at.id,
                  etapa: at.etapa ?? "",
                  tempo: at.tempo ?? "",
                  descricao: at.descricao ?? "",
                }))
              : [],
          }))
        : [],
  };

  const validationSchema = Yup.object().shape({
    detalhes_plano_completo: Yup.string().required("Detalhes do plano são obrigatórios"),
    recursosGerais: Yup.array().of(Yup.string().trim().required("Recurso não pode ficar vazio")),
    avaliacao: Yup.string().trim().required("Avaliação é obrigatória"),
    aulas: Yup.array()
      .of(
        Yup.object().shape({
          titulo: Yup.string().trim().required("Título da aula é obrigatório"),
          objetivo: Yup.string().trim().required("Objetivo é obrigatório"),
          duracao: Yup.string().nullable(),
          atividades: Yup.array().of(
            Yup.object().shape({
              etapa: Yup.string().trim().required("Etapa é obrigatória"),
              tempo: Yup.string().nullable(),
              descricao: Yup.string().trim().required("Descrição é obrigatória"),
            })
          ),
        })
      )
      .min(1, "Deve existir pelo menos uma aula"),
  });

  return (
    <>
      <Sidebar links={[{ label: "Início", href: "/admin" }]} />
      <MainWrapper>
        <Header onLogout={handleLogout} onBack={() => router.back()} />
        <PlanoContent>
          <Heading3>✏️ Editar Plano: {plano?.titulo}</Heading3>
          <Paragraph>
            <strong>Duração Total:</strong> {plano?.duracao_total}
          </Paragraph>

          {plano?.habilidade_bncc ? (
            <>
              <Paragraph>
                <strong>Componente Curricular:</strong> {plano.habilidade_bncc.componenteCurricular}
              </Paragraph>
              <Paragraph>
                <strong>Ano/Série:</strong> {plano.habilidade_bncc.anoSerie}
              </Paragraph>
              <Paragraph>
                <strong>Código BNCC:</strong> {plano.habilidade_bncc.codigo}
              </Paragraph>
              <Paragraph>
                <strong>Habilidade BNCC:</strong> {plano.habilidade_bncc.descricao}
              </Paragraph>
            </>
          ) : (
            <Paragraph style={{ color: "#888" }}>
              <strong>Habilidade BNCC:</strong> Não vinculada a este plano.
            </Paragraph>
          )}

          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              setSubmitting(true);
              setIsSaving(true);
              setErrorMessage(null);
              setSuccessMessage(null);
              // reset server banner
              setShowServerValidationBanner(false);

              // validação manual para capturar mensagens do Yup e setErrors com paths
              try {
                await validationSchema.validate(values, { abortEarly: false });
              } catch (validationError: any) {
                const errObj: any = {};
                if (validationError.inner && Array.isArray(validationError.inner)) {
                  validationError.inner.forEach((e: any) => {
                    if (e.path && !(e.path in errObj)) errObj[e.path] = e.message;
                  });
                }
                setErrors(errObj);
                // faz com que o banner apareça (usamos formik.submitCount também)
                // jump para o primeiro erro encontrado
                jumpToFirstError(errObj);
                setSubmitting(false);
                setIsSaving(false);
                return;
              }

              try {
                const token = localStorage.getItem("token");
                const markdownLimpo = values.detalhes_plano_completo.replace(/\r\n/g, "\n");

                await axios.put(
                  `/api/editarPlanoAula/${params.id}`,
                  {
                    detalhes_plano_completo: markdownLimpo,
                    recursos_gerais: values.recursosGerais,
                    avaliacao: values.avaliacao,
                    aulas: values.aulas,
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  }
                );

                setSuccessMessage("Plano de aula atualizado com sucesso!");
                // esconde banner (caso estivesse visível)
                setShowServerValidationBanner(false);
                setTimeout(() => {
                  setSuccessMessage(null);
                  router.push(`/detalhePlanoAula/${params.id}`);
                }, 1000);
              } catch (err: any) {
                console.error("Erro ao salvar plano:", err);
                const message = err?.response?.data?.message || "Erro ao salvar plano de aula.";
                setErrorMessage(message);
                // se backend retornou erros estruturados, preenche setErrors e mostra banner
                const serverErrors = err?.response?.data?.errors;
                if (serverErrors) {
                  setShowServerValidationBanner(true);
                  setErrors(serverErrors);
                  jumpToFirstError(serverErrors);
                }
              } finally {
                setIsSaving(false);
                setSubmitting(false);
              }
            }}
          >
            {({ values, setFieldValue, setFieldTouched, isSubmitting, errors, touched, submitCount }) => {
              // banner aparece se já submeteu ou se servidor pediu para exibir
              const showBanner = submitCount > 0 || showServerValidationBanner;

              // controle para exibir mensagens inline: se campo foi tocado (touched) ou se já submeteu
              const showFieldError = (path: string) => {
                // getIn helper simples
                const getIn = (obj: any, p: string) => {
                  if (!obj) return undefined;
                  const parts = p.replace(/\[(\d+)\]/g, ".$1").split(".");
                  let cur = obj;
                  for (const part of parts) {
                    if (cur == null) return undefined;
                    cur = cur[part as any];
                  }
                  return cur;
                };
                const touchedVal = getIn(touched, path);
                return !!touchedVal || submitCount > 0 || showServerValidationBanner;
              };

              const flatErrors = flattenErrors(errors);

              return (
                <Form ref={formRef}>
                  {/* Banner: só após submit (ou backend) */}
                  {showBanner && flatErrors.length > 0 && (
                    <div style={stickyBannerStyle} role="alert">
                      <div style={{ fontWeight: 700 }}>
                        Verifique o formulário — {flatErrors.length} erro{flatErrors.length > 1 ? "s" : ""}
                      </div>
                      <div style={{ marginLeft: 8 }}>
                        {flatErrors.slice(0, 5).map(({ path, msg }) => (
                          <div
                            key={path}
                            style={{ cursor: "pointer", textDecoration: "underline", color: "#b44" }}
                            onClick={() => scrollToPath(path)}
                          >
                            {path}: {renderErrorMessage(msg)}
                          </div>
                        ))}
                        {flatErrors.length > 5 && <div style={{ color: "#666" }}>+{flatErrors.length - 5} mais</div>}
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        <button
                          type="button"
                          onClick={() => jumpToFirstError(errors)}
                          style={{
                            background: "#fff",
                            border: "1px solid #ffd5b3",
                            padding: "6px 10px",
                            borderRadius: 6,
                            cursor: "pointer",
                          }}
                        >
                          Ir para primeiro erro
                        </button>
                      </div>
                    </div>
                  )}

                  <Section>
                    <Heading4>📦 Editar Recursos Gerais</Heading4>

                    <FieldArray name="recursosGerais">
                      {(arrayHelpers) => (
                        <>
                          {values.recursosGerais && values.recursosGerais.length > 0 ? (
                            values.recursosGerais.map((recurso: string, index: number) => {
                              const fieldPath = `recursosGerais.${index}`;
                              return (
                                <RecursoRow key={index}>
                                  <Input
                                    name={fieldPath}
                                    data-field={fieldPath}
                                    value={recurso}
                                    onChange={(e) => setFieldValue(fieldPath, e.target.value)}
                                    onFocus={() => {
                                      setFieldTouched(fieldPath, true, true);
                                    }}
                                    placeholder={`Recurso ${index + 1}`}
                                    style={{ flex: 1 }}
                                  />
                                  <DeleteButton type="button" onClick={() => arrayHelpers.remove(index)}>
                                    <span className="icon">X</span>
                                  </DeleteButton>
                                  <div style={{ color: "#f44336", marginTop: 6 }}>
                                    {showFieldError(fieldPath) && <ErrorMessage name={fieldPath} />}
                                  </div>
                                </RecursoRow>
                              );
                            })
                          ) : (
                            <Paragraph>Nenhum recurso cadastrado</Paragraph>
                          )}

                          <Button type="button" onClick={() => arrayHelpers.push("")} style={{ marginTop: 8 }}>
                            ➕ Adicionar Recurso
                          </Button>
                        </>
                      )}
                    </FieldArray>
                  </Section>

                  <Section>
                    <Heading4>📋 Editar Detalhes do Plano</Heading4>
                    <SimpleMDE
                      value={values.detalhes_plano_completo}
                      onChange={(val: string) => {
                        setFieldValue("detalhes_plano_completo", val);
                        setFieldTouched("detalhes_plano_completo", true, true);
                      }}
                      options={mdeOptions}
                    />
                    <div style={{ color: "#f44336", marginTop: 6 }}>
                      {showFieldError("detalhes_plano_completo") && <ErrorMessage name="detalhes_plano_completo" />}
                    </div>
                  </Section>

                  <Section>
                    <Heading4>🎯 Editar Avaliação</Heading4>
                    <Textarea
                      name="avaliacao"
                      data-field="avaliacao"
                      value={values.avaliacao}
                      onChange={(e) => setFieldValue("avaliacao", e.target.value)}
                      onFocus={() => setFieldTouched("avaliacao", true, true)}
                      rows={4}
                    />
                    <div style={{ color: "#f44336", marginTop: 6 }}>
                      {showFieldError("avaliacao") && <ErrorMessage name="avaliacao" />}
                    </div>
                  </Section>

                  <Section>
                    <Heading4>📚 Editar Aulas Planejadas</Heading4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                      <FieldArray name="aulas">
                        {(aulasHelpers) =>
                          values.aulas && values.aulas.length > 0 ? (
                            values.aulas.map((aula: any, aulaIndex: number) => {
                              const aulaPrefix = `aulas.${aulaIndex}`;
                              return (
                                <AulaCard key={aula.id ?? aulaIndex}>
                                  <Paragraph>
                                    <strong>Aula {aula.numero_aula}</strong>
                                  </Paragraph>

                                  <Paragraph>
                                    <strong>Título:</strong>
                                  </Paragraph>
                                  <Input
                                    name={`${aulaPrefix}.titulo`}
                                    data-field={`${aulaPrefix}.titulo`}
                                    value={aula.titulo}
                                    onChange={(e) => setFieldValue(`${aulaPrefix}.titulo`, e.target.value)}
                                    onFocus={() => setFieldTouched(`${aulaPrefix}.titulo`, true, true)}
                                    placeholder="Título da aula"
                                    style={{ marginBottom: "10px" }}
                                  />
                                  <div style={{ color: "#f44336", marginTop: 6 }}>
                                    {showFieldError(`${aulaPrefix}.titulo`) && <ErrorMessage name={`${aulaPrefix}.titulo`} />}
                                  </div>

                                  <Paragraph>
                                    <strong>Objetivo:</strong>
                                  </Paragraph>
                                  <Textarea
                                    name={`${aulaPrefix}.objetivo`}
                                    data-field={`${aulaPrefix}.objetivo`}
                                    value={aula.objetivo}
                                    onChange={(e) => setFieldValue(`${aulaPrefix}.objetivo`, e.target.value)}
                                    onFocus={() => setFieldTouched(`${aulaPrefix}.objetivo`, true, true)}
                                    rows={3}
                                  />
                                  <div style={{ color: "#f44336", marginTop: 6 }}>
                                    {showFieldError(`${aulaPrefix}.objetivo`) && <ErrorMessage name={`${aulaPrefix}.objetivo`} />}
                                  </div>

                                  {Array.isArray(aula.atividades) && aula.atividades.length > 0 && (
                                    <Section>
                                      <Heading4 style={{ marginTop: "20px" }}>🧩 Atividades</Heading4>
                                      <FieldArray name={`${aulaPrefix}.atividades`}>
                                        {(actsHelpers) =>
                                          aula.atividades.map((atividade: any, atividadeIndex: number) => {
                                            const actPath = `${aulaPrefix}.atividades.${atividadeIndex}`;
                                            return (
                                              <AtividadeCard key={atividade.id ?? atividadeIndex}>
                                                <Paragraph>
                                                  <strong>Etapa:</strong>
                                                </Paragraph>
                                                <Input
                                                  name={`${actPath}.etapa`}
                                                  data-field={`${actPath}.etapa`}
                                                  value={atividade.etapa}
                                                  onChange={(e) => setFieldValue(`${actPath}.etapa`, e.target.value)}
                                                  onFocus={() => setFieldTouched(`${actPath}.etapa`, true, true)}
                                                  placeholder="Etapa da atividade"
                                                  style={{ marginBottom: "10px" }}
                                                />
                                                <div style={{ color: "#f44336", marginTop: 6 }}>
                                                  {showFieldError(`${actPath}.etapa`) && <ErrorMessage name={`${actPath}.etapa`} />}
                                                </div>

                                                <Paragraph>
                                                  <strong>Tempo:</strong>
                                                </Paragraph>
                                                <Input
                                                  name={`${actPath}.tempo`}
                                                  data-field={`${actPath}.tempo`}
                                                  value={atividade.tempo}
                                                  readOnly
                                                  onChange={() => {}}
                                                  placeholder="Tempo estimado"
                                                  style={{
                                                    marginBottom: "10px",
                                                    backgroundColor: "#f5f5f5",
                                                    cursor: "not-allowed",
                                                  }}
                                                />

                                                <Paragraph>
                                                  <strong>Descrição:</strong>
                                                </Paragraph>
                                                <Textarea
                                                  name={`${actPath}.descricao`}
                                                  data-field={`${actPath}.descricao`}
                                                  value={atividade.descricao}
                                                  onChange={(e) => setFieldValue(`${actPath}.descricao`, e.target.value)}
                                                  onFocus={() => setFieldTouched(`${actPath}.descricao`, true, true)}
                                                  rows={3}
                                                />
                                                <div style={{ color: "#f44336", marginTop: 6 }}>
                                                  {showFieldError(`${actPath}.descricao`) && <ErrorMessage name={`${actPath}.descricao`} />}
                                                </div>
                                              </AtividadeCard>
                                            );
                                          })
                                        }
                                      </FieldArray>
                                    </Section>
                                  )}
                                </AulaCard>
                              );
                            })
                          ) : (
                            <Paragraph>Nenhuma aula cadastrada</Paragraph>
                          )
                        }
                      </FieldArray>
                    </div>
                  </Section>

                  {successMessage && (
                    <SuccessPopup>
                      {successMessage}
                      <button onClick={() => setSuccessMessage(null)}>✖</button>
                    </SuccessPopup>
                  )}

                  {errorMessage && (
                    <ErrorPopup>
                      {errorMessage}
                      <button onClick={() => setErrorMessage(null)}>✖</button>
                    </ErrorPopup>
                  )}

                  <div style={{ marginTop: 8 }}>
                    <BaseButton type="submit" disabled={isSubmitting || isSaving} style={{ width: "100%" }}>
                      {isSaving ? "Salvando..." : "Salvar Alterações"}
                    </BaseButton>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </PlanoContent>
      </MainWrapper>

      {/* Highlight CSS */}
      <style jsx>{`
        .error-highlight {
          box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.18);
          transition: box-shadow 0.25s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default EditPlanoAulaPage;
