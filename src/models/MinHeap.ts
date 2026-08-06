export class MinHeap {
    public heap: Array<number> = new Array<number>();
    constructor() { }

    public isEmpty = () => {
        return this.heap.length == 0;
    }

    public getMin = () => {
        return this.heap[0]
    }

    public push = (x: number) => {
        this.heap.push(x);
        if (this.heap.length > 1) {
            let currentIndex = this.heap.length - 1;

            while (currentIndex > 0 && this.heap[Math.floor(currentIndex / 2)] > this.heap[currentIndex]) {
                this.swapIndex(Math.floor(currentIndex / 2), currentIndex)
                currentIndex = Math.floor(currentIndex / 2)
                console.log(this.heap);
            }
        }
    }

    public pop = () => {
        let result = this.getMin();
        this.remove();
        return result;
    }

    public remove = () => {
        this.heap[0] = this.heap[this.heap.length - 1]
        this.heap.splice(this.heap.length - 1, 1);


        let parent = 0;
        let leftChildIndex = 2 * parent + 1;
        let rightChildIndex = 2 * parent + 2;
        let left = leftChildIndex > this.heap.length ? null : this.heap[leftChildIndex];
        let right = rightChildIndex > this.heap.length ? null : this.heap[rightChildIndex];
        do {
            // no children
            if (!left && !right) {
                return;
            }

            // 1 child
            else if (!right && left && this.heap[parent] > left) {
                this.swapIndex(parent, leftChildIndex)
                parent = leftChildIndex;
            }

            // 2 children
            else if (left && right) {
                if (left < right && this.heap[parent] > left) {
                    this.swapIndex(parent, leftChildIndex)
                    parent = leftChildIndex;
                }
                else if (left > right && this.heap[parent] > right) {
                    this.swapIndex(parent, rightChildIndex)
                    parent = rightChildIndex;
                }
            }

            leftChildIndex = 2 * parent + 1;
            rightChildIndex = 2 * parent + 2;
            left = leftChildIndex > this.heap.length ? null : this.heap[leftChildIndex];
            right = rightChildIndex > this.heap.length ? null : this.heap[rightChildIndex];

        } while (left && right && (this.heap[parent] > left || this.heap[parent] > right))
    }

    private swapIndex = (a: number, b: number) => {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }
}