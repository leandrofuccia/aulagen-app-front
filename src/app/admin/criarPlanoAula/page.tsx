/*"use client";

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
  Select,
} from "@/components/Common";
import Sidebar from "@/components/Sidebar";
import { FormGroup, FormRow, Label, MultiSelect, PageTitle } from "@/styles/criarPlanoStyles";

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
          <PageTitle>📚 Criar Plano de Aula</PageTitle>

          <StyledForm onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="ano">Ano/Série:</Label>
                <Select
                  id="ano"
                  value={anoSelecionado}
                  onChange={(e) => {
                    setAnoSelecionado(e.target.value);
                    setComponenteSelecionado("");
                  }}
                >
                  <option value="">Selecione</option>
                  {anosDisponiveis.map((ano) => (
                    <option key={ano} value={ano}>{ano}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="componente">Componente Curricular:</Label>
                <Select
                  id="componente"
                  value={componenteSelecionado}
                  onChange={(e) => setComponenteSelecionado(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {componentesFiltrados.map((comp) => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="filtro">🔍 Filtro BNCC:</Label>
                <Input
                  id="filtro"
                  type="text"
                  value={filtroDescricao}
                  onChange={(e) => setFiltroDescricao(e.target.value)}
                  placeholder="Digite um termo..."
                />
              </FormGroup>
            </FormRow>

            <FormGroup style={{ marginTop: "24px" }}>
              <Label htmlFor="descricao">Descrição (Habilidades BNCC):</Label>
              <MultiSelect id="descricao" multiple>
                {descricoesFiltradas.map((item) => (
                  <option key={item.codigo}>
                    {item.codigo} - {item.descricao}
                  </option>
                ))}
              </MultiSelect>
            </FormGroup>

            <Button type="submit" style={{ marginTop: "24px" }}>
              GERAR PLANO DE AULA
            </Button>
          </StyledForm>
        </main>
      </MainWrapper>
    </>
  );
};

export default CreatePlanoAulaPage;

*/

/*"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Loading from "@/components/Loading";

import {
  Button,
  Input,
  StyledForm,
  MainWrapper,
  Select,
} from "@/components/Common";

import {
  FormGroup,
  FormRow,
  Label,
  MultiSelect,
  PageTitle,
} from "@/styles/criarPlanoStyles";

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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const carregarDadosBNCC = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("/api/habilidadeBNCC", {
          headers: { Authorization: `Bearer ${token}` },
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

  const descricoesFiltradas = dadosBNCC.filter(
    (item) =>
      item.ano_serie === anoSelecionado &&
      item.componente_curricular === componenteSelecionado &&
      item.descricao.toLowerCase().includes(filtroDescricao.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setIsSaving(false);
      return;
    }

    const decoded = jwt.decode(token) as any;
    const credencialId = decoded.credencialId;
    const habilidadeSelecionada = descricoesFiltradas[0];

    if (!habilidadeSelecionada) {
      alert("Selecione uma habilidade BNCC.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await axios.post(
        "/api/createPlanoAula",
        {
          codigo_BNCC: habilidadeSelecionada.codigo,
          componente_Curricular: componenteSelecionado,
          serie: anoSelecionado,
          duracao_aula: "50",
          credencialId: Number(credencialId),
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
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {isSaving && <Loading />}

      <Sidebar links={[{ label: "Início", href: "/admin" }]} />

      <MainWrapper>
        <Header
          onLogout={() => router.push("/login")}
          onBack={() => router.back()}
        />

        <main>
          <PageTitle>📚 Criar Plano de Aula</PageTitle>

          <StyledForm onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label htmlFor="ano">Ano/Série:</Label>
                <Select
                  id="ano"
                  value={anoSelecionado}
                  onChange={(e) => {
                    setAnoSelecionado(e.target.value);
                    setComponenteSelecionado("");
                  }}
                >
                  <option value="">Selecione</option>
                  {anosDisponiveis.map((ano) => (
                    <option key={ano} value={ano}>{ano}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="componente">Componente Curricular:</Label>
                <Select
                  id="componente"
                  value={componenteSelecionado}
                  onChange={(e) => setComponenteSelecionado(e.target.value)}
                >
                  <option value="">Selecione</option>
                  {componentesFiltrados.map((comp) => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="filtro">🔍 Filtro BNCC:</Label>
                <Input
                  id="filtro"
                  type="text"
                  value={filtroDescricao}
                  onChange={(e) => setFiltroDescricao(e.target.value)}
                  placeholder="Digite um termo..."
                />
              </FormGroup>
            </FormRow>

            <FormGroup style={{ marginTop: "24px" }}>
              <Label htmlFor="descricao">Descrição (Habilidades BNCC):</Label>
              <MultiSelect id="descricao" multiple>
                {descricoesFiltradas.map((item) => (
                  <option key={item.codigo}>
                    {item.codigo} - {item.descricao}
                  </option>
                ))}
              </MultiSelect>
            </FormGroup>

            <Button type="submit" disabled={isSaving} style={{ marginTop: "24px" }}>
              {isSaving ? "Salvando..." : "GERAR PLANO DE AULA"}
            </Button>
          </StyledForm>
        </main>
      </MainWrapper>
    </>
  );
};

export default CreatePlanoAulaPage;

*/

