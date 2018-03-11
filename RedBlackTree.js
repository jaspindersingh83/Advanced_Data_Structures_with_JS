class BinarySearchTree {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
    insert(value) {
        if (!this.value) {
            this.value = value;
            return;
        }
        if (this.value > value) {
            if (!this.left) {
                this.left = new RedBlackTree();
                this.left.value = value;
                this.left.parent = this;
            } else {
               this.left.insert(value);
            }
        } else {
            if (!this.right) {
                this.right = new RedBlackTree();
                this.right.value = value;
                this.right.parent = this;
            } else {
               this.right.insert(value);
            }
        }
    }
    search(value) {
        if (this.value === value || this.value === null) {
            return this;
        } 
        if (this.value > value) {
            return this.left.search(value);
        } return this.right.search(value)
    }
    rotateLeft(){
        // console.log(this.value
        // console.log(this)
        let y = this.right;
        this.right = y.left;
        if (y.left) {
            y.left.parent = this;
        }
        y.parent = this.parent;
        
        if (this === this.parent.left){
            this.parent.left = y;
        } else {
            this.parent.right = y;
        }
        y.left = this;
       this.parent = y;
    }
    rotateRight(){
        // console.log(this.value
        // console.log(this)
        let y = this.left;
        this.left = y.right;
        if (y.right) {
            y.right.parent = this;
        }
        y.parent = this.parent;
        if (this.parent){
            if (this === this.parent.right) {
                this.parent.right = y;
            } else {
                this.parent.left = y;
            }
        }
        y.right = this;
       this.parent = y;
    //    console.log(this.parent)
    }
}



class RedBlackTree extends BinarySearchTree {
    constructor(value) {
        super();
        this.root;
    }

    fixviolation(currentNode) {
        // let root;
        while(currentNode.parent && currentNode.parent.color==='red'){
                //console.log(currentNode.value < this.value)
            if (currentNode.value < this.value) {
                //Case 1 Uncle is 'red'
                ///Change the color of parent and uncle to black
                // console.log(currentNode.uncle.value)
                if (currentNode.uncle.color === 'red'){
                    // console.log(currentNode.value)
                    currentNode.parent.color = 'black';
                    currentNode.uncle.color = 'black';
                    currentNode.grandparent.color = 'red';
                    currentNode = currentNode.grandparent;
                } else {/// i.e The right uncle is a black node
                    // console.log(currentNode.value)
                    //Case 2 if current node is right child of parent 
                        // and parent is left child of grandparent
                    if (currentNode.parent.right === currentNode && currentNode.parent === currentNode.grandparent.left) {
                        // console.log(currentNode.value)
                        currentNode = currentNode.parent;
                        // console.log(currentNode.value)
                        currentNode.rotateLeft();   
                    }
                    // console.log(currentNode.value)
                    // console.log(currentNode.grandparent.left.value)
                    //Case 3 if current node is left child of parent 
                        // and parent is left child of grandparent.
                    if (currentNode===currentNode.parent.left && currentNode.parent===currentNode.grandparent.left) {
                        // console.log(currentNode.value)
                        currentNode.parent.color = 'black';
                        currentNode.grandparent.color='red';
                        currentNode = currentNode.grandparent;
                        // console.log(currentNode.value)
                        currentNode.rotateRight();
                        currentNode = currentNode.parent;
                        // console.log(currentNode.parent)
                    }
                }
            } else {

            }
        }
        if (!currentNode.parent) {
            currentNode.color = 'black'
        }
       this.root = currentNode;
    }
    
    insertrbTree(value){
       this.insert(value);
       let currentNode = this.search(value);
       currentNode.color = 'red';
       this.fixviolation(currentNode);
       return this.root;
    }
    get sibling() {
        if (this.value === this.parent.left.value) return this.parent.right;
        if (this.value === this.parent.right.value) return this.parent.left;
    }
    get uncle() {
        return this.parent.sibling;
    }
    get grandparent() {
        return this.parent.parent;
    }
    get isroot() {
        if(this.parent) return false;
        return true;
    }
}


let rbTree = new RedBlackTree();
rbTree.insertrbTree(11);
rbTree.insertrbTree(14);
rbTree.insertrbTree(2);
rbTree.insertrbTree(7);
rbTree.insertrbTree(15);
rbTree.insertrbTree(1);
rbTree.insertrbTree(5);
rbTree.insertrbTree(8);
rbTree.insertrbTree(4);
console.log(rbTree.root)