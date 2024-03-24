const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")
const highElement = document.querySelector(".high-score")
const controls = document.querySelectorAll(".controls i")


gameOver = false
let foodX, foodY
let snakeBody = []
let snakeX=5, snakeY=10
let moveX = 0 , moveY = 0
let setIntervalId
let score = 0
let highScore = localStorage.getItem("high-score") ||0
highElement.innerText = `High Score:${highScore}`

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30 ) + 1 
    foodY = Math.floor(Math.random() * 30 ) + 1 
}

const handlerGameOver = () =>{
    clearInterval(setIntervalId)
    alert("Game Over! Press OK to replay... ")
    location.reload()
}

const changeDirection = (e) => {
  
    if(e.key==="ArrowUp" && moveY != 1){
        moveX = 0
        moveY = -1
    }
    else if(e.key==="ArrowDown" && moveY != -1){
        moveX = 0
        moveY = 1
    }
    else if(e.key==="ArrowLeft" && moveX != 1){
        moveX = -1
        moveY = 0
    }
    else if(e.key==="ArrowRight" && moveX != -1){
        moveX = 1
        moveY = 0
    }
    
}


controls.forEach(key=>{
    key.addEventListener("click",()=>{
        changeDirection({key:key.dataset.key})
    })
})

const initGame = ()=>{
    if(gameOver) return handlerGameOver()
    let htmlMarkup = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>` 
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition()
        snakeBody.push([foodX,foodY])
        score++
        highScore = score>= highScore? score : highScore
        localStorage.setItem("high-score",highScore)
        scoreElement.innerText = `Score:${score}`
        
    }

    for(let i=snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1]
    }


    snakeBody[0] = [snakeX,snakeY]

    snakeX += moveX
    snakeY += moveY

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true
    }

    for (let i = 0; i < snakeBody.length; i++) {
        
    htmlMarkup += `<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>` 
    if( i!==0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
        gameOver = true;
    }     
    }
   


    playBoard.innerHTML = htmlMarkup
}
changeFoodPosition()
setIntervalId = setInterval(initGame,125)

document.addEventListener("keydown",changeDirection)