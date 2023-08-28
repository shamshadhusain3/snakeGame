// game comstant and variables
let inputDir = {x:0,y:0};
let snake = [];
let board = document.querySelector('#board');
let score = 0;
let uspdd = document.querySelector('#spd').value;
let spdd=6
// let speed = 3;
let lastPaintTime = 0;
let snakearr=[
    {x:13,y:15}
]

let food = {x:5,y:10}

// console.log(spdd)
function show(){
    var x = document.getElementById("spd").value;
    speed = x;
    console.log(x)
}
// game functions
function main(ctime) {
window.requestAnimationFrame(main);
if ((ctime-lastPaintTime)/1000 < 1/spdd || uspdd){
    return;
}
lastPaintTime = ctime;
gameEngine()
// console.log(ctime);

}

// difficult level increment
let seti=setInterval(inc, 7000);

function inc() {
  spdd+=1;
  
  console.log(spdd)
  if (spdd>=17) {
    clearInterval(seti);
    
}
}

// clearInterval
// let uchange=()=>{
//     spdd=uspdd;
// }


function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < snakearr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
        
    }
    // if you bump into the walls
    if(snake[0].x>= 18 || snake[0].x <=0 || snake[0].y>= 18 || snake[0].y <=0){
        return true;
    }

 }

 
function gameEngine(){
    // part1: updating the snake array and food
      
    if(isCollide(snakearr)){
        inputDir = {x:0,y:0};
        alert('game over press any key to play again');
        snakearr=[
            {x:13,y:15}
        ]

        score=0;
        scorebox.innerHTML='Score :'+ score;

    }
    // if you have eaten the food incremente the score and regenerate the food
    if(snakearr[0].y===food.y && snakearr[0].x===food.x ){
        score +=1;
        scorebox.innerHTML='Score :'+ score
        snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y + inputDir.y});
        let a =2;
        let b = 16;
        food= {x: Math.round(a+(b - a)* Math.random()),y: Math.round(a+(b - a)* Math.random())}

    }

    // moving the snake
     for (let i = snakearr.length-2; i >=0 ; i--) {
        
        snakearr[i+1]={...snakearr[i]};
        
     }
     snakearr[0].x += inputDir.x;
     snakearr[0].y += inputDir.y;

    // part2: displaying the snake and food
    // displaying the snake
    board.innerHTML='';
    snakearr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart =e.x;

        if(index === 0){
            snakeElement.classList.add('head');
  }
  else{
    snakeElement.classList.add('snake');
    
     
  }
        board.appendChild(snakeElement);
        


    });
    // displaying the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart =food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);




    // part3: moving the snake
    // snakearr.forEach((e,index)=>{
    //     if(index==0){
    //         snakeElement.style.gridRowStart =snakearr[0].y;
    //         snakeElement.style.gridColumnStart =snakearr[0].x;
    //     }
    //     else{
    //         snakeElement.style.gridRowStart =snakearr[index-1].y;
    //         snakeElement.style.gridColumnStart =snakearr[index-1].x;
    //     }
    // })

    // part4: checking if the snake has eaten the food
}








// main logic starts here 
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:1}//start the game

    switch (e.key) {
        case 'ArrowUp':
            inputDir.y = -1;
            inputDir.x = 0;
            
            break;
            case 'ArrowDown':
                inputDir.x= 0;
                inputDir.y = 1;
                
            
            break;
            case 'ArrowLeft':
                inputDir.x = -1;
                inputDir.y = 0;
                
            
            break;
            case 'ArrowRight':
                inputDir.x = 1;
                inputDir.y = 0;
                
            
            break;
    
        default:
            break;
    }
})