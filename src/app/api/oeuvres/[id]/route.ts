import { findOeuvres } from "@/hooks/useOeuvre";
export async function GET(request, { params }) {
  const { name } = params;

  if (!name) {
    return new Response(JSON.stringify({ error: "Donnée introuvable" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(name), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
