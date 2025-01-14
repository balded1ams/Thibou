import {fetchOeuvres} from "../../../../script/slugify";
import {NextResponse} from "next/server";

export async function POST(req: { json: () => any }) {
  const oeuvre = await fetchOeuvres(50, ["sculpture" ,"dessin"], ["peinture" ,"beaux-arts"], ["VASARI GIORGIO","COROT CAMILLE"], ["BANDINELLI BACCIO", "ZIEM FÉLIX"], ["Renaissance"], ["Baroque"]);
  console.log("number oeuvre : ", oeuvre.length);
  return NextResponse.json(oeuvre);
}
