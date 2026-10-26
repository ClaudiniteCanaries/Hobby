#!/usr/bin/env node
// roll 2d6+1: rolls two six-sided dice and adds one.

export function parse(spec) {
  const m = /^(\d*)d(\d+)([+-]\d+)?$/.exec(spec);
  if (!m) throw new Error(`not a dice spec: ${spec}`);
  return { count: Number(m[1] || 1), sides: Number(m[2]), bonus: Number(m[3] || 0) };
}

export function roll({ count, sides, bonus }, random = Math.random) {
  const dice = Array.from({ length: count }, () => 1 + Math.floor(random() * sides));
  return { dice, total: dice.reduce((a, b) => a + b, bonus) };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { dice, total } = roll(parse(process.argv[2] ?? 'd6'));
  console.log(`${dice.join(' + ')} = ${total}`);
}
