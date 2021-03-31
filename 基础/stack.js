/**
 * 不使用js数组提供的api
 */
class Stack {
    /**
     * 数组
     */
    items
    /**
     * 栈的大小
     */
    cap
    /**
     * 栈中数据的大小
     */
    count
    constructor(cap) {
        this.items = new Array(cap);
        this.cap = cap;
        this.count = 0;
    }
    pop() {
      if (this.count === 0) {
          return null;
      }
      const temp = this.items[this.count - 1];
      this.count --;
      return temp;
    }
    push(val) {
        if (this.cap === this.count) {
            // 栈空间满了
            // 扩容成原来的两倍
            this.cap = 2 * this.cap;
            const temp = new Array(this.cap);
            for(let i = 0; i < this.cap; i ++) {
                temp[i] = this.items[i];
            }
            this.items = temp;

        }
        this.items[this.count] = val;
        this.count ++;
        return true;
    }

    /**
     * 取栈顶元素
     */
    top() {
        return this.items[this.count - 1];
    }
}
const res = calculator('34+13*9*2+44-12/3');
console.log(res, res === (34+13*9*2+44-12/3))

/**
 * 模拟编译器运算
 * 只考虑加减乘除
 * @param str
 * @return {number}
 */
function calculator(str) {
    if (!str) {
        return 0;
    }
    const len = str.length;
    if (len < 3) {
        return +str;
    }
    // 简单定义一下优先级
    const map = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    }
    // 数字栈
    const numberStack = new Stack(len);
    // 操作栈
    const opStack = new Stack(len);
    for(let i = 0; i < len; i ++) {
        let temp = '';
        // 合并多位数字
        while (isNumber(str[i])) {
            temp += str[i];
            i++;
        }
        let item = str[i];
        if (temp !== '') {
            numberStack.push(+temp);
        }
        let top = opStack.top();
        while (top && map[item] <= map[top]) {
            // 优先级比栈顶元素小，进行计算
            const n2 = numberStack.pop() || 0;
            const n1 = numberStack.pop() || 0;
            numberStack.push(calc(n1,  n2, opStack.pop()));
            top = opStack.top();
        }
        if (item) {
            opStack.push(item)
        }
    }
    while (opStack.top() !== undefined) {
        // 清空栈
        const n2 = numberStack.pop() || 0;
        const n1 = numberStack.pop() || 0;
        numberStack.push(calc(n1,  n2, opStack.pop()));
    }
    return numberStack.top();
    function calc(t1, t2, op) {
        switch (op) {
            case '+':
                return t1 + t2;
            case '-':
                return t1 - t2;
            case '*':
                return t1 * t2;
            case '/':
                return t1 / t2;
            default:
                return t1 + t2;
        }
    }
    function isNumber(v) {
        v = +v;
        return typeof v === 'number' && !isNaN(v);
    }
}