/*"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Loading from "@/components/Loading";
import { ErrorPopup, MainWrapper, SuccessPopup } from "@/components/Common";

import {
  FormRow,
  FormGroup,
  Label,
  Select,
  Input,
  MultiSelect,
  PageTitle,
  FullWidthButton,
} from "@/styles/criarPlanoStyles";

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
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const carregarDadosBNCC = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("/api/habilidadeBNCC", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDadosBNCC(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados BNCC:", error);
      }
    };

    carregarDadosBNCC();
  }, []);

  const anosDisponiveis = [...new Set(dadosBNCC.map((item) => item.ano_serie))];

  const initialValues = {
    ano: "",
    componente: "",
    filtro: "",
    descricaoIndex: "",
  };

  const validationSchema = Yup.object().shape({
    ano: Yup.string().required("Ano/Série é obrigatório"),
    componente: Yup.string().required("Componente Curricular é obrigatório"),
    descricaoIndex: Yup.string().required("Selecione uma habilidade BNCC"),
  });

  return (
    <>
      {isSaving && <Loading />}

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

       <Sidebar links={[{ label: "Início", href: "/admin" }]} /> 

      <MainWrapper>
        <Header onLogout={() => router.push("/login")} onBack={() => router.back()} />

        <section style={{ padding: "32px", maxWidth: 1100, margin: "0 auto" }}>
          <PageTitle>📚 Criar Plano de Aula</PageTitle>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              setIsSaving(true);
              setErrorMessage(null);
              setSuccessMessage(null);

              try {
                const token = localStorage.getItem("token");
                if (!token) {
                  setErrorMessage("Sessão expirada. Faça login novamente.");
                  return;
                }

                const decoded = jwt.decode(token) as any;
                const credencialId = decoded?.credencialId;

                const descricoesFiltradas = dadosBNCC.filter(
                  (item) =>
                    item.ano_serie === values.ano &&
                    item.componente_curricular === values.componente &&
                    item.descricao.toLowerCase().includes(values.filtro.toLowerCase())
                );

                const selectedIndex = Number(values.descricaoIndex);
                const habilidadeSelecionada = descricoesFiltradas[selectedIndex];

                if (!habilidadeSelecionada) {
                  setErrorMessage("Selecione uma habilidade BNCC válida.");
                  return;
                }

                const payload = {
                  codigo_BNCC: habilidadeSelecionada.codigo,
                  componente_Curricular: values.componente,
                  serie: values.ano,
                  duracao_aula: "50",
                  credencialId: Number(credencialId),
                };

                const response = await axios.post("/api/createPlanoAula", payload, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                const planoId = response.data?.planoAula?.id;

                if (planoId) {
                  setSuccessMessage("Plano de aula gerado com sucesso!");
                  setTimeout(() => {
                    router.push(`/detalhePlanoAula/${planoId}`);
                  }, 800);
                } else {
                  setErrorMessage("Plano gerado, mas não foi possível obter o ID.");
                }
              } catch (err: any) {
                console.error("Erro ao gerar plano de aula:", err);
                const message = err?.response?.data?.message || "Erro ao gerar plano de aula.";
                setErrorMessage(message);
              } finally {
                setIsSaving(false);
                setSubmitting(false);
              }
            }}
          >
            {({ values, setFieldValue, isSubmitting }) => {
              const componentesFiltrados = [
                ...new Set(
                  dadosBNCC.filter((item) => item.ano_serie === values.ano).map((i) => i.componente_curricular)
                ),
              ];

              const descricoesFiltradas = dadosBNCC.filter(
                (item) =>
                  item.ano_serie === values.ano &&
                  item.componente_curricular === values.componente &&
                  item.descricao.toLowerCase().includes(values.filtro.toLowerCase())
              );

              return (
                <Form style={{ width: "100%" }}>
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="ano">Ano/Série:</Label>
                      <Select
                        id="ano"
                        name="ano"
                        value={values.ano}
                        onChange={(e) => {
                          setFieldValue("ano", e.target.value);
                          setFieldValue("componente", "");
                          setFieldValue("descricaoIndex", "");
                        }}
                      >
                        <option value="">Selecione</option>
                        {anosDisponiveis.map((ano) => (
                          <option key={ano} value={ano}>
                            {ano}
                          </option>
                        ))}
                      </Select>
                      <div style={{ color: "#f44336", marginTop: 6 }}>
                        <ErrorMessage name="ano" />
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="componente">Componente Curricular:</Label>
                      <Select
                        id="componente"
                        name="componente"
                        value={values.componente}
                        onChange={(e) => {
                          setFieldValue("componente", e.target.value);
                          setFieldValue("descricaoIndex", "");
                        }}
                      >
                        <option value="">Selecione</option>
                        {componentesFiltrados.map((comp) => (
                          <option key={comp} value={comp}>
                            {comp}
                          </option>
                        ))}
                      </Select>
                      <div style={{ color: "#f44336", marginTop: 6 }}>
                        <ErrorMessage name="componente" />
                      </div>
                    </FormGroup>
                  </FormRow>

                  <div style={{ marginTop: 16 }}>
                    <FormGroup>
                      <Label htmlFor="filtro">🔍 Filtro BNCC:</Label>
                      <Input
                        id="filtro"
                        name="filtro"
                        type="text"
                        value={values.filtro}
                        onChange={(e) => {
                          setFieldValue("filtro", e.target.value);
                          setFieldValue("descricaoIndex", "");
                        }}
                        placeholder="Digite um termo..."
                      />
                    </FormGroup>
                  </div>

                  <FormGroup style={{ marginTop: 24 }}>
                    <Label htmlFor="descricao">Descrição (Habilidades BNCC):</Label>

                    <MultiSelect
                      id="descricao"
                      name="descricaoIndex"
                      value={values.descricaoIndex}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue("descricaoIndex", e.target.value);
                      }}
                      size={6}
                    >
                      {descricoesFiltradas.length === 0 ? (
                        <option value="">Nenhuma habilidade encontrada</option>
                      ) : (
                        descricoesFiltradas.map((item, idx) => (
                          <option key={item.codigo} value={String(idx)}>
                            {item.codigo} - {item.descricao}
                          </option>
                        ))
                      )}
                    </MultiSelect>
                    <div style={{ color: "#f44336", marginTop: 6 }}>
                      <ErrorMessage name="descricaoIndex" />
                    </div>
                  </FormGroup>

                  <div style={{ marginTop: 24 }}>
                    <FullWidthButton type="submit" disabled={isSubmitting || isSaving}>
                      {isSaving ? "Salvando..." : "GERAR PLANO DE AULA"}
                    </FullWidthButton>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </section>
      </MainWrapper>
    </>
  );
};

export default CreatePlanoAulaPage;

*/


