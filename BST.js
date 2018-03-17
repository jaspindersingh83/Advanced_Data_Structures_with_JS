function node(value){
    this.value = value;
    this.left = null;
    this.right = null;
}

class BST {
    constructor(){
        this.root = null;
    }
   
}

function insert(root, value){
    let newNode = new node(value);
    if(!root){
        root = newNode;
    } 
    if(root.value > value){
        root.left = insert(root.left, value);
    }
    return root
}

let myBST  = new BST();
let root = myBST.root
root = insert(root, 5)
root = insert(root, 2)
// myBST.insert(2)

console.log(root);