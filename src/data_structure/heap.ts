import { swap } from '../algorithms/bubble.sort'

/**
 * Heap Data Structure (see: https://www.geeksforgeeks.org/heap-data-structure/)
 */
export class Heap {
    private data: number[] = []
    constructor() {}
    public insert(value: number) {
        this.data.push(value)
        this.shiftUp(this.data.length - 1)
    }
    public extract() {
        if (this.data.length === 0) {
            return null
        }
        if (this.data.length === 1) {
            return this.data.pop()
        }
        const result = this.data[0]
        this.data[0] = this.data.pop()!
        this.shiftDown(0)
        return result
    }
    private shiftUp(index: number) {
        while (index > 0) {
            const parent_index = Math.floor((index - 1) / 2)
            if (this.data[parent_index] >= this.data[index]) {
                break
            }
            swap(parent_index, index, this.data)
            index = parent_index
        }
    }
    private shiftDown(index: number) {
        while (index * 2 + 1 < this.data.length) {
            let child_index = index * 2 + 1
            if (
                child_index + 1 < this.data.length &&
                this.data[child_index + 1] > this.data[child_index]
            ) {
                child_index = child_index + 1
            }
            if (this.data[index] >= this.data[child_index]) {
                break
            }
            swap(index, child_index, this.data)
            index = child_index
        }
    }
}
