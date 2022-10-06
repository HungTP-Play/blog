/**
 * Implementation of Quick Sort algorithm (see: https://en.wikipedia.org/wiki/Quicksort)
 *
 * O(n log n) time complexity
 * @param arr
 * @returns
 */
export function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[0];
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat(pivot, quickSort(right));
}

/**
 * Quick Sort implementation using partition function
 *
 * Choose a pivot element is the first element of the array
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
        const pivot = partition(arr, low, high);
        quickSortClassic(arr, low, pivot - 1);
        quickSortClassic(arr, pivot + 1, high);
    }
    return arr;
}

/**
 * Partition function, pivot is the first element of the array
 * @param arr
 * @param low
 * @param high
 * @returns
 */
function partition(arr: number[], low: number, high: number): number {
    const pivot = arr[low];
    let i = low + 1;
    let j = high;
    while (i <= j) {
        while (i <= j && arr[i] <= pivot) {
            i++;
        }
        while (i <= j && arr[j] > pivot) {
            j--;
        }
        if (i < j) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    arr[low] = arr[j];
    arr[j] = pivot;
    return j;
}
