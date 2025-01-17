// app/api/data/[id]/route.js
export async function GET(request, { params }) {
  const { id } = params;
  const database = {
    1: { id: 1, name: "Objet 1" },
    2: { id: 2, name: "Objet 2" },
    3: { id: 3, name: "Objet 3" },
  };

  const data = database[id];
  if (!data) {
    return new Response(JSON.stringify({ error: "Donnée introuvable" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
