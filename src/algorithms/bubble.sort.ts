/**
 * Implement Bubble Sort (see: https://en.wikipedia.org/wiki/Bubble_sort)
 * @param arr
 * @returns
 */
export function bubbleSort(arr: number[]): number[] {
    for (let outter_index = 0; outter_index < arr.length - 1; outter_index++) {
        for (let inner_index = 0; inner_index < arr.length - 1; inner_index++) {
            if (arr[inner_index] > arr[inner_index + 1]) {
                swap(inner_index, inner_index + 1, arr)
            }
        }
    }
    return arr
}

export function swap(i: number, j: number, arr: number[]) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}
