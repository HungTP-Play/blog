/**
 * Implementation of merge sort algorithm
 *
 * O(n log n) time complexity
 * @param arr
 * @returns
 */
export function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
}

export function merge(left: number[], right: number[]): number[] {
    const result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left.shift()!);
        } else {
            result.push(right.shift()!);
        }
    }
    return result.concat(left, right);
}
