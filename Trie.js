function Trienode(key){
    this.key = key;
    this.children = {};
    this.isLeaf = false;
}

class Trie{
    constructor(){
        this.root = new Trienode(null);
    }
    insert(string){
        string = string.toLowerCase();
        let currentNode = this.root;
        for(let i = 0; i < string.length; i++){
          if(!currentNode.children[string[i]]){
            //If not present. Insert a new node
            currentNode.children[string[i]] = new Trienode(string[i]);
          }
          //Move to currentNode
          currentNode = currentNode.children[string[i]];
          if( i === string.length-1 ){
              //Make the last node as leaf node;
              currentNode.isLeaf = true;
            }
        }
    }
    search(string){
        string = string.toLowerCase();
        let currentNode = this.root;
        for(let i = 0; i < string.length; i++){
            if(!currentNode.children[string[i]]){
              return false;
            }
            currentNode = currentNode.children[string[i]];
            if( i === string.length-1 ){
                if(currentNode.isLeaf) return true;
                else return false;
            }
        }
    }
}

let myTrie = new Trie();
myTrie.insert('Any');
myTrie.insert('Anty');
myTrie.insert('Username');
myTrie.insert('password');
console.log(myTrie.search('password'))
console.log(myTrie)