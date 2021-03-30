class NodeList {
    val;
    next;
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}
class DoublyNodeList {
    val;
    next;
    pre;
    constructor(val, pre = null, next = null) {
        this.val = val;
        this.pre = pre;
        this.next = next;
    }
}
function consoleList(root) {
    let res = '';
    while (root) {
        res += `${root.val} -> `;
        root = root.next;
    }
    res += 'null';
    console.log(res);
}
function genList(n) {
    const dummy = new NodeList(0, new NodeList(n, null));
    let head = dummy.next;
    while (n > 0) {
        n--;
        head.next = new NodeList(n);
        head = head.next;
    }
    return dummy.next;
}
const linkList  = genList(4);
// consoleList(linkList)
class LRUCache {
    list;
    cap;
    /**
     * 缓存当前缓存长度
     */
    len;
    constructor(cap) {
        this.cap = cap;
        this.len = 0;
    }
    get(value) {
        if (!this.list) {
            this.list = new NodeList(value);
            this.len ++;
        } else {
            let head = this.list;
            let exit = false;
            while (head && head.next) {
                if (head.next.val === value) {
                    exit = true;
                    // 缓存中有值
                    const temp = head.next;
                    // 删除
                    head.next = head.next.next;
                    // 头插
                    temp.next = this.list;
                    this.list = temp;
                    break;
                }
                head = head.next;
            }
            if (!exit) {
                // 缓存中没有值
                if (this.len === this.cap) {
                    // 满了
                    // 删除尾节点
                    head = this.list;
                    while (head && head.next) {
                        if (head.next.next === null) {
                            head.next = null;
                        }
                        head = head.next;
                    }
                    // 头插
                    this.list = new NodeList(value, this.list);
                } else {
                    // 头插
                    this.list = new NodeList(value, this.list);
                    this.len ++;
                }
            }
        }
        return this.list.val;
    }
}
// console.log('最多存 3 个数')
// const lruCache = new LRUCache(3);
// console.log('缓存中插入 1');
// lruCache.get(1);
// consoleList(lruCache.list);
// console.log('缓存中插入 2');
// lruCache.get(2);
// consoleList(lruCache.list);
// console.log('缓存中插入 3');
// lruCache.get(3);
// consoleList(lruCache.list);
// console.log('缓存中插入 4， 把 1 淘汰');
// lruCache.get(4);
// consoleList(lruCache.list);
// console.log('缓存中插入 2， 2移动到头部');
// lruCache.get(2);
// consoleList(lruCache.list);

/**
 * 是否是回文单链表
 * @param list
 */
function isPalindromeLinkedList(list) {
    if (!list) {
        return true;
    }
    let res = true;
    let slow = list, fast = list;
    let pre = null, next;
    while (slow && fast && fast.next) {
        fast = fast.next.next;
        next = slow.next;
        // 翻转
        slow.next = pre;
        pre = slow;
        slow = next;
    }
    if (!slow || !next) {
        res = false;
    }
    if (fast) {
        // 奇数
        slow = slow.next;
    }
    while (slow && pre) {
        if (slow.val === pre.val) {
            slow = slow.next;
            pre = pre.next;
        } else {
            res = false;
            break;
        }
    }
    return res;
}
// 奇数
const list1 = new NodeList(1);
list1.next = new NodeList(2);
list1.next.next = new NodeList(3);
list1.next.next.next = new NodeList(2);
list1.next.next.next.next = new NodeList(1);
console.log(isPalindromeLinkedList(list1));
// 偶数
const list2 = new NodeList(3);
list2.next = new NodeList(2);
list2.next.next = new NodeList(1);
list2.next.next.next = new NodeList(1);
list2.next.next.next.next = new NodeList(2);
list2.next.next.next.next.next  = new NodeList(3);
console.log(isPalindromeLinkedList(list2));
// 非回文
const list3 = new NodeList(3);
list3.next = new NodeList(2);
console.log(isPalindromeLinkedList(list3));


