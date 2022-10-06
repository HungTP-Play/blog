/**
 * Implement Cocktail Shaker Sort (see: https://en.wikipedia.org/wiki/Cocktail_shaker_sort)
 *
 * O(n^2) time complexity
 * O(1) space complexity
 *
 * @param arr
 * @returns
 */
export function cocktailShakerSort(arr: number[]): number[] {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        for (let i = left; i < right; i++) {
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
        right--;
        for (let i = right; i > left; i--) {
            if (arr[i] < arr[i - 1]) {
                const temp = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = temp;
            }
        }
        left++;
    }
    return arr;
}
