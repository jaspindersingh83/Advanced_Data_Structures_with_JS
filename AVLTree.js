
class BST {
   constructor (){
       this.value = null;
       this.left = null;
       this.right = null;
       this.parent = null;
   }
   insert(value){
       let currentNode;
       if(!this.value){
           this.value = value;
           currentNode = this;
           return currentNode;
       }
       if(this.value > value){
           if(!this.left){
               this.left = new BST();
               currentNode= this.left;
               this.left.parent = this;
           }
           return this.left.insert(value)
       }
       if(this.value < value){
            if(!this.right){
                this.right = new BST();
                currentNode= this.right;
                this.right.parent = this;
            }
            return this.right.insert(value)
        }
       
    }

    caluclateheight(){
        if(!this.left && !this.right) return 0;
        let leftHeight = 0; let rightHeight = 0;
        if(this.left){
            leftHeight = this.left.caluclateheight();
        }
        if(this.right){
            rightHeight  = this.right.caluclateheight();
        }
        return Math.max(leftHeight, rightHeight) + 1;
    }
    search(value){
        if(!this.value) return null;
        if(this.value === value) return this;
        if(this.value > value){
            return this.left.search(value)
        } else {
            return this.right.search(value)
        }

    }

    inorderSuccessor(node){
        //Case 1 Node has a right child
        if(node.right){
            node = node.right
            while(node.left){
                node = node.left
            }
            return node;
        } else {
            // Case2 Node doesn't have a right child 
             while(node.parent){
                 if(node === node.parent.left){
                     break;
                 }
                node = node.parent 
            }
            return node.parent
        }  
    }
    inorderPredecessor(node){
        //Case 1 If the node has a left node
        if(node.left) return node.left;
        //Case 2 if node is right node
        if(node === node.parent.right) return node.parent;
        while(node.parent){
            if(node === node.parent.right) break;
            node = node.parent
        }
        return node.parent
    }
    checkViolation(){
        let balancefactor = Math.abs(this.left.caluclateheight() -this.right.caluclateheight());
        if(balancefactor>1) return true;
        return false;
    }
    rotateLeft(){
        this.right.parent = this.parent;
        if(this.parent){
            this.parent.left = this.right;
        }
        this.parent = this.right;
        let temp = this.right;
        if(this.right.left){
            this.right.left.parent  = this;
            this.right = this.right.left;
        } else {
            this.right = null;
        }
        temp.left = this;
        console.log(temp.parent.left.value)
        return temp;
    }
    rotateright(){
        this.left.parent = this.parent;
        if(this.parent){
            this.parent.right = this.left;
        }
        this.parent = this.left;
        let temp = this.left;
        if(this.left.right){
            this.left.right.parent  = this;
            this.left = this.left.right;
        } else {
            this.left = null;
        }
        temp.right = this;
        return temp;
    }
    delete(value){
        let node = this.search(value);
        //Case 1 When node is a leaf node
        if(!node.left && !node.right){
            if(node.parent.left === node){
                node.parent.left = null
            } else node.parent.right = null;
            node.parent = null
            //if normal BST just return root;
            //Below only for AVL tree
            return node.parent
        }
        //Case 2 Node to be deleted has just one child..Copy the child to the node
        // and delete the child
        if(!node.left || !node.right){
            if(!node.left){
                node.value = node.right.value;
                node.right.parent= null;   
                node.right = null;
            } else {
                node.value = node.left.value;
                node.left.parent= null    
                node.left = null;
            }
            //if normal BST just return root;
            return node
        }
        //Case 3 Node has two children. Copy inorderSuccessor to node and delete inorderSuccessor.
        let inorder = this.inorderSuccessor(node)
        node.value = inorder.value;
        if(inorder === inorder.parent.left){
            inorder.parent.left = null;
        } else inorder.parent.right = null;
        inorder.parent = null;
        //if normal BST just return root;
        return node
    }  
}

function AVLInsert(myBST,value){
    let root;
    let currentNode = myBST.insert(value);
    if(!currentNode.parent) return myBST;
    currentNode = currentNode.parent;
    while(currentNode){
        if(currentNode.checkViolation()){  
            let leftHeight = currentNode.left.caluclateheight();
            let rightHeight = currentNode.right.caluclateheight();
            if(leftHeight< rightHeight){
                currentNode = currentNode.rotateLeft();
            } else {
                currentNode= currentNode.rotateright();
            }
        }
        if(!currentNode.parent) {
            root = currentNode;
        }
        currentNode = currentNode.parent;
    }
    return root;
}
function AVLDelete(root,value ){
    let traversenode = root.delete(value)
    // console.log(traversenode)
    while(traversenode.parent){
        if(traversenode.checkViolation()){
            let leftHeight = traversenode.left.caluclateheight();
            let rightHeight = traversenode.right.caluclateheight();
            if(leftHeight < rightHeight){
                traversenode = traversenode.rotateLeft()
            } else {
                traversenode = traversenode.rotateright()
            }
        }
        traversenode = traversenode.parent
    }
    return traversenode
}

let myBST = new BST();
myBST.insert(11)
myBST.insert(14)
myBST.insert(12)
myBST.insert(15)
myBST.insert(2)
myBST.insert(7)
myBST.insert(8)
myBST.insert(9)
myBST.insert(1)
myBST.insert(5)
myBST.insert(4)
// myBST.delete(4)
myBST.delete(14)
// myBST.delete(2)
myBST= AVLDelete(myBST,2);
// console.log(myBST.inorderPredecessor(myBST.search(1)))
// myBST= AVLInsert(myBST,6);

// myBST.left= myBST.left.rotateLeft();
// myBST = myBST.rotateright();
console.log(myBST)