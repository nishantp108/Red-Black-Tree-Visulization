//Red Black Tree
// Model - 1 Search Tree 

//Node Structure
class Node{
    constructor(key){
        this.key = key;
        this.left=null;
        this.right=null;
        this.color = "red";
    }
}
//stack data structure
class Stack {
    constructor() {
        this.items = [];
    }
    
    // add element to the stack
    add(element) {
        return this.items.push(element);
    }
    
    // remove element from the stack
    remove() {
        if(this.items.length > 0) {
            return this.items.pop();
        }
    }
    
    // view the last element
    peek() {
        return this.items[this.items.length - 1];
    }
    
    // check if the stack is empty
    isEmpty(){
       return this.items.length == 0;
    }
   
    // the size of the stack
    size(){
        return this.items.length;
    }
 
    // empty the stack
    clear(){
        this.items = [];
    }
}

//Rotation
function rightRotation(ptr){
    let leftChild = ptr.left;
    ptr.left = leftChild.right;
    leftChild.right = ptr;
    return leftChild;
}
function leftRotation(ptr){
    console.log(ptr.key);
    let rightChild = ptr.right;
    ptr.right = rightChild.left;
    rightChild.left = ptr;
    return rightChild;
}
let key;
//let new_node = new Node();
let rootobj = {
    root:null,
}
function insertBtn()
{
    key = parseInt(document.getElementById("txtInput").value);
    insert(key,rootobj);
    // console.log(key,rootobj);
    document.getElementById("txtInput").value = '';
    // document.getElementById("take").value = 'Element Inserted';
    sigmaObject();
    generateTree(rootobj.root,100,10,0,100);
}
function deleteBtn()
{
    key = parseInt(document.getElementById("txtInput1").value);
    remove(key,rootobj);
    document.getElementById("txtInput1").value = '';
    // document.getElementById("take").value = '';
    sigmaObject();
    generateTree(rootobj.root,100,10,0,100);
}
function findBtn()
{
    key = parseInt(document.getElementById("txtInput2").value);
    find(key,rootobj);
    document.getElementById("txtInput2").value = '';
    // document.getElementById("take").value = '';
    // console.log(key,rootobj);
    
}
function insert(key, rootobj)
{
    const new_node = new Node(key);
    if(!rootobj.root){
        new_node.key = key;
        new_node.left = key;
        new_node.color = "black";
        rootobj.root = new_node;
        
    }
    
    else{
        //create stack
        let stack = new Stack();
        //iterate till end
        let ptr = rootobj.root;
        while(ptr.right){
            stack.add(ptr);
            if(ptr.key > key){
                ptr = ptr.left;
            }else{
                ptr = ptr.right;
            }
        }
        
        //check if value already exists
        if(ptr.key == key){
            //key can't be inserted;
            return;
        }
        
        //compare ptr and new_node
        let oldLeaf, newLeaf;
        oldLeaf = new Node(ptr.key);
        oldLeaf.left = ptr.left;
        oldLeaf.color = "red";
        oldLeaf.right = null;

        newLeaf = new Node(key);
        newLeaf.left = key;
        newLeaf.color = "red";
        newLeaf.right = null;
        if(ptr.key > key){
            ptr.left = newLeaf;
            ptr.right = oldLeaf;
        }else{
            ptr.left = oldLeaf;
            ptr.right = newLeaf;
            ptr.key = key;
        }
        
        //check Color, Rebalance
        let flag = 0;
        //No balance is required
        if(ptr.color == "black" || ptr == rootobj.root){
            flag = 1;   
        }
        while(!stack.isEmpty() && !flag){
            let upperNode, otherNode;
            upperNode = stack.remove();
            
            //upperNode == black
            //upperNode.left == upperNode.right == red
            // console.log("12", ptr, ptr.left, ptr.right);
            // console.log(upperNode.left.color, ptr.color,upperNode.right.color);
            
            if(upperNode.left.color == upperNode.right.color){
                upperNode.left.color = "black";
                upperNode.right.color = "black";
                upperNode.color = "red";
                // console.log("qw");
            }else{
                //otherNode = black
                //ptr is on lefthand side
                if(ptr == upperNode.left){
                    otherNode = upperNode.right;
                    //ptr.right.color == black
                    // console.log(upperNode.key);
                        
                    if(ptr.right.color == "black"){
                        let upperUpperNode = stack.peek();
                        //console.log(upperUpperNode.key);
                        upperNode = rightRotation(upperNode);
                        if(stack.isEmpty()){
                            rootobj.root = upperNode;
                        }else{
                            if(upperUpperNode.key > upperNode.key){
                                upperUpperNode.left = upperNode;
                            }else{
                                upperUpperNode.right = upperNode;
                            }
                        }
                        upperNode.right.color = "red";
                        upperNode.color = "black";
                        flag = 1;
                    }else{
                        //ptr.right.color == red
                        upperNode.left =  leftRotation(ptr);
                        let upperUpperNode = stack.peek();
                        upperNode = rightRotation(upperNode);
                        if(stack.isEmpty()){
                            rootobj.root = upperNode;
                        }else{
                            if(upperUpperNode.key > upperNode.key){
                                upperUpperNode.left = upperNode;
                            }else{
                                upperUpperNode.right = upperNode;
                            }
                        }
                        upperNode.right.color = "black";
                        upperNode.left.color = "black";
                        upperNode.color = "red";
                    }
                }else{
                    //ptr on righthand 
                    otherNode = upperNode.left;
                    if(ptr.left.color == "black"){
                        let upperUpperNode = stack.peek();
                        upperNode = leftRotation(upperNode);
                        if(stack.isEmpty()){
                            rootobj.root = upperNode;
                        }else{
                            if(upperUpperNode.key > upperNode.key){
                                upperUpperNode.left = upperNode;
                            }else{
                                upperUpperNode.right = upperNode;
                            }
                        }
                        upperNode.left.color = "red";
                        upperNode.color = "black";
                        flag = 1;
                    }else{
                        upperNode.right = rightRotation(ptr);
                        let upperUpperNode = stack.peek();
                        upperNode = leftRotation(upperNode);
                        if(stack.isEmpty()){
                            rootobj.root = upperNode;
                        }else{
                            if(upperUpperNode.key > upperNode.key){
                                upperUpperNode.left = upperNode;
                            }else{
                                upperUpperNode.right = upperNode;
                            }
                        }
                        upperNode.right.color = "black";
                        upperNode.left.color = "black";
                        upperNode.color = "red";
                    }
                }
                //console.log("as", ptr, ptr.left, ptr.right);
                ptr = upperNode;
            }
            //console.log(flag, stack.isEmpty());
            if(!flag && !stack.isEmpty()){
                //console.log("a");
                
                ptr = stack.peek();
                //console.log(ptr);
                
                stack.remove();
                if(ptr.color == "black")
                    flag = 1;
            }
            //console.log("as", ptr, ptr.left, ptr.right);

        }
        rootobj.root.color = "black";
        stack.clear();
    }
    
}
// document.getElementById('take').innerHTML= "Tree is not Build";
function remove(key, rootobj){
    if(rootobj.root == null){
        document.getElementById('take').innerHTML= "Tree is not Build";
    }else{
        let stack = new Stack();
        //iterate till end
        let ptr = rootobj.root;
        while(ptr.right){
            stack.add(ptr);
            if(ptr.key > key){
                ptr = ptr.left;
            }else{
                ptr = ptr.right;
            }
        }
        //console.log("as",ptr);
        //check if value already exists
        if(ptr.key != key){
            //key can't be deleted;
            document.getElementById('take').innerHTML= "Key not exist";
            return;
        }else{
            //console.log(ptr);
            let currentNode = stack.peek();
            stack.remove();
            // console.log(currentNode,currentNode.left,currentNode.right);
            //remove element
            if(currentNode == null){
                rootobj.root = null;
                return;
            }else if(currentNode.left == ptr){
                currentNode.left = currentNode.right.left;
                currentNode.right = currentNode.right.right;
                if(currentNode.right == null || currentNode.right.right == null)
                    currentNode.right = null;
            }else{
                console.log("gh",currentNode);
                currentNode.key = currentNode.left.key;
                currentNode.left = currentNode.left.left;
                currentNode.right = currentNode.left.right;
                if(currentNode.left.right == null)
                    currentNode.right = null;
                console.log("gh",currentNode,currentNode.left,currentNode.right);
            }
            console.log("p,",currentNode,currentNode.left,currentNode.right);
                
            let flag = 0;
            let upperNode;
            if(currentNode.left && currentNode.right){
                upperNode = currentNode;
                currentNode = ptr;
                
            }else{
                upperNode = stack.peek();
                console.log("aas",currentNode);
                //console.log("qwer");
            }

            if(currentNode.color == "black")
                return;
            console.log(currentNode,upperNode.left);
            console.log(currentNode.color,upperNode.left.color);
            while(!stack.isEmpty() && !flag){
                //console.log("a");
                stack.remove(); //  remove upperNode
                let upperUpperNode = stack.peek();
                
                //check condition
                if(currentNode.color == "red"){
                    // case - 1, if current is red
                    currentNode.color = "black";
                    //continue;
                    console.log("1l",currentNode);

                }
                if(currentNode == upperNode.left){
                    //case 3
                    let otherNode = upperNode.right;
                    console.log("as12");
                        
                    if(upperNode.color == "black" ){
                        if(otherNode.color == "black" && !otherNode.left || otherNode.left.color == "black"){
                            //case 3.1
                            upperNode = leftRotation(upperNode);
                            upperNode.color = "black";
                            upperNode.left.color = "red";
                            console.log("aa1");
                        }else if(otherNode.color == "black" && otherNode.left.color == "red"){
                            //case 3.2
                            console.log("aa2");
                            otherNode = upperNode.right = rightRotation(otherNode);
                            upperNode = leftRotation(upperNode);
                            upperNode.color = "black";
                            upperNode.left.color = "black";
                            upperNode.right.color = "black";
                            
                        }else if(otherNode.color == "red" && !otherNode.left.left || otherNode.left.left.color == "black"){
                            //case 3.3
                            upperNode = leftRotation(upperNode);
                            upperNode.left = leftRotation(upperNode.left);
                            upperNode.left.left.color = "red";
                            upperNode.color = "black";
                            upperNode.left.color = "black";
                            console.log("aa3");
                        }else if(otherNode.color == "red" && otherNode.left.left.color == "red"){
                            //case 3.4
                            upperNode = leftRotation(upperNode);
                            upperNode.left.right = rightRotation(upperNode.left.right);
                            upperNode.left = leftRotation(upperNode.left);
                            upperNode.left.left.color = "black";
                            upperNode.left.right.color = "black";
                            upperNode.left.color = "red";
                            upperNode.color = "black";
                            console.log("aa4");
                        }
                    }else if(upperNode.color == "red"){
                        if(otherNode.color == "black" && !otherNode.left || otherNode.left.color == "black"){
                            //case 3.5
                            console.log(otherNode.left);
                            upperNode = leftRotation(upperNode);
                            upperNode.left.color = "red";
                            upperNode.color = "black";
                            console.log("aa5");
                        }else if(otherNode.color == "black" && otherNode.left.color == "red"){
                            //case 3.6
                            otherNode = upperNode.right = rightRotation(otherNode);
                            upperNode = leftRotation(upperNode);
                            upperNode.left.color = "black";
                            upperNode.right.color = "black";
                            upperNode.color = "red";
                            console.log("aa6");
                        }
                    }    
                }else if(currentNode == upperNode.right){
                    //case 4
                    console.log("as12");
                
                    let otherNode = upperNode.left;
                    //let upperUpperNode = stack.peek();
                    console.log("as",upperNode,otherNode);
                    if(upperNode.color == "black" ){
                        if(otherNode.color == "black" && !otherNode.right || otherNode.right.color == "black"){
                            //case 4.1
                            upperNode = rightRotation(upperNode);
                            upperNode.color = "black";
                            upperNode.right.color = "red";
                            console.log("1");
                            // sigmaObject();
                            // generateTree(rootobj.root,100,10,0,100);
                            // return;
                        }else if(otherNode.color == "black" && otherNode.right.color == "red"){
                            //case 4.2
                            otherNode = upperNode.left = leftRotation(otherNode);
                            upperNode = rightRotation(upperNode);
                            upperNode.color = "black";
                            upperNode.left.color = "black";
                            upperNode.right.color = "black";
                            console.log("2");
                        }else if(otherNode.color == "red" && !otherNode.right.right ||otherNode.right.right.color == "black"){
                            //case 4.3
                            upperNode = rightRotation(upperNode);
                            upperNode.right = rightRotation(upperNode.right);
                            upperNode.right.right.color = "red";
                            upperNode.color = "black";
                            upperNode.right.color = "black";
                            console.log("3");
                        }else if(otherNode.color == "red" && otherNode.right.right.color == "red"){
                            //case 4.4
                            upperNode = rightRotation(upperNode);
                            upperNode.right.left = leftRotation(upperNode.right.left);
                            upperNode.right = rightRotation(upperNode.right);
                            upperNode.right.right.color = "black";
                            upperNode.right.left.color = "black";
                            upperNode.right.color = "red";
                            upperNode.color = "black";
                            console.log("4");
                        }
                    }else if(upperNode.color == "red"){
                        if(otherNode.color == "black" && !otherNode.right || otherNode.right.color == "black"){
                            //case 4.5
                            
                            console.log(upperNode,upperNode.left);
                            upperNode = rightRotation(upperNode);
                            console.log(upperNode);
                            
                            upperNode.right.color = "red";
                            upperNode.color = "black";
                            console.log("5");
                            //flag = 1;
                            //return;
                        }else if(otherNode.color == "black" && otherNode.right.color == "red"){
                            //case 4.6
                            upperNode.left = otherNode = leftRotation(otherNode);
                            upperNode = rightRotation(upperNode);
                            upperNode.left.color = "black";
                            upperNode.right.color = "black";
                            upperNode.color = "red";
                            console.log("6");
                        }
                        // if(upperUpperNode)
                        //     upperUpperNode.right = upperNode;// again assign edge
                    }
                }
                //console.log("qw",upperNode, upperUpperNode.key);
                if(upperUpperNode != null){
                    if(upperUpperNode.key > upperNode.key)
                        upperUpperNode.left = upperNode;
                    else
                        upperUpperNode.right = upperNode;
                }
                //do for all
                // console.log("assss",upperUpperNode,upperUpperNode.right, upperNode);
                    // sigmaObject();
                    // generateTree(rootobj.root,100,10,0,100);
                    // return;
                
                currentNode = upperNode;
                upperNode = upperUpperNode;
                console.log("p",currentNode);
                
            }
            //console.log(currentNode);
            rootobj.root = currentNode;
        }
        
    }
}

depth = 0;
function find(key, rootobj){
    if(!rootobj.root){
        //empty
        document.getElementById('take').innerHTML= "Tree is empty";
        return;
    }
    else{
        //iterate till end
        let ptr = rootobj.root;
       
        while(ptr.right != null){
            
            if(ptr.key > key){
                ptr = ptr.left;
                depth+=1;
            }else{
                ptr = ptr.right;
                depth+=1;
            }
        }
    
        //check if value already exists
        if(ptr.key == key){
            //return assoicate object
            document.getElementById('take').innerHTML= "Object found ";
            console.log("asd"+ptr.key+" "+depth+"asdasd");
            sigmaObject();
            generateTree(rootobj.root,100,10,0,100);
            changeNodeColorforfind(ptr.key+" "+depth,"#00ff00");
        }else{
           document.getElementById('take').innerHTML= "Key with object not found";
        }
    }
}