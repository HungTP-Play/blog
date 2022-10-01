/**
 * Implementation of binary search algorithm
 *
 * O(log n) time complexity
 * @param arr
 * @param target
 * @returns
 */
export function binarySearch(arr: number[], target: number): number {
    let left = 0
    let right = arr.length - 1
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (target === arr[mid]) {
            return mid
        } else if (target < arr[mid]) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return -1
}
