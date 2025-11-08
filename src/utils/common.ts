export function checkCollision(
  pos1: [number, number, number],
  size1: [number, number, number],
  pos2: [number, number, number],
  size2: [number, number, number],
): boolean {
  return (
    Math.abs(pos1[0] - pos2[0]) < (size1[0] + size2[0]) / 2 &&
    Math.abs(pos1[1] - pos2[1]) < (size1[1] + size2[1]) / 2 &&
    Math.abs(pos1[2] - pos2[2]) < (size1[2] + size2[2]) / 2
  );
}

export function getRandomItem<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
