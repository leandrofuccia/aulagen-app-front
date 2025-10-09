import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/usuario/credencial/';
    const url = new URL(req.url);
    const credencialId = url.pathname.split("/").pop();

    if (!credencialId) {
      return NextResponse.json({ message: "Credencial ID não fornecido" }, { status: 400 });
    }

    const token = req.headers.get("authorization"); 
    if (!token) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    console.log("Credencial ID recebido:", credencialId);

    const response = await axios.get(apiUrl+`${credencialId}`, {
      headers: {
        Authorization: token,
      },
    });

    console.log("Dados do usuário:", response.data);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar ocupacao do usuário:", error);
    const message = error?.response?.data?.message || 'Erro ao buscar ocupacao do usuário';
    return NextResponse.json({ message }, { status: 400 });
    
  }
}