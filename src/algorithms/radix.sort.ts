/**
 * Implementation of radix sort algorithm
 *
 * O(nk) time complexity
 * @param arr
 * @returns
 */
export function radixSort(arr: number[]): number[] {
    const max = Math.max(...arr)
    let exp = 1
    while (max / exp > 0) {
        countingSort(arr, exp)
        exp *= 10
    }
    return arr
}

/**
 * Implementation of counting sort algorithm
 *
 * O(n+k) time complexity
 * @param arr
 * @param exp
 */
function countingSort(arr: number[], exp: number) {
    const len = arr.length
    const output = new Array(len)
    const count = new Array(10).fill(0)

    for (let i = 0; i < len; i++) {
        count[Math.floor(arr[i] / exp) % 10]++
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1]
    }

    for (let i = len - 1; i >= 0; i--) {
        output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i]
        count[Math.floor(arr[i] / exp) % 10]--
    }

    for (let i = 0; i < len; i++) {
        arr[i] = output[i]
    }
}
