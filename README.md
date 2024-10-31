# Quartiles Solver

Quartiles Sovler is built with [Deno](https://deno.land) and
[Fresh](https://fresh.deno.dev/)

Simply fill in the interface of 5 rows of 4 input boxes with the word parts in
your Quartiles grid then click Solve to see a list of words to use to get an
expert score in Quartiles on Apple News+

## How it works

We simply compare the various permutations of the possible combinations of up to
4 of the various word parts against a publicly available list of "real words".
It's not the most accurate, but it does work.

This is based on a simple js solver
[gist](https://gist.github.com/ephbaum/b697fce3d39241a29b1d0716dd354974) I put
together recently.

<script src="https://gist.github.com/ephbaum/b697fce3d39241a29b1d0716dd354974.js"></script>

## Why?

That's a good question -- I don't really even use this, but it seemed like a fun
way to play around with Deno and Fresh :laughing:

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.
