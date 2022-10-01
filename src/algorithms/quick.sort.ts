/**
 * Implementation of Quick Sort algorithm (see: https://en.wikipedia.org/wiki/Quicksort)
 *
 * O(n log n) time complexity
 * @param arr
 * @returns
 */
export function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr
    }
    const pivot = arr[0]
    const left = []
    const right = []
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }
    return quickSort(left).concat(pivot, quickSort(right))
}
