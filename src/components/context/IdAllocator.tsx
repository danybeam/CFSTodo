import { MinHeap } from "../../models/MinHeap";

export type IdAllocator = {
    nextId: number;
    freeIds: MinHeap;
};

export function createIdAllocator(usedIds: readonly number[]): IdAllocator {
    const freeIds = new MinHeap();

    let expected = 0;

    for (const id of usedIds) {
        while (expected < id) {
            freeIds.push(expected++);
        }

        expected = id + 1;
    }

    return {
        nextId: expected,
        freeIds,
    };
}

export function allocateId(allocator: IdAllocator): number {
    if (!allocator.freeIds.isEmpty()) {
        let nextId = allocator.freeIds.pop();
        return nextId;
    }

    return allocator.nextId++;
}

export function freeId(allocator: IdAllocator, id: number): void {
    allocator.freeIds.push(id);
}