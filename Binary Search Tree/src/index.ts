class BSTNode {  //node class
    data: number;
    left: BSTNode | null;
    right: BSTNode | null;

    constructor(data: number) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    root: BSTNode | null

    constructor(data: number | number[] = []) {
        this.root = null;
        if (Array.isArray(data)) {
            for (const value of data) {
                this.insert(value);
            }
        } else {
            this.insert(data);
        }
        this.balanceTree();
    }

    insert(data: number): void {
        // Convert float value to integer
        const intValue = Math.floor(data);
        const newNode = new BSTNode(intValue)
        if (this.root === null) {
            this.root = newNode;
        } else {
            let curNode = this.root


            while (curNode) {
                if (intValue === curNode.data) {
                    console.log(`Value ${intValue} already exists in the tree. Skipping insertion.`);
                    return;
                }
                if (intValue < curNode.data) {
                    if (!curNode.left) {
                        curNode.left = newNode;
                        break
                    }
                    curNode = curNode.left;
                } else {
                    if (!curNode.right) {
                        curNode.right = newNode;
                        break
                    }
                    curNode = curNode.right;
                }
            }
        }


    }

    //contains function check the existance of a node's value in tree
    contains(node: BSTNode | null, key: number): boolean {
        if (!node) {
            return false; // If node is null key doesn't exist
        }

        if (node.data === key) {
            return true;
        } else if (node.data < key) {
            return this.contains(node.right, key); // Search in the right subtree
        } else {
            return this.contains(node.left, key); // Search in the left subtree
        }
    }


    inOrder(): void {
        if (this.root === null) {
            return;
        }

        const traverse = (node: BSTNode | null): void => {
            if (node !== null) {
                traverse(node.left);
                console.log(node.data);
                traverse(node.right);
            }
        };

        traverse(this.root);
    }
    preOrder(): void {
        if (this.root === null) {
            return;
        }

        const traverse = (node: BSTNode | null): void => {
            if (node !== null) {
                console.log(node.data);
                traverse(node.left);
                traverse(node.right);
            }
        };

        traverse(this.root);
    }

    postOrder(): void {
        if (this.root === null) {
            return;
        }

        const traverse = (node: BSTNode | null): void => {
            if (node !== null) {
                traverse(node.left);
                traverse(node.right);
                console.log(node.data);
            }
        };

        traverse(this.root);
    }



    //function to find minimum node's value
    findMinimumValue(node: BSTNode | null = this.root): number | null {
        if (!node) {
            return null;
        }
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    // Function to find the maximum value in the tree
    findMaximumValue(node: BSTNode | null = this.root): number | null {
        if (!node) {
            return null;
        }
        let current = node;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }

    treeHeight(node: BSTNode | null = this.root): number  //function to find tree height
    {
        if (node == null) {
            return 0
        }

        let left = this.treeHeight(node.left)
        let right = this.treeHeight(node.right)

        return 1 + Math.max(left, right)
    }


    deleteNode(key: number): void {
        this.root = this.deleteBSTNode(this.root, key);
        this.balanceTree();

    }

    private deleteBSTNode(root: BSTNode | null, key: number): BSTNode | null {
        if (!root) {
            return null;
        }

        let curr: BSTNode | null = root;
        let prev: BSTNode | null = null;


        while (curr !== null && curr.data !== key) {
            prev = curr;
            if (key < curr.data) {
                curr = curr.left;
            } else {
                curr = curr.right;
            }
        }


        if (curr === null) {
            return root; // Key not found
        }

        // Case 1: Node has at most one child
        if (!curr.left || !curr.right) {
            const newNode = curr.left ? curr.left : curr.right;

            if (!prev) {
                return newNode;
            }

            if (prev.left === curr) {
                prev.left = newNode;
            } else {
                prev.right = newNode;
            }
            return root;
        }

        // Case 2: Node has two children
        let parent: BSTNode | null = null;
        let temp = curr.right;

        while (temp.left !== null) {
            parent = temp;
            temp = temp.left;
        }

        if (parent !== null) {
            parent.left = temp.right;
        } else {
            curr.right = temp.right;
        }

        curr.data = temp.data;
        return root;
    }


// // Function to update a node's value in the tree while maintaining the binary search tree property
    update(oldValue: number, newValue: number): void {
        // Convert float values to integers
        const oldIntValue = Math.floor(oldValue);
        const newIntValue = Math.floor(newValue);

        // Check if old value is equal to new value
        if (oldIntValue === newIntValue) {
            console.log(`Old value ${oldIntValue} is equal to new value ${newIntValue}. Skipping update.`);
            return;
        }

        // Proceed with updating the value
        this.root = this.updateNode(this.root, oldIntValue, newIntValue);
        if (this.root) {
            const nodes: number[] = [];
            this.preOrderTraversal(this.root, nodes);

            // Create a new tree with the updated nodes array
            const newTree = new Tree(nodes);
            this.root = newTree.root;
            // this.balanceTree();
        }
        // this.root = this.updateNode(this.root, oldValue, newValue);
    }

    private preOrderTraversal(node: BSTNode | null, nodes: number[]): void {
        if (node) {
            nodes.push(node.data);
            this.preOrderTraversal(node.left, nodes);
            this.preOrderTraversal(node.right, nodes);
        }
    }

    private updateNode(node: BSTNode | null, oldValue: number, newValue: number): BSTNode | null {
        if (!node) {
            return null; // Node with old value not found
        }

        if (oldValue < node.data) {
            node.left = this.updateNode(node.left, oldValue, newValue);
        } else if (oldValue > node.data) {
            node.right = this.updateNode(node.right, oldValue, newValue);
        } else {
            // If newValue is equal to oldValue no change needed
            // Node with old value found update its value with the new value
            if (oldValue !== newValue) {
                node.data = newValue;

            }

        }

        return node;
    }


    // Function to balance the binary search tree
    balanceTree(): void {
        this.root = this.balanceTreeRecursive(this.root);
    }

    private balanceTreeRecursive(node: BSTNode | null): BSTNode | null {

        if (!node) {
            return null;
        }

        // Balance left and right subtrees recursively
        node.left = this.balanceTreeRecursive(node.left);

        node.right = this.balanceTreeRecursive(node.right);

        // Check if the tree needs balancing
        if (!this.isBalanced(node)) {
            // Tree is unbalanced, perform rotations
            const leftHeight = this.treeHeight(node.left);

            const rightHeight = this.treeHeight(node.right);

            if (leftHeight > rightHeight) {
                // Left heavy, perform right rotation
                node = this.rotateRight(node);
            } else {
                // Right heavy, perform left rotation
                node = this.rotateLeft(node);
            }
        }

        return node;
    }


// Function to check if a node is balanced
    isBalanced(node: BSTNode | null = this.root): boolean {
        if (!node) {
            return true;
        }

        const leftHeight = this.treeHeight(node.left);
        const rightHeight = this.treeHeight(node.right);

        return Math.abs(leftHeight - rightHeight) <= 1;
    }

// Function to perform a right rotation
    private rotateRight(node: BSTNode): BSTNode {
        const newRoot = node.left!;
        node.left = newRoot.right;
        newRoot.right = node;
        return newRoot;
    }

// Function to perform a left rotation
    private rotateLeft(node: BSTNode): BSTNode {
        const newRoot = node.right!;
        node.right = newRoot.left;
        newRoot.left = node;
        return newRoot;
    }
}


// test cases :




const tree = new Tree();
tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(2);
tree.insert(4);
tree.insert(6);
tree.insert(8);



console.log("Height of the tree:", tree.treeHeight(tree.root));


const singleValue = 5;
const arrayValues = [5, 3, 7, 2, 4, 6, 8];

const treeFromSingleValue = new Tree(singleValue);
console.log("Height of the tree (from single value):", treeFromSingleValue.treeHeight(treeFromSingleValue.root)); // Output: 1


//from array
const treeFromArray = new Tree(arrayValues);
console.log(treeFromArray.findMinimumValue(treeFromArray.root));
console.log(treeFromArray.findMaximumValue(treeFromArray.root));



// treeFromArray.preOrder(treeFromArray.root);
// console.log("--------------");

// treeFromArray.inOrder(treeFromArray.root);
// console.log("--------------");
// treeFromArray.postOrder(treeFromArray.root);
// console.log("Height of the tree (from array):", treeFromArray.treeHeight(treeFromArray.root)); // Output: 3




// delete fucntion 

const tree1 = new Tree([5, 4, 8, 2, 1, 6, 7]);


// console.log("Original tree:");
// tree1.inOrder(tree1.root)



// // // Test case 1: Deleting a leaf node (e.g., node with key 2)
// // tree1.deleteNode(1);

// // // Test case 2: Deleting a node with one child (e.g., node with key 4)
// // tree1.deleteNode(4);

// // // Test case 3: Deleting a node with two children (e.g., node with key 7)
// // tree1.deleteNode(7);

// // // Test case 4: Deleting the root node (e.g., node with key 5)
// // tree1.deleteNode(5);

// // Test case 5: Deleting a node not present in the tree (e.g., node with key 10)
// // tree1.deleteNode(10);

// // console.log("Tree after deletions: \n -----------");




// tree1.inOrder(tree.root);
