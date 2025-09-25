import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/planoAula/usuario/';
    const url = new URL(req.url);
   console.log('url id ', url);

    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 10;
    const id = url.pathname.split("/").pop(); // Extrai o ID da URL

    console.log('usuario id aaaaa', id)

    // Recupera o token de autenticação (pode ser do localStorage ou outro local)
    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }
   console.log('apiUrl+`${id}` ', apiUrl+`${id}`)

    // Faz a chamada ao back-end com o token no cabeçalho
    const response = await axios.get(apiUrl+`${id}`, {
      params: { page, limit },
      headers: {
        Authorization: token, // Inclui o token no cabeçalho
      },
    });

    // Retorna os planos de para o front-end
    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar planos de aula:", error);
    const message = error?.response?.data?.message || 'Erro ao buscar planos de aulas';
    return NextResponse.json({ message }, { status: 400 });
  }
}


 
   
    