import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/usuario';
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || 1;
    const limit = url.searchParams.get("limit") || 10;
    console.log('chegou aqui')

    const token = req.headers.get("authorization");

    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    const response = await axios.get(apiUrl, {
      params: { page, limit },
      headers: {
        Authorization: token,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar autores:", error);
    const message = error?.response?.data?.message || 'Erro ao buscar autores';
    return NextResponse.json({ message }, { status: 500 });
  }
}

 