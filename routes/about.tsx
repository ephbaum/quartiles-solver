import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const resp = await ctx.render();
    resp.headers.set("X-Custom-Header", "Hello");
    return resp;
  },
};

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">About Quartiles Solver</h1>
      <p className="text-lg text-gray-700">
        Quartiles Solver is built with Deno and Fresh. The application allows users to input word parts and generate a list of valid words to achieve an expert score in Quartiles on Apple News+.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        Simply fill in the interface of 5 rows of 4 input boxes with the word parts in your Quartiles grid then click Solve to see a list of words to use to get an expert score in Quartiles on Apple News+.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        We simply compare the various permutations of the possible combinations of up to 4 of the various word parts against a publicly available list of "real words". It's not the most accurate, but it does work.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        This is based on a simple js solver <a href="https://gist.github.com/ephbaum/b697fce3d39241a29b1d0716dd354974" className="text-blue-500 underline">gist</a> I put together recently.
      </p>
      <p className="text-lg text-gray-700 mt-4">
        <a href="https://www.apple.com/newsroom/2024/05/apple-news-plus-introduces-quartiles-a-new-game-and-offline-mode-for-subscribers/" className="text-blue-500 underline">Apple News+ Quartiles</a>
      </p>
      <p className="text-lg text-gray-700 mt-4">
        <a href="https://github.com/ephbaum/quartiles-solver" className="text-blue-500 underline">GitHub Repository</a>
      </p>
    </main>
  );
}