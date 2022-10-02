/**
 * Implement Bubble Sort (see: https://en.wikipedia.org/wiki/Bubble_sort)
 *
 * O(n^2) time complexity
 * @param arr
 * @returns
 */
export function bubbleSort(arr: number[]): number[] {
    for (let keep = 0; keep < arr.length; keep++) {
        for (
            let compare_index = 0;
            compare_index < arr.length - keep;
            compare_index++
        ) {
            if (arr[compare_index] > arr[compare_index + 1]) {
                const temp = arr[compare_index]
                arr[compare_index] = arr[compare_index + 1]
                arr[compare_index + 1] = temp
            }
        }
    }
    return arr
}
