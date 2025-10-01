import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/usuario';
    const body = await req.json();
    const { nome, ocupacaoid, credencialId } = body;

    console.log('nome ', nome)
    console.log('ocupacaoid', ocupacaoid)
    console.log('credencialId', credencialId)

    if (!nome || !ocupacaoid || !credencialId) {
      return NextResponse.json(
        { message: "Dados incompletos. Nome, ocupacao e Credencial são obrigatórios." },
        { status: 400 }
      );
    }

    const token = req.headers.get("authorization");

    console.log ('crete usuário token ', token)

    if (!token) {
      return NextResponse.json(
        { message: "Não foi possível criar ou usuário." },
        { status: 401 }
      );
    }

    //const response = await axios.post("http://aulagen_app:3001/usuario",
    const response = await axios.post(apiUrl,
      { nome, ocupacaoid, credencialId },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao salvar usuário';
    console.error('Erro ao salvar usuário:', message);
    return NextResponse.json({ message }, { status: 400 });

  }
}




