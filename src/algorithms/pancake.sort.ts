/**
 * Implementation of pancake sort algorithm
 *
 * O(n^2) time complexity
 *
 * @param arr
 * @returns
 */
export function pancakeSort(arr: number[]): number[] {
    for (let i = arr.length; i > 1; i--) {
        const maxIndex = findMaxIndex(arr, i);
        if (maxIndex !== i - 1) {
            flip(arr, maxIndex + 1);
            flip(arr, i);
        }
    }
    return arr;
}

function findMaxIndex(arr: number[], length: number): number {
    let maxIndex = 0;
    for (let i = 0; i < length; i++) {
        if (arr[i] > arr[maxIndex]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}

function flip(arr: number[], k: number) {
    let left = 0;
    let right = k - 1;
    while (left < right) {
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}
