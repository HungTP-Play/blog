// Implement TimSort (see: https://en.wikipedia.org/wiki/Timsort)
/**
 * Implementation of Tim Sort algorithm (see: https://en.wikipedia.org/wiki/Timsort)
 *
 * O(n log n) time complexity
 * @param arr
 * @returns
 */
export function timSort(arr: number[]): number[] {
    const run = 32

    for (let i = 0; i < arr.length; i += run) {
        insertionSort(arr, i, Math.min(i + 31, arr.length - 1))
    }

    for (let size = run; size < arr.length; size = 2 * size) {
        for (let left = 0; left < arr.length; left += 2 * size) {
            const mid = left + size - 1
            const right = Math.min(left + 2 * size - 1, arr.length - 1)
            merge(arr, left, mid, right)
        }
    }

    return arr
}

function insertionSort(arr: number[], left: number, right: number) {
    for (let i = left + 1; i <= right; i++) {
        const temp = arr[i]
        let j = i - 1
        while (j >= left && arr[j] > temp) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = temp
    }
}

function merge(arr: number[], l: number, m: number, r: number) {
    let len1 = m - l + 1
    let len2 = r - m

    let left = new Array(len1)
    let right = new Array(len2)

    for (let x = 0; x < len1; x++) {
        left[x] = arr[l + x]
    }
    for (let x = 0; x < len2; x++) {
        right[x] = arr[m + 1 + x]
    }

    let i = 0
    let j = 0
    let k = l

    while (i < len1 && j < len2) {
        if (left[i] <= right[j]) {
            arr[k] = left[i]
            i++
        } else {
            arr[k] = right[j]
            j++
        }
        k++
    }

    while (i < len1) {
        arr[k] = left[i]
        k++
        i++
    }

    while (j < len2) {
        arr[k] = right[j]
        k++
        j++
    }
}
