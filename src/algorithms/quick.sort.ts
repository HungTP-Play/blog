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

/**
 * Partition function for Quick Sort algorithm
 * @param arr
 * @param left
 * @param right
 * @returns
 */
export function partition(arr: number[], left: number, right: number): number {
    const pivot = arr[Math.floor((right + left) / 2)]
    let i = left
    let j = right
    while (i <= j) {
        while (arr[i] < pivot) {
            i++
        }
        while (arr[j] > pivot) {
            j--
        }
        if (i <= j) {
            const temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
            i++
            j--
        }
    }
    return i
}

/**
 * Quick Sort implementation using partition function
 * @param arr
 * @param low
 * @param high
 * @returns
 */
export function quickSortClassic(
    arr: number[],
    low: number,
    high: number,
): number[] {
    if (low < high) {
        let pivot = partition(arr, low, high)
        quickSortClassic(arr, low, pivot - 1)
        quickSortClassic(arr, pivot + 1, high)
    }
    return arr
}
