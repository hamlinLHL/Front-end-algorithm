const {NodeList} = require('./linkedNode');

/**
 * 顺序队列
 * 不使用js 数组 的 push 和 shift api
 */
class ArrayQueue {
    // 数组
    items;
    // 容量
    capacity;
    // 头
    head;
    // 尾
    tail;
    constructor(capacity) {
        this.capacity = capacity;
        this.tail = 0;
        this.head = 0;
        this.items = new Array(capacity);
    }

    /**
     * 入队
     * @param item
     */
    enqueue(item) {
        if (this.tail === this.capacity) {
            // 队列达到容量上限
            if (this.head === 0) {
                // 没有剩余空间
                return false;
            }
            // 往前移动
            for(let i = this.head; i < this.tail; i++) {
                this.items[i - this.head] = this.items[i];
            }
            this.tail -= this.head;
            this.head = 0;
        }
        this.items[this.tail] = item;
        this.tail ++;
        return true;
    }

    /**
     * 出队
     */
    dequeue() {
        if (this.head === this.tail) {
            return null;
        }
        return this.items[this.head++];
    }
}
const arrayQueue = new ArrayQueue(3);
// console.log('1 入队')
// console.log(arrayQueue.enqueue(1))
// console.log('2 入队')
// console.log(arrayQueue.enqueue(2))
// console.log('1 出队')
// console.log(arrayQueue.dequeue())
// console.log('2 出队')
// console.log(arrayQueue.dequeue())
// console.log('3 入队')
// console.log(arrayQueue.enqueue(3))
// console.log('合并空间后 4 入队')
// console.log(arrayQueue.enqueue(4))
// console.log('5 入队')
// console.log(arrayQueue.enqueue(5))
// console.log('队列已满，6无法入队')
// console.log(arrayQueue.enqueue(6))

/**
 * 链式队列
 */
class LinkedQueue {
    /**
     * 头指针
     */
    head;
    /**
     * 尾指针
     */
    tail;
    constructor() {
        this.head = null;
        this.tail = null;
    }
    dequeue() {
        if (this.head !== null) {
            const item = this.head;
            this.head = this.head.next;
            item.next = null;
            return item.val;
        }
        return null;
    }
    enqueue(item) {
        if (this.head === null) {
            this.head = new NodeList(item);
            this.tail = this.head;
        } else {
            this.tail.next = new NodeList(item);
            this.tail = this.tail.next;
        }
    }
}
// const linkedQueue = new LinkedQueue();
// console.log('1 入队')
// console.log(linkedQueue.enqueue(1))
// console.log('2 入队')
// console.log(linkedQueue.enqueue(2))
// console.log('1 出队')
// console.log(linkedQueue.dequeue())
// console.log('2 出队')
// console.log(linkedQueue.dequeue())
// console.log('3 入队')
// console.log(linkedQueue.enqueue(3))
// console.log('3 出队')
// console.log(linkedQueue.dequeue())


class CircularQueue {
    // 数组：items，数组大小：n
    items;
    n = 0;
    // head表示队头下标，tail表示队尾下标
    head = 0;
    tail = 0;

    // 申请一个大小为capacity的数组
    constructor(capacity) {
        this.items = new Array(capacity);
        this.n = capacity;
    }

    // 入队
    enqueue(item) {
        // 队列满了，tail位置不存数据
        if ((this.tail + 1) % this.n === this.head) {
            return false
        }
        this.items[this.tail] = item;
        this.tail = (this.tail + 1) % this.n;
        return true;
    }

    // 出队
    dequeue() {
        // 如果head == tail 表示队列为空
        if (this.head === this.tail) return null;
        const ret = this.items[this.head];
        this.head = (this.head + 1) % this.n;
        return ret;
    }
}
console.log('初始化大小为3的循环队列')
const circleQueue = new CircularQueue(3);
console.log('1 入队')
console.log(circleQueue.enqueue(1))
console.log('2 入队')
console.log(circleQueue.enqueue(2))
console.log('由于循环队列浪费一个空间， 3 无法入队')
console.log(circleQueue.enqueue(3))
console.log('1 出队')
console.log(circleQueue.dequeue())
console.log('3 入队')
console.log(circleQueue.enqueue(3))
