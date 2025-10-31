let cyclic = 1;
export function getSid(): number {
  if (1000000000 <= cyclic) {
    cyclic = 1;
  }

  const sid = cyclic++;
  return sid;
}

export function Initialize(val = 1): void {
  cyclic = 0 < val ? val : 1;
}
