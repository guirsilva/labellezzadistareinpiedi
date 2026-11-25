import { notFound } from "next/navigation";

/** Qualquer caminho desconhecido dentro de /it ou /pt mostra a 404 com navbar e rodapé. */
export default function CatchAllPage() {
  notFound();
}
