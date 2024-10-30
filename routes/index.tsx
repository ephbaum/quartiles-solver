import { h as _h } from "preact";
import { PageProps as _PageProps } from "$fresh/server.ts";
import QuartileSolver from "../islands/QuartileSolver.tsx";

export default function Page(props: _PageProps) {
  const { results, error } = props.data ?? { results: [], error: null };
  return <QuartileSolver results={results} error={error} />;
}
