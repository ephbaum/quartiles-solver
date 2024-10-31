import { assertEquals } from "$std/assert/assert_equals.ts";
import { handler } from "../routes/api/solve.ts";
import * as sinon from "https://cdn.skypack.dev/sinon@19.0.2";

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

  // Mock the fetch function
  const fetchStub = sinon.stub(globalThis, "fetch").resolves(
    new Response("pre\npost\nun\nre\nfix\ning\ned\ns\nly\ntion\nment\nness\nity\nable\nible\nal\nful", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    })
  );

  const response = await handler(request, {} as any);
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(Array.isArray(data.results), true);
  assertEquals(data.results.length > 0, true);

  // Check that each word result includes the correct parts
  data.results.forEach((result: any) => {
    assertEquals(typeof result.word, "string");
    assertEquals(Array.isArray(result.parts), true);
    result.parts.forEach((part: any) => {
      assertEquals(typeof part.part, "string");
      assertEquals(typeof part.order, "number");
    });
  });

  // Restore the original fetch function
  fetchStub.restore();
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

  // Mock the fetch function
  const fetchStub = sinon.stub(globalThis, "fetch").resolves(
    new Response("pre\npost\nun\nre\nfix\ning\ned\ns\nly\ntion\nment\nness\nity\nable\nible\nal\nful", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    })
  );

  const response = await handler(request, {} as any);
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(Array.isArray(data.results), true);
  assertEquals(data.results.length, 0);

  // Restore the original fetch function
  fetchStub.restore();
});

Deno.test("GET /api/solve - method not allowed", async () => {
  const request = new Request("http://localhost/api/solve", {
    method: "GET",
  });

  const response = await handler(request, {} as any);
  const data = await response.json();

  assertEquals(response.status, 200);
  assertEquals(Array.isArray(data.results), true);
  assertEquals(data.results.length, 0);
});
