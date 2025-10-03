import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const rawToken = req.headers.get("authorization");

    if (!rawToken || !rawToken.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    const token = rawToken.replace("Bearer ", "");
    const body = await req.json();
    console.log("Payload recebido:", body);
    
    const { codigo_BNCC, componente_Curricular, serie, duracao_aula, credencialId } = body;

    if (!codigo_BNCC || !componente_Curricular || !serie || !duracao_aula) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios para gerar o plano de aula." },
        { status: 400 }
      );
    }


    console.log('createPlano credencialId', credencialId)

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/planoAula/gerar`;

    const response = await axios.post(
      apiUrl,
      {
        codigo_BNCC,
        componente_Curricular,
        serie,
        duracao_aula,
        credencialId: credencialId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao gerar plano de aula:", error.message);
    const message = error?.response?.data?.message || "Erro ao gerar plano de aula.";
    return NextResponse.json({ message }, { status: 500 });
  }
}