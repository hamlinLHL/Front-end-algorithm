/**
 * 单链表节点
 */
module.exports['NodeList'] = class NodeList {
    val;
    next;
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

/**
 * 双链表节点
 */
module.exports['DoublyNodeList'] =  class DoublyNodeList {
    val;
    next;
    pre;
    constructor(val, pre = null, next = null) {
        this.val = val;
        this.pre = pre;
        this.next = next;
    }
}

/**
 * 打印链表
 * @param root
 */
module.exports['consoleList'] = function consoleList(root) {
    let res = '';
    while (root) {
        res += `${root.val} -> `;
        root = root.next;
    }
    res += 'null';
    console.log(res);
}

/**
 * 生成链表
 * @param n
 * @return {*}
 */
module.exports['genList'] = function genList(n) {
    const dummy = new NodeList(0, new NodeList(n, null));
    let head = dummy.next;
    while (n > 0) {
        n--;
        head.next = new NodeList(n);
        head = head.next;
    }
    return dummy.next;
}
