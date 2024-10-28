export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh Forum</h1>
        <p class="my-4 text-center">
          Fresh Forum is a lightweight forum application built with
          <a href="https://deno.land" target={"blank"}>Deno</a>
          and
          <a href="https://fresh.deno.dev" target={"blank"}>Fresh</a>.
        </p>
        <p class="my-4 text-center">
          At least, that's the plan. This is a work in progress.
        </p>
      </div>
    </div>
  );
}
