export async function POST(req) {
  try {
    const data = await req.json();

    console.log('Données reçues :', data);
    return new Response(
      JSON.stringify({ message: 'Données traitées avec succès', data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur lors du traitement des données :', error);
    return new Response(
      JSON.stringify({ message: 'Erreur serveur', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
