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