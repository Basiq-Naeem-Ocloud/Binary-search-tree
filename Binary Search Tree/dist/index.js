"use strict";
class BSTNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class Tree {
    constructor(data = []) {
        this.root = null;
        if (Array.isArray(data)) {
            for (const value of data) {
                this.insert(value);
            }
        }
        else {
            this.insert(data);
        }
    }
    insert(data) {
        const newNode = new BSTNode(data);
        if (this.root === null) {
            this.root = newNode;
        }
        else {
            let curNode = this.root;
            while (curNode) {
                if (data < curNode.data) {
                    if (!curNode.left) {
                        curNode.left = newNode;
                        break;
                    }
                    curNode = curNode.left;
                }
                else {
                    if (!curNode.right) {
                        curNode.right = newNode;
                        break;
                    }
                    curNode = curNode.right;
                }
            }
        }
    }
    contains(node, key) {
        if (!node) {
            return false;
        }
        if (node.data === key) {
            return true;
        }
        else if (node.data < key) {
            return this.contains(node.right, key);
        }
        else {
            return this.contains(node.left, key);
        }
    }
    preOrder(node) {
        if (node !== null) {
            console.log(node.data);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }
    inOrder(node) {
        if (node !== null) {
            this.inOrder(node.left);
            console.log(node.data);
            this.inOrder(node.right);
        }
    }
    postOrder(node) {
        if (node !== null) {
            this.preOrder(node.left);
            this.preOrder(node.right);
            console.log(node.data);
        }
    }
    findMinimumValue(node = this.root) {
        if (!node) {
            return null;
        }
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }
    findMaximumValue(node = this.root) {
        if (!node) {
            return null;
        }
        let current = node;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }
    treeHeight(node) {
        if (node == null) {
            return 0;
        }
        let left = this.treeHeight(node.left);
        let right = this.treeHeight(node.right);
        return 1 + Math.max(left, right);
    }
    deleteNode(key) {
        this.root = this.deleteBSTNode(this.root, key);
        console.log("deleted node now balacing it");
        console.log("-----------------");
        this.balanceTree();
    }
    deleteBSTNode(root, key) {
        if (!root) {
            return null;
        }
        let curr = root;
        let prev = null;
        while (curr !== null && curr.data !== key) {
            prev = curr;
            if (key < curr.data) {
                curr = curr.left;
            }
            else {
                curr = curr.right;
            }
        }
        if (curr === null) {
            return root;
        }
        if (!curr.left || !curr.right) {
            const newNode = curr.left ? curr.left : curr.right;
            if (!prev) {
                return newNode;
            }
            if (prev.left === curr) {
                prev.left = newNode;
            }
            else {
                prev.right = newNode;
            }
            return root;
        }
        let parent = null;
        let temp = curr.right;
        while (temp.left !== null) {
            parent = temp;
            temp = temp.left;
        }
        if (parent !== null) {
            parent.left = temp.right;
        }
        else {
            curr.right = temp.right;
        }
        curr.data = temp.data;
        return root;
    }
    printTreeLevelOrder(node = this.root) {
        if (!node) {
            return;
        }
        const queue = [];
        queue.push(node);
        let output = "";
        while (queue.length > 0) {
            const levelSize = queue.length;
            for (let i = 0; i < levelSize; i++) {
                const current = queue.shift();
                output += current.data + " ";
                if (current.left) {
                    queue.push(current.left);
                }
                if (current.right) {
                    queue.push(current.right);
                }
            }
            output += "\n";
        }
        console.log(output);
    }
    update(oldValue, newValue) {
        this.root = this.updateNode(this.root, oldValue, newValue);
    }
    updateNode(node, oldValue, newValue) {
        if (!node) {
            return null;
        }
        if (oldValue < node.data) {
            node.left = this.updateNode(node.left, oldValue, newValue);
        }
        else if (oldValue > node.data) {
            node.right = this.updateNode(node.right, oldValue, newValue);
        }
        else {
            if (oldValue !== newValue) {
                node.data = newValue;
                this.balanceTree();
            }
        }
        return node;
    }
    balanceTree() {
        this.root = this.balanceTreeRecursive(this.root);
    }
    balanceTreeRecursive(node) {
        if (!node) {
            return null;
        }
        node.left = this.balanceTreeRecursive(node.left);
        node.right = this.balanceTreeRecursive(node.right);
        if (!this.isBalanced(node)) {
            const leftHeight = this.treeHeight(node.left);
            const rightHeight = this.treeHeight(node.right);
            if (leftHeight > rightHeight) {
                node = this.rotateRight(node);
            }
            else {
                node = this.rotateLeft(node);
            }
        }
        return node;
    }
    isBalanced(node) {
        if (!node) {
            return true;
        }
        const leftHeight = this.treeHeight(node.left);
        const rightHeight = this.treeHeight(node.right);
        return Math.abs(leftHeight - rightHeight) <= 1;
    }
    rotateRight(node) {
        const newRoot = node.left;
        node.left = newRoot.right;
        newRoot.right = node;
        return newRoot;
    }
    rotateLeft(node) {
        const newRoot = node.right;
        node.right = newRoot.left;
        newRoot.left = node;
        return newRoot;
    }
}
const arrayValues = [5, 3, 7, 2, 4, 6, 8];
const tree = new Tree(arrayValues);
console.log("Original tree:");
tree.printTreeLevelOrder();
tree.update(3, 9);
console.log("Tree after updating node 3 to 9:");
tree.printTreeLevelOrder();
