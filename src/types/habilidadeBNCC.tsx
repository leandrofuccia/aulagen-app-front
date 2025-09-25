export interface IHabilidadeBNCC {
  id?: number;
  codigo?: string;
  descricao?: string;
  // nome das props conforme o retorno do backend — use o que o backend envia
  componente_etapa_ensino?: string;
  componente_curricular?: string;
  ano_serie?: string;
  versao?: string;
  status?: string;
}
