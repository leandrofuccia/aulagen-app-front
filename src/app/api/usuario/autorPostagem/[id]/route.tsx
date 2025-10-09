import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/usuario/';
    const url = new URL(req.url);
    const usuarioid = url.pathname.split("/").pop();

    if (!usuarioid) {
      return NextResponse.json({ message: "Usuário ID não fornecido" }, { status: 400 });
    }

    const token = req.headers.get("authorization"); 
    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    console.log("Credencial ID recebido:", usuarioid);

    const response = await axios.get(apiUrl+`${usuarioid}`, {
      headers: {
        Authorization: token, 
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar usuário:", error);
    const message = error?.response?.data?.message || 'Erro ao buscar usuário';
    return NextResponse.json({ message }, { status: 500 });
  }
}

