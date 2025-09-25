import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL + "/habilidade";
    const rawToken = req.headers.get("authorization");

    if (!rawToken || !rawToken.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Token não fornecido" }, { status: 401 });
    }

    const token = rawToken.replace("Bearer ", "");

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar habilidades BNCC:", error);
    const message = error?.response?.data?.message || "Erro ao buscar habilidades BNCC.";
    return NextResponse.json({ message }, { status: 500 });
  }
}