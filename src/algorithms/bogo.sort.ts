/**
 * Implementation of Bogo Sort (see: https://en.wikipedia.org/wiki/Bogosort)
 *
 * O(n!) time complexity
 * @param arr
 * @returns
 */
export function bogoSort(arr: number[]): number[] {
    while (!isSorted(arr)) {
        shuffle(arr);
    }
    return arr;
}

function isSorted(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
}

function shuffle(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
        const random_index = Math.floor(Math.random() * arr.length);
        swap(i, random_index, arr);
    }
}

function swap(i: number, j: number, arr: number[]) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
