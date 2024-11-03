import { assertEquals } from "$std/assert/assert_equals.ts";
import { handler } from "../routes/api/solve.ts";
import { WordPart, WordResult } from "../types.ts";

Deno.test("POST /api/solve - valid input", async () => {
  const jsonData = {
    "input-0-0": "pre",
    "input-0-1": "post",
    "input-0-2": "un",
    "input-0-3": "re",
    "input-1-0": "fix",
    "input-1-1": "fix",
    "input-1-2": "fix",
    "input-1-3": "fix",
    "input-2-0": "ing",
    "input-2-1": "ed",
    "input-2-2": "s",
    "input-2-3": "ly",
    "input-3-0": "tion",
    "input-3-1": "ment",
    "input-3-2": "ness",
    "input-3-3": "ity",
    "input-4-0": "able",
    "input-4-1": "ible",
    "input-4-2": "al",
    "input-4-3": "ful",
  };

  const request = new Request("http://localhost/api/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });

  const response = await handler(request, {
    remoteAddr: { hostname: "127.0.0.1", port: 80, transport: "tcp" },
    url: new URL(request.url),
    basePath: "",
    route: "/api/solve",
    state: {},
    pattern: "",
    destination: "route",
    params: {},
    isPartial: false,
    config: {
      dev: false,
      build: {
        outDir: "dist",
        target: "esnext",
      },
      render: () => Promise.resolve(),
      plugins: [],
      staticDir: "",
      server: {
        port: 8000,
        hostname: "localhost",
      },
      basePath: "/",
    },
    data: {},
    renderNotFound: () => Promise.resolve(new Response()),
    render: () => Promise.resolve(new Response()),
    Component: () => null,
    next: () => Promise.resolve(new Response()),
  });

  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(Array.isArray(data.results), true);
  assertEquals(data.results.length > 0, true);

  // Check that each word result includes the correct parts
  data.results.forEach((result: WordResult) => {
    assertEquals(typeof result.word, "string");
    assertEquals(Array.isArray(result.parts), true);
    result.parts.forEach((part: WordPart) => {
      assertEquals(typeof part.part, "string");
      assertEquals(typeof part.order, "number");
    });
  });
});

Deno.test("POST /api/solve - invalid input", async () => {
  const jsonData = {
    "input-0-0": "123",
    "input-0-1": "456",
    "input-0-2": "789",
    "input-0-3": "101",
    "input-1-0": "112",
    "input-1-1": "131",
    "input-1-2": "415",
    "input-1-3": "161",
    "input-2-0": "718",
    "input-2-1": "192",
    "input-2-2": "021",
    "input-2-3": "222",
    "input-3-0": "333",
    "input-3-1": "444",
    "input-3-2": "999",
    "input-3-3": "000",
    "input-4-0": "111",
    "input-4-1": "222",
    "input-4-2": "333",
    "input-4-3": "444",
  };

  const request = new Request("http://localhost/api/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });

  const response = await handler(request, {
    remoteAddr: { hostname: "127.0.0.1", port: 80, transport: "tcp" },
    url: new URL(request.url),
    basePath: "",
    route: "/api/solve",
    state: {},
    pattern: "",
    destination: "route",
    params: {},
    isPartial: false,
    config: {
      dev: false,
      build: {
        outDir: "dist",
        target: "esnext",
      },
      render: () => Promise.resolve(),
      plugins: [],
      staticDir: "",
      server: {
        port: 8000,
        hostname: "localhost",
      },
      basePath: "/",
    },
    data: {},
    renderNotFound: () => Promise.resolve(new Response()),
    render: () => Promise.resolve(new Response()),
    Component: () => null,
    next: () => Promise.resolve(new Response()),
  });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(Array.isArray(data.results), true);
  assertEquals(data.results.length, 0);
});

Deno.test("GET /api/solve - method not allowed", async () => {
  const request = new Request("http://localhost/api/solve", {
    method: "GET",
  });

  const response = await handler(request, {
    remoteAddr: { hostname: "127.0.0.1", port: 80, transport: "tcp" },
    url: new URL(request.url),
    basePath: "",
    route: "/api/solve",
    state: {},
    pattern: "",
    destination: "route",
    params: {},
    isPartial: false,
    config: {
      dev: false,
      build: {
        outDir: "dist",
        target: "esnext",
      },
      render: () => Promise.resolve(),
      plugins: [],
      staticDir: "",
      server: {
        port: 8000,
        hostname: "localhost",
      },
      basePath: "/",
    },
    data: {},
    renderNotFound: () => Promise.resolve(new Response()),
    render: () => Promise.resolve(new Response()),
    Component: () => null,
    next: () => Promise.resolve(new Response()),
  });
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(Array.isArray(data.results), true);
  assertEquals(data.results.length, 0);
});
