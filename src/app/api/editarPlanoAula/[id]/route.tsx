import { NextResponse } from "next/server";
import axios from "axios";

export async function PUT(req: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/planoAula/";
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop(); // Extrai o ID da URL

    if (!id) {
      return NextResponse.json({ message: "ID não fornecido" }, { status: 400 });
    }

    const token = req.headers.get("authorization");
    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    const body = await req.json();

    // Envia os dados atualizados para o back-end
    const response = await axios.put(`${apiUrl}${id}`, body, {
      headers: {
        Authorization: token,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    const message = error?.response?.data?.message || "Erro ao atualizar plano de aula.";
    console.error("Erro ao atualizar plano de aula:", error);
    return NextResponse.json({ message }, { status: 500 });
  }
}