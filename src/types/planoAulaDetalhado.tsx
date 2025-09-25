export interface HabilidadeBNCC {
  id: number;
  codigo: string;
  descricao: string;
  etapaEnsino: string;
  componenteCurricular: string;
  anoSerie: string;
  versao: string;
  status: string;
}

export interface AulaPlano {
  id: number;
  numero_aula: number;
  titulo: string;
  objetivo: string;
  duracao: string;
  atividades: AtividadePlano[];
}

export interface AtividadePlano {
  id: number;
  etapa: string;
  tempo: string;
  descricao: string;
  numero_aula?: number | null;
}

export interface CriadorPlano {
  nome: string;
  ocupacaoid: number;
  id: number;
  datacriacao: string;
  ultimologin: string;
  credencialId: number;
}

export interface IPlanoAulaDetalhado {
  id: number;
  titulo: string;
  duracao_total: string;
  recursos_gerais: string[];
  detalhes_plano_completo: string;
  avaliacao: string;
  habilidade_bncc: HabilidadeBNCC;
  criador: CriadorPlano;
  aulas: AulaPlano[];
}