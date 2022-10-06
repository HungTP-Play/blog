/**
 * Sort array using selection sort algorithm (see: https://en.wikipedia.org/wiki/Selection_sort)
 *
 * O(n^2) time complexity
 * @param arr
 */
export function selectionSort(arr: number[]): number[] {
    for (let sorted_index = 0; sorted_index < arr.length - 1; sorted_index++) {
        let find_index = sorted_index;
        let min_index = sorted_index;
        for (; find_index < arr.length; find_index++) {
            if (arr[find_index] < arr[min_index]) {
                min_index = find_index;
            }
        }
        swap(sorted_index, min_index, arr);
    }
    return arr;
}

/**
 * Swap two elements in array
 * @param i
 * @param j
 * @param arr
 */
export function swap(i: number, j: number, arr: number[]) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
