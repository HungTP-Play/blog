export interface ITreeNode {
    value: number
    children: (ITreeNode | undefined)[]
}

export interface ITree {
    root?: ITreeNode
    insert(value: number): void
    search(value: number): ITreeNode | null
    remove(value: number): void
    traverse(): number[]
}
