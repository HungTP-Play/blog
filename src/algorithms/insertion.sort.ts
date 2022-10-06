/**
 * Implementation of Insertion Sort algorithm
 *
 * O(n^2) time complexity
 * @param arr
 * @returns
 */
export function insertionSort(arr: number[]): number[] {
    for (let sorted_index = 1; sorted_index < arr.length; sorted_index++) {
        const element = arr[sorted_index];
        let compare_index = sorted_index - 1;
        while (compare_index >= 0 && arr[compare_index] > element) {
            arr[compare_index + 1] = arr[compare_index];
            compare_index--;
        }
        arr[compare_index + 1] = element;
    }
    return arr;
}
