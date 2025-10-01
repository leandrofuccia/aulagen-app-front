import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/credencial';
    const body = await req.json();
    const { username, password} = body;

    console.log('username ', username)

    if (!username || !password) {
      return NextResponse.json(
        { message: "Dados incompletos. Usuário e senha são obrigatórios." },
        { status: 400 }
      );
    }
    
    //const response = await axios.post("http://localhost:3001/credencial",
    const response = await axios.post(apiUrl,
      { username, password },
      
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro ao salvar usuário';
    const status = error?.response?.status || 500;

    console.error('Erro ao salvar usuário:', message);

    return NextResponse.json({ message }, { status });
  }
}