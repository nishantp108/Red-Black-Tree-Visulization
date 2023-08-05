const container = document.getElementById("graph-container");
const green  = "#00ff00";
let s;

function sigmaObject() 
{
  container.innerHTML = "";
  s = new sigma({
      renderer: {
          container: container,
          type: "canvas"
      },
      settings: {
          minNodeSize: 10,
          maxNodeSize: 10,
          minEdgeSize: 2,
          maxEdgeSize: 2,
          edgeColor: "#000000",
          defaultNodeColor: "#000000",
          labelThreshold: 0,
          // rendererEdgeLabels: true
      }
  });

  s.cameras[0].goTo({ x: 0, y: 0, angle: 0, ratio: 1.2 });
  s.refresh();
}


sigmaObject();

function insertnode(data, pos_x, pos_y) {
  console.log("insert",data);
  s.graph.addNode({
      id: data,
      label: data ,
      x: pos_x,
      y: pos_y,
      size: 10
  });

  s.refresh();
}

function addEdge(from, to) {
  s.graph.addEdge({
      id: `${from}-${to}`,
      source: from,
      target: to
  });

  s.refresh();
}

function generateTree(root,x_cord,y_cord,depth,f) {
  if(root==null) return;
  console.log(root.key);
  
  if(root.left==null) 
  {
    insertnode(root+" "+depth, x_cord, y_cord);
    changeNodeColor(root+" "+depth, root.color);
  
  }  

  else  {
    insertnode(root.key+" "+depth, x_cord, y_cord);  

    changeNodeColor(root.key+" "+depth, root.color);
    
  } 
  if(root.left!=null) {
      generateTree(root.left, x_cord - (f/2), y_cord + 10,depth+1,f/2);
      console.log(".", root.key, root.left.key);
      if(root.left.left==null)   addEdge(root.key.toString()+" "+depth, root.left.toString()+" "+(depth+1), depth+1);

      else addEdge(root.key.toString()+" "+depth, root.left.key.toString()+" "+(depth+1), depth+1);
  }

  if(root.right!=null) {
      generateTree(root.right, x_cord + (f/2), y_cord + 10,depth+1,f/2);
      console.log(".", root.key, root.left.key);
      if(root.right.left==null)  addEdge(root.key.toString()+" "+depth, root.right.toString()+" "+(depth+1), depth+1);  

      else addEdge(root.key.toString()+" "+depth, root.right.key.toString()+" "+(depth+1), depth+1);
  }
}
// changeNodeColorforfind(root+" "+depth,"green");
function changeNodeColor(rootobj, newcolor) {
  s.graph.nodes(rootobj).color = newcolor;
  s.refresh();
}
function changeNodeColorforfind(rootobj,newcolor)
{
  s.graph.nodes(rootobj).color = newcolor;
  s.refresh();
}
