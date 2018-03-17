function Trienode(key){
    this.key = key;
    this.children = {};
    this.isLeaf = false;
    //Trick to get size;
    this.size = 0;
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
          currentNode.size++;
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
    //Hacker Rank Question 1
    findPrefix(string){
        string = string.toLowerCase();
        let currentNode = this.root;
        for(let i = 0; i < string.length; i++){
            if(!currentNode.children[string[i]]){
              return 0;
            }
            currentNode = currentNode.children[string[i]];
            if( i === string.length-1 ){
                if(currentNode.isLeaf)return currentNode.size+1;
                return currentNode.size
            }
        }
    }
}

let myTrie = new Trie();
// myTrie.insert('hacky');
// myTrie.insert('hackerrank');
// myTrie.insert('Username');
// myTrie.insert('password');

myTrie.insert('s');
myTrie.insert('ss');
myTrie.insert('sss');
myTrie.insert('ssss');
myTrie.insert('sssss');
console.log(myTrie.findPrefix('s'))
