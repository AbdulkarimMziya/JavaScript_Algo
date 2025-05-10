class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.#buildTree(Array.from(new Set(array.sort((a, b) => a - b))));
    }

    #buildTree(array) {
        if (array.length === 0) return null;

        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.#buildTree(array.slice(0, mid));
        root.right = this.#buildTree(array.slice(mid + 1));

        return root;
    }

    #preTraversal(root, value) {
        if (root === null) return null;
    
        if (root.data === value) {
            return root;
        }
    
        const leftResult = this.#preTraversal(root.left, value);
        if (leftResult !== null) return leftResult;
    
        const rightResult = this.#preTraversal(root.right, value);
        if (rightResult !== null) return rightResult;
    
        return null;
    }

    #predecessor(node) {
        if (node.left === null) return null;
    
        let current = node.left;
        while (current.right !== null) {
            current = current.right;
        }
        return current;
    }
    

    find(value) {
        return this.#preTraversal(this.root,value);
    }

    insert(value) {
        const newNode = new Node(value);
    
        if (this.root === null) {
            this.root = newNode;
            return;
        }
    
        let current = this.root;
    
        while (true) {
            if (value < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    #deleteNode(node, value) {
        if (node === null) return null;
    
        if (value < node.data) {
            node.left = this.#deleteNode(node.left, value);
        } else if (value > node.data) {
            node.right = this.#deleteNode(node.right, value);
        } else {
            // Node to be deleted found
    
            // Case 1: No left child
            if (node.left === null) return node.right;
    
            // Case 2: No right child
            if (node.right === null) return node.left;
    
            // Case 3: Two children
            const predecessor = this.#predecessor(node);
            node.data = predecessor.data;
    
            // Delete the predecessor node from left subtree
            node.left = this.#deleteNode(node.left, predecessor.data);
        }
    
        return node;
    }
    
    delete(value) {
        this.root = this.#deleteNode(this.root, value);
    }
    
    levelOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
    
        const queue = [];
        if (this.root) queue.push(this.root);
    
        while (queue.length > 0) {
            const current = queue.shift();
            callback(current);
    
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }
    
    inOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
    
        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left);
            callback(node);
            traverse(node.right);
        };
    
        traverse(this.root);
    }

    preOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
    
        const traverse = (node) => {
            if (node === null) return;
            callback(node);
            traverse(node.left);
            traverse(node.right);
        };
    
        traverse(this.root);
    }
    
    postOrder(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required.");
        }
    
        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left);
            traverse(node.right);
            callback(node);
        };
    
        traverse(this.root);
    }
    
    height(value) {
        const node = this.find(value);
        if (!node) return null;
    
        const getHeight = (node) => {
            if (node === null) return -1; // edge count, not node count
            return 1 + Math.max(getHeight(node.left), getHeight(node.right));
        };
    
        return getHeight(node);
    }

    depth(value) {
        const findDepth = (node, currentDepth = 0) => {
            if (node === null) return null;
            if (node.data === value) return currentDepth;
    
            const left = findDepth(node.left, currentDepth + 1);
            if (left !== null) return left;
    
            return findDepth(node.right, currentDepth + 1);
        };
    
        return findDepth(this.root);
    }
    
}