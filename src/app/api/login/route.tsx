
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/credencial/signin';
    console.log('API URL:', apiUrl);

    const { username, password } = await req.json();

    const response = await axios.post(apiUrl, {
      username,
      password,
    });

    return NextResponse.json({ token: response.data.token }, { status: 200 });
  } catch (error: any) {
    const message = error?.response?.data?.message || 'Erro de autenticação';
    console.error('Erro ao processar login:', message);
    return NextResponse.json({ message }, { status: 401 });
  }
}
