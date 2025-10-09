import { IAula } from "./aula";
import { IHabilidadeBNCC } from "./habilidadeBNCC";
import { IUsuario } from "./usuario";

export interface IPlanoAula {
  id?: number;
  titulo: string;
  duracao_total?: string;
  recursos_gerais?: string[];
  detalhes_plano_completo?: string;
  avaliacao?: string;
  habilidade_bncc?: IHabilidadeBNCC[];
  criador?: IUsuario;
  aulas?: IAula[];
}
