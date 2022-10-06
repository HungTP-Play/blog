/**
 * Solve Tower of Hanoi problem
 * @param n
 * @param from
 * @param to
 * @param via
 */
export function solveTowerOfHanoi(
    n: number,
    from: string,
    to: string,
    via: string,
): void {
    if (n === 1) {
        console.log(`Move disk 1 from ${from} to ${to}`);
    } else {
        solveTowerOfHanoi(n - 1, from, via, to);
        console.log(`Move disk ${n} from ${from} to ${to}`);
        solveTowerOfHanoi(n - 1, via, to, from);
    }
}
