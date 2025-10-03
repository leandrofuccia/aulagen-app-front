"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import IconButton from "@/components/IconButton";
import Loading from "@/components/Loading";
import {
  Heading4,
  PlanoItemFlex,
  PlanoList,
  HeaderActions,
  ResponsiveContainer,
  MainWrapper,
  ButtonGroup,
  SuccessPopup,
  ErrorPopup,
  WarningPopup,
  SearchBar,
  PaginationButton,
  PaginationWrapper,
  SecondaryButton,
  PrimaryButton,
  PaginationLink,
} from "@/components/Common";
import { IPlanoAula } from "@/types/planoAula";

const AdminPage = () => {
  const [userProfile, setUserProfile] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);


  const [searchQuery, setSearchQuery] = useState("");
  const [planoAula, setPlanoAula] = useState<IPlanoAula[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const credencialId = localStorage.getItem("credencialId");
        const response = await axios.get(`/api/usuario/${credencialId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const usuario = response.data[0];
        setUserProfile(usuario.ocupacaoid);

        if (usuario.ocupacaoid !== 2) {
          setWarningMessage("Acesso restrito. Apenas professores podem acessar essa página.");
        }
      } catch (error: any) {
        const message = error?.response?.data?.message || "Erro ao verificar ocupação.";
        setErrorMessage(message);
        router.push("/login");
      }
    };

    const fetchPlanos = async () => {
      try {
        const token = localStorage.getItem("token");
        const credencialId = localStorage.getItem("credencialId");
        const response = await axios.get(`/api/planoAula/${credencialId}?page=1&limit=99999`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const planos = response.data.planos || [];

        const normalized = planos.map((p: any) => ({
          ...p,
          habilidade_bncc: Array.isArray(p.habilidade_bncc)
            ? p.habilidade_bncc
            : p.habilidade_bncc
            ? [p.habilidade_bncc]
            : [],
        }));

        setPlanoAula(normalized);
      } catch (error: any) {
        const message = error?.response?.data?.message || "Erro ao buscar planos de aula.";
        setErrorMessage(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
    fetchPlanos();
  }, [router]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  /*const handleDelete = async (planoId: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/deletePlanoAula/${planoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage("Plano de Aula excluído com sucesso!");
      setPlanoAula((prev) => prev.filter((p) => p.id !== planoId));
    } catch (error: any) {
      const message = error?.response?.data?.message || "Erro ao excluir plano de aula.";
      setErrorMessage(message);
    }
  };*/

  const handleDelete = async (planoId: number) => {
    setConfirmDeleteId(planoId); // ativa o popup de confirmação
  };

  const confirmarExclusao = async () => {
  if (!confirmDeleteId) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/deletePlanoAula/${confirmDeleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage("Plano de Aula excluído com sucesso!");
      setPlanoAula((prev) => prev.filter((p) => p.id !== confirmDeleteId));
    } catch (error: any) {
      const message = error?.response?.data?.message || "Erro ao excluir plano de aula.";
      setErrorMessage(message);
    } finally {
      setConfirmDeleteId(null); // fecha o popup
    }
  };



  const handleEdit = (planoId: number) => {
    router.push(`/admin/editarPlanoAula/${planoId}`);
  };

  const handleDetalhePlano = (planoId: number) => {
    router.push(`/detalhePlanoAula/${planoId}`);
  };

  const handleCreate = () => {
    router.push("/admin/criarPlanoAula");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (isLoading) return <Loading />;

  const filteredPlanos = planoAula.filter((p) => {
    const query = searchQuery.toLowerCase();
    const tituloMatch = p.titulo?.toLowerCase().includes(query);
    const habilidadeMatch =
      Array.isArray(p.habilidade_bncc) &&
      p.habilidade_bncc.some((h) =>
        h?.codigo?.toLowerCase().includes(query)
      );
    return tituloMatch || habilidadeMatch;
  });

  const totalPages = Math.ceil(filteredPlanos.length / itemsPerPage);
  const paginatedPlanos = filteredPlanos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>

    {confirmDeleteId !== null && (
        <WarningPopup>
          Tem certeza que deseja excluir este plano de aula?
          <div>
            <button onClick={confirmarExclusao}>Confirmar</button>
            <button onClick={() => setConfirmDeleteId(null)}>Cancelar</button>
          </div>
        </WarningPopup>
      )}

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

      {/* <Sidebar links={[{ label: "Início", href: "/admin" }]} /> */}
      <MainWrapper>
        <Header onLogout={handleLogout} />
        <SearchBar
          type="text"
          placeholder="Buscar plano de aula por título ou código BNCC..."
          value={searchQuery}
          onChange={handleSearch}
        />

        <ResponsiveContainer>
          <HeaderActions>
            <Heading4>Administração de Planos de Aula</Heading4>

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
            {warningMessage && (
              <WarningPopup>
                {warningMessage}
                <button onClick={() => setWarningMessage(null)}>✖</button>
              </WarningPopup>
            )}

            <PrimaryButton onClick={() => handleCreate()}>
              Criar Plano de Aula
            </PrimaryButton>
            
          </HeaderActions>
        </ResponsiveContainer>

        <main>
          <PlanoList>
            {paginatedPlanos.map((plano: any) => (
              <PlanoItemFlex key={plano.id}>
                <div>
                  <div>{plano.titulo}</div>
                  {Array.isArray(plano.habilidade_bncc) && plano.habilidade_bncc.length > 0 ? (
                    plano.habilidade_bncc.map((hab: any, idx: number) => (
                      <div key={idx} style={{ marginBottom: "8px" }}>
                        <p><strong>Código:</strong> {hab.codigo}</p>
                        <p><strong>Ano/Série:</strong> {hab.anoSerie}</p>
                        <p><strong>Componente:</strong> {hab.componenteCurricular}</p>
                        <p><strong>Etapa:</strong> {hab.etapaEnsino}</p>
                      </div>
                    ))
                  ) : (
                    <div><em>Sem habilidades registradas</em></div>
                  )}
                </div>

                <ButtonGroup>
                  <PrimaryButton onClick={() => handleDetalhePlano(plano.id)}>
                    Visualizar
                  </PrimaryButton>

                  <PrimaryButton onClick={() => handleEdit(plano.id)}>
                    Editar
                  </PrimaryButton>

                  <SecondaryButton onClick={() => handleDelete(plano.id)}>
                    Deletar
                  </SecondaryButton>
                 
                </ButtonGroup>
              </PlanoItemFlex>
            ))}
          </PlanoList>

          <PaginationWrapper>
            <PaginationLink
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ◀ Página anterior
            </PaginationLink>

            <span style={{ fontWeight: "bold", fontSize: "16px" }}>
              Página {currentPage} de {totalPages}
            </span>

            <PaginationLink
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima página ▶
            </PaginationLink>
          </PaginationWrapper>

        </main>
      </MainWrapper>
    </>
  );
};

export default AdminPage;