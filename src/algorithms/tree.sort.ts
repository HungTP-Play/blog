/**
 * Implement Tree Sort (see: https://en.wikipedia.org/wiki/Tree_sort)
 *
 * O(n log n) time complexity
 * @param arr
 * @returns
 */
export function treeSort(arr: number[]): number[] {
    const tree = new BinarySearchTree(arr);
    return tree.inOrder();
}

export class BinarySearchTree {
    root: Node | null;

    constructor(arr: number[]) {
        this.root = null;
        for (const item of arr) {
            this.insert(item);
        }
    }

    insert(item: number) {
        const node = new Node(item);
        if (this.root === null) {
            this.root = node;
        } else {
            this.root.insert(node);
        }
    }

    inOrder() {
        if (this.root === null) {
            return [];
        }
        return this.root.inOrder();
    }
}

export class Node {
    data: number;
    left: Node | null;
    right: Node | null;

    constructor(data: number) {
        this.data = data;
        this.left = null;
        this.right = null;
    }

    insert(node: Node) {
        if (node.data < this.data) {
            if (this.left === null) {
                this.left = node;
            } else {
                this.left.insert(node);
            }
        } else {
            if (this.right === null) {
                this.right = node;
            } else {
                this.right.insert(node);
            }
        }
    }

    inOrder(): any[] {
        const arr = [];
        if (this.left !== null) {
            arr.push(...this.left.inOrder());
        }
        arr.push(this.data);
        if (this.right !== null) {
            arr.push(...this.right.inOrder());
        }
        return arr;
    }
}
