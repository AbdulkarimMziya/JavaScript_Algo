class  Node {
    constructor (value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    _size = 0;

    constructor () {
        this._head = new Node(-1);
    }

    // size(): returns the size of the list.
    get size() {
        return this._size;
    }

    // head(): returns the first node in the list.
    get head() {
        return this._head.next;
    }

    // tail(): returns the lasrt node in the list.
    get tail() {
        let curNode = this._head.next;

        while (curNode.next !== null) {
            curNode = curNode.next;
        }

        return curNode;
    }

    // append(): Adds new node to the end of the list.
    append(value) {
        let curNode = this._head;

        while(curNode.next !== null) {
            curNode = curNode.next;
        }

        const newNode = new Node(value);
        curNode.next = newNode;
        this._size++;
    }
    
    // prepend(): Adds new node to the start of the list.
    prepend(value) {
        const newNode = new Node(value, this._head.next);
        this._head.next = newNode;
        this._size++;
    }

    // at(index): returns the node at the given index.
    at(index) {

        if(index < 0 || index >= this.size) return null;

        let curNode = this._head.next;

        while (index-- > 0 ) {
            curNode = curNode.next;
        }

        return curNode;
    }

    // pop(): removes the last node from the list.
    pop() {
        if (this.size === 0) {
            throw new Error("Cannot pop(), list is empty!!!");
            return;
        }

        let curNode = this._head;
        while (curNode.next.next !== null) {
            curNode = curNode.next;
        }

        const removedNode = curNode.next;
        curNode.next = null;
        this._size--;

        return removedNode;
    }

    // contains(value): checks if the list contains the value.
    contains(value) {
        let curNode = this._head.next;

        while (curNode !== null) {
            if (curNode.value === value) {
                return true;
            }
            curNode = curNode.next;
        }

        return false;
    }

    // find(value): returns the index of the node containing the value or null if not found.
    find(value) {
        let curNode = this._head.next;
        let index = 0;

        while (curNode !== null) {
            if (curNode.value === value) {
                return index;
            }
            curNode = curNode.next;
            index++;
        }

        return null; 
    }

    // toString(): returns a string representation of the list.
    toString() {
        let str = '';
        let curNode = this._head.next;

        while (curNode !== null) {
            str += curNode.value + '->';
            curNode = curNode.next;
        }

        return str.slice(0, -2);  // Remove the last '->'
    }

    // insertAt(value,index): inserts new node at the given index.
    insertAt(value, index) {
        if (index < 0 || index > this._size) {
            throw new Error("Index out of bounds");
        }
    
        let curNode = this._head;
        while (index-- > 0) {
            curNode = curNode.next;
        }
    
        const newNode = new Node(value, curNode.next);
        curNode.next = newNode;
        this._size++;
    }
    
    // removeAt(index): removes node at the given index.
    removeAt(index) {
        if (index < 0 || index >= this._size) {
            throw new Error("Index out of bounds");
        }
    
        let curNode = this._head;
        while (index-- > 0) {
            curNode = curNode.next;
        }
    
        const removedNode = curNode.next;
        curNode.next = removedNode.next;
        this._size--;
        return removedNode;
    }

}

const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");


console.log(list.toString());
console.log("List size: " + list.size);