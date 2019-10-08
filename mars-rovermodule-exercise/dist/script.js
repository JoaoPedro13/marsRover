const rover0 = {
  x:0,
  y:0,
  direction:"N",
  travelLog:[{x:0,y:0}],
  name: "Mars Rover 0"
}

const rover1 = {
  x:9,
  y:0,
  direction:"N",
  travelLog:[{x:9,y:0}],
  name: "Mars Rover 1"
}

const rover2 = {
  x:0,
  y:9,
  direction:"S",
  travelLog:[{x:0,y:9}],
  name: "Mars Rover 2"
}

const rover3 = {
  x:9,
  y:9,
  direction:"S",
  travelLog:[{x:9,y:9}],
  name: "Mars Rover 3"
}


const obstacles0 = [{x:0,y:1}, {x:8,y:4}, {x:7,y:9}, {x:5,y:2}, {x:8,y:8}, {x:7,y:4}, {x:0,y:8}];

let map =[
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]]

//console.log(map);

function addObstacles(obs){
  for (let i=0; i<obs.length; i++){
      let x= obs[i].x;
      let y= obs[i].y;
      map[x][y] =1;
  
    }
  }
addObstacles(obstacles0);
map[rover0.x][rover0.y] = 2; 
map[rover1.x][rover1.y] = 2;
map[rover2.x][rover2.y] = 2;
map[rover3.x][rover3.y] = 2;
//  console.log(map);       


function eraseGridTrace(rover){
let prevIndexNumb = rover.travelLog.length-1
 map[rover.travelLog[prevIndexNumb].x][rover.travelLog[prevIndexNumb].y] = 0
}


function turnLeft(rover){
  let face
  switch(rover.direction){
    case "N":
      face = "West";
      rover.direction = "W";
      break;
    case "W":
      face = "South";
      rover.direction = "S";
      break;
    case "S":
      face = "East";
      rover.direction = "E";
      break;
    case "E":
      face = "North";
      rover.direction = "N";
      break;
  }
  console.log(`turnLeft was called, the ${rover.name} is facing ${face}`);
}


function turnRight(rover){
  let face
  switch(rover.direction){
    case "N":
      face = "East";
      rover.direction = "E";
      break;
    case "E":
      face = "South";
      rover.direction = "S";
      break;
    case "S":
      face = "West";
      rover.direction = "W";
      break;
    case "W":
      face = "North";
      rover.direction = "N";
      break;
  }
  console.log(`turnRight was called, ${rover.name} is facing ${face}`);
}


function moveForward(rover){
 map[rover.x][rover.y] = 2;

  let place
  let moved = true;
  switch(rover.direction){
    case "N":
      if(rover.x-1 >= 0 && map[rover.x-1][rover.y] == 0 )
        rover.x--;
      else 
        moved = false;
        break;
    case "E":
      if (rover.y+1<= 9 && map[rover.x][rover.y+1] == 0)
        rover.y++;
      else 
        moved = false;
      break;
    case "S":
      if(rover.x+1 <= 9 && map[rover.x+1][rover.y] == 0)
        rover.x++ ;
      else 
        moved = false;
      break;
    case "W":
    if (rover.y-1>=0 && map[rover.x][rover.y-1] == 0)
      rover.y--;
    else 
      moved = false;
      break;
   }
  
  if(moved){
    eraseGridTrace(rover);
    map[rover.x][rover.y] = 2;
    place = {
    x:rover.x,
    y:rover.y
  }
  rover.travelLog.push(place)
  console.log(`${rover.name}: moveForward was called, coordinates: { ${rover.x},${rover.y} }`);
  }else
    console.log(`${rover.name}: moveForward was called, obstacle found, please rotate rover`);
    
}


function commandPush(rover, orders){
  for (let i=0; i<orders.length; i++){
    let command = orders[i];
      switch(command){
        case "l":
          turnLeft(rover);
          break;
        case "r":
          turnRight(rover);
          break;
        case "f":
          moveForward(rover);
          break;
        case "b":
          moveBackward(rover);
          break;
        default:
          console.log(`${rover.name}: ${orders[i]} is not a valid command.`);   
     
    }
  }
}
function moveBackward(rover){
 map[rover.x][rover.y] = 2;

  let place
  let moved = true;
  switch(rover.direction){
    case "S":
      if(rover.x-1 >= 0 && map[rover.x-1][rover.y] == 0 )
        rover.x--;
      else 
        moved = false;
        break;
    case "W":
      if (rover.y+1<= 9 && map[rover.x][rover.y+1] == 0)
        rover.y++;
      else 
        moved = false;
      break;
    case "N":
      if(rover.x+1 <= 9 && map[rover.x+1][rover.y] == 0)
        rover.x++ ;
      else 
        moved = false;
      break;
    case "E":
    if (rover.y-1>=0 && map[rover.x][rover.y-1] == 0)
      rover.y--;
    else 
      moved = false;
      break;
   }
  
  if(moved){
    eraseGridTrace(rover);
    map[rover.x][rover.y] = 2;
    place = {
    x:rover.x,
    y:rover.y
  }
  rover.travelLog.push(place)
  console.log(`${rover.name}: moveBackward was called, coordinates: { ${rover.x},${rover.y} }`);
  }else
    console.log(`${rover.name}: moveBackward was called, obstacle found, please rotate rover`);
    
}



commandPush(rover0, "rfbflrffjplfbrffffffflllfffffffff");
commandPush(rover1, "rfbflrffjplfbrf");
commandPush(rover2, "rfbflrffjplfbrf");
commandPush(rover3, "rfbbbbbbbbbbbbbbbbflrffjplfbrf");

function showGrid(){
  map.forEach(e=>{console.log(e);});
}
showGrid();
function showGridCompact(){for(let i=0; i<map.length; i++ ){
  for (let j=0; i<map.lenght; i++ )
    console.log(`${map[i][j]}`)
  }
}

function showGridCompact(){
    for(let i=0; i<map.length; i++ ){
     let line = "";
     for ( j=0 ; j<map.length; j++ ){ 
       line = line + map[i][j].toString()+" "

     }
     console.log(line)    
    }
}
showGridCompact();