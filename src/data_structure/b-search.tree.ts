import { ITree, ITreeNode } from './tree.interface'

/**
 * Binary Search Tree (see: https://www.geeksforgeeks.org/binary-search-tree-data-structure/)
 */
export class BinarySearchTree implements ITree {
    root?: ITreeNode
    constructor() {
        this.root = undefined
    }
    traverse(): number[] {
        throw new Error('Method not implemented.')
    }
    public insert(value: number) {
        const newNode: ITreeNode = { value, children: [] }
        if (!this.root) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }

    private insertNode(node: ITreeNode, newNode: ITreeNode) {
        if (newNode.value < node.value) {
            if (!node.children[0]) {
                node.children[0] = newNode
            } else {
                this.insertNode(node.children[0], newNode)
            }
        } else {
            if (!node.children[1]) {
                node.children[1] = newNode
            } else {
                this.insertNode(node.children[1], newNode)
            }
        }
    }

    public search(value: number): ITreeNode | null {
        return this.searchNode(this.root, value)
    }

    private searchNode(
        node: ITreeNode | undefined,
        value: number,
    ): ITreeNode | null {
        if (!node) {
            return null
        }
        if (node.value === value) {
            return node
        }
        if (value < node.value) {
            return this.searchNode(node.children[0], value)
        } else {
            return this.searchNode(node.children[1], value)
        }
    }

    public remove(value: number) {
        this.root = this.removeNode(this.root, value)
    }

    private removeNode(
        node: ITreeNode | undefined,
        value: number,
    ): ITreeNode | undefined {
        if (!node) {
            return undefined
        }
        if (value < node.value) {
            node.children[0] = this.removeNode(node.children[0], value)
            return node
        } else if (value > node.value) {
            node.children[1] = this.removeNode(node.children[1], value)
            return node
        } else {
            if (!node.children[0] && !node.children[1]) {
                node = undefined
                return node
            }
            if (!node.children[0]) {
                node = node.children[1]
                return node
            }
            if (!node.children[1]) {
                node = node.children[0]
                return node
            }
            const aux = this.findMinNode(node.children[1])
            node.value = aux.value
            node.children[1] = this.removeNode(node.children[1], aux.value)
            return node
        }
    }

    private findMinNode(node: ITreeNode): ITreeNode {
        if (!node.children[0]) {
            return node
        }
        return this.findMinNode(node.children[0])
    }
}