"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Loading from "@/components/Loading";
import { ErrorPopup, MainWrapper, SuccessPopup } from "@/components/Common";

import {
  FormRow,
  FormGroup,
  Label,
  Select,
  Input,
  MultiSelect,
  PageTitle,
  FullWidthButton,
} from "@/styles/criarPlanoStyles";

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
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const carregarDadosBNCC = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("/api/habilidadeBNCC", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("response.data", response.data);
        setDadosBNCC(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados BNCC:", error);
      }
    };

    carregarDadosBNCC();
  }, []);

  //const anosDisponiveis = [...new Set(dadosBNCC.map((item) => item.ano_serie))];
  const anosDisponiveis = [
    ...new Map(
      dadosBNCC.map((item) => [`${item.ano_serie}-${item.etapa_ensino}`, item])
    ).values(),
  ];


  const initialValues = {
    ano: "",
    componente: "",
    filtro: "",
    codigoBNCC: "",
  };

  const validationSchema = Yup.object().shape({
    ano: Yup.string().required("Ano/Série é obrigatório"),
    componente: Yup.string().required("Componente Curricular é obrigatório"),
    codigoBNCC: Yup.string().required("Selecione uma habilidade BNCC"),
  });

  return (
    <>
      {isSaving && <Loading />}

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

      <MainWrapper>
        <Header onLogout={() => router.push("/login")} onBack={() => router.back()} />

        <section style={{ padding: "32px", maxWidth: 1100, margin: "0 auto" }}>
          <PageTitle>📚 Criar Plano de Aula</PageTitle>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              setIsSaving(true);
              setErrorMessage(null);
              setSuccessMessage(null);

              try {
                const token = localStorage.getItem("token");
                if (!token) {
                  setErrorMessage("Sessão expirada. Faça login novamente.");
                  return;
                }

                const decoded = jwt.decode(token) as any;
                const credencialId = decoded?.credencialId;

                const habilidadeSelecionada = dadosBNCC.find(
                  (item) => item.codigo === values.codigoBNCC
                );

                if (!habilidadeSelecionada) {
                  setErrorMessage("Selecione uma habilidade BNCC válida.");
                  return;
                }

                const payload = {
                  codigo_BNCC: habilidadeSelecionada.codigo,
                  componente_Curricular: values.componente,
                  serie: values.ano,
                  duracao_aula: "50",
                  credencialId: Number(credencialId),
                };

                const response = await axios.post("/api/createPlanoAula", payload, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                const planoId = response.data?.planoAula?.id;

                if (planoId) {
                  setSuccessMessage("Plano de aula gerado com sucesso!");
                  setTimeout(() => {
                    router.push(`/detalhePlanoAula/${planoId}`);
                  }, 800);
                } else {
                  setErrorMessage("Plano gerado, mas não foi possível obter o ID.");
                }
              } catch (err: any) {
                console.error("Erro ao gerar plano de aula:", err);
                const message = err?.response?.data?.message || "Erro ao gerar plano de aula.";
                setErrorMessage(message);
              } finally {
                setIsSaving(false);
                setSubmitting(false);
              }
            }}
          >
            {({ values, setFieldValue, isSubmitting }) => {
              const componentesFiltrados = [
                ...new Set(
                  dadosBNCC
                    .filter((item) => item.ano_serie === values.ano)
                    .map((i) => i.componente_curricular)
                ),
              ];

              const descricoesFiltradas = dadosBNCC.filter(
                (item) =>
                  item.ano_serie === values.ano &&
                  item.componente_curricular === values.componente &&
                  item.descricao.toLowerCase().includes(values.filtro.toLowerCase())
              );

              return (
                <Form style={{ width: "100%" }}>
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="ano">Ano/Série:</Label>
                      <Select
                        id="ano"
                        name="ano"
                        value={values.ano}
                        onChange={(e) => {
                          setFieldValue("ano", e.target.value);
                          setFieldValue("componente", "");
                          setFieldValue("codigoBNCC", "");
                        }}
                      >
                        <option value="">Selecione</option>
                        {anosDisponiveis.map((ano) => (
                          <option key={ano.ano_serie} value={ano.ano_serie}>
                            {ano.ano_serie} - {ano.etapa_ensino}
                          </option>
                        ))}
                      </Select>
                      <ErrorMessage name="ano">
                        {(msg) => <div style={{ color: "#f44336", marginTop: 6 }}>{msg}</div>}
                      </ErrorMessage>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="componente">Componente Curricular:</Label>
                      <Select
                        id="componente"
                        name="componente"
                        value={values.componente}
                        onChange={(e) => {
                          setFieldValue("componente", e.target.value);
                          setFieldValue("codigoBNCC", "");
                        }}
                      >
                        <option value="">Selecione</option>
                        {componentesFiltrados.map((comp) => (
                          <option key={comp} value={comp}>
                            {comp}
                          </option>
                        ))}
                      </Select>
                      <ErrorMessage name="componente">
                        {(msg) => <div style={{ color: "#f44336", marginTop: 6 }}>{msg}</div>}
                      </ErrorMessage>
                    </FormGroup>
                  </FormRow>

                  <FormGroup style={{ marginTop: 16 }}>
                    <Label htmlFor="filtro">🔍 Filtro BNCC:</Label>
                    <Input
                      id="filtro"
                      name="filtro"
                      type="text"
                      value={values.filtro}
                      onChange={(e) => {
                        setFieldValue("filtro", e.target.value);
                        setFieldValue("codigoBNCC", "");
                      }}
                      placeholder="Digite um termo..."
                    />
                  </FormGroup>

                  <FormGroup style={{ marginTop: 24 }}>
                    <Label htmlFor="codigoBNCC">Descrição (Habilidades BNCC):</Label>
                    <MultiSelect
                      id="codigoBNCC"
                      name="codigoBNCC"
                      value={values.codigoBNCC}
                      onChange={(e) => setFieldValue("codigoBNCC", e.target.value)}
                      size={6}
                    >
                      <option value="">Selecione uma habilidade</option>
                      {descricoesFiltradas.map((item) => (
                        <option key={item.codigo} value={item.codigo}>
                          {item.codigo} - {item.descricao}
                        </option>
                      ))}
                    </MultiSelect>
                    <ErrorMessage name="codigoBNCC">
                      {(msg) => <div style={{ color: "#f44336", marginTop: 6 }}>{msg}</div>}
                    </ErrorMessage>
                  </FormGroup>

                  <div style={{ marginTop: 24 }}>
                    <FullWidthButton type="submit" disabled={isSubmitting || isSaving}>
                      {isSaving ? "Salvando..." : "GERAR PLANO DE AULA"}
                    </FullWidthButton>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </section>
      </MainWrapper>
    </>
  );
};

export default CreatePlanoAulaPage;