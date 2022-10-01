export function insertionSort(arr: number[]): number[] {
    for (let sorted_index = 1; sorted_index < arr.length; sorted_index++) {
        const element = arr[sorted_index]
        let find_index = sorted_index
        for (; find_index > 0 && arr[find_index - 1] > element; find_index--) {
            arr[find_index] = arr[find_index - 1]
        }
        arr[find_index] = element
    }
    return arr
}
