import { selectionSort } from './selection.sort'

describe('Test Selection Sort', () => {
    const cases = [
        {
            input: [1, 5, 3, 2, 4],
            output: [1, 2, 3, 4, 5],
        },
        // 20 numbers
        {
            input: [
                1, 5, 3, 2, 4, 6, 12, 78, 34, 23, 45, 67, 89, 90, 56, 43, 21,
                11, 22, 33,
            ],
            output: [
                1, 2, 3, 4, 5, 6, 11, 12, 21, 22, 23, 33, 34, 43, 45, 56, 67,
                78, 89, 90,
            ],
        },
        // 30 numbers
        {
            input: [
                1, 5, 3, 2, 4, 6, 12, 78, 34, 23, 45, 67, 89, 90, 56, 43, 21,
                11, 22, 33, 1, 5, 3, 2, 4, 6, 12, 78, 34, 23,
            ],
            output: [
                1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 11, 12, 12, 21, 22, 23, 23,
                33, 34, 34, 43, 45, 56, 67, 78, 78, 89, 90,
            ],
        },
    ]

    cases.forEach((c) => {
        it(`should sort ${c.input} to ${c.output}`, () => {
            expect(selectionSort(c.input)).toEqual(c.output)
        })
    })
})
