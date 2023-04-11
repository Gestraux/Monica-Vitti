window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')

  const backgroundImage = new Image()
  backgroundImage.src = './images/background.png'

  const playerImage = new Image()
  playerImage.src = './images/tanya_pig.png'

  const obstacleImage = new Image()
  obstacleImage.src = './images/rock.png'
  
  const playerWidth = 0;
  const playerHeight = 0;

  let isMovingUp = false;
  let isMovingLeft = false;
  let isMovingDown = false;
  let isMovingRight = false;
  let playerY = 0

  let gameOver = false
  let animateId

  let obstacles = []

  class Obstacle {
    constructor() {
      this.xPos = -50
      this.yPos = 0
      this.width = 50
      this.height = 0
    }

    move() {
      this.yPos += 1
    }

    draw() {
      ctx.beginPath()
      ctx.drawImage(obstacleImage ,this.xPos, this.yPos, this.width, this.height)
      ctx.closePath()
    }

    checkCollision = () => {
      if (
        playerX < this.xPos + this.width &&
        playerX + playerWidth > this.xPos &&
        playerY < this.yPos + this.height &&
        playerHeight + playerY > this.yPos
      ) {
        gameOver = true;
        console.log('Game Over!')
      }
    }
  }

  const drawPlayer = () => {
    ctx.beginPath()
    ctx.drawImage(playerImage, playerX, playerY, playerWidth, playerHeight)
    ctx.fill()
    ctx.closePath()
  }

  const drawObstacle = () => {
    ctx.beginPath()
    ctx.drawImage(obstacleImage, obstacleX, obstacleY, obstacleWidth, obstacleHeigth )
    ctx.fill()
    ctx.closePath()
  }

  const checkCollision = () => {
    if (
      playerX < obstacles.xPos + obstacles.width &&
      playerX + playerWidth > obstacles.xPos &&
      playerY < obstacles.yPos + obstacles.height &&
      playerHeight + playerY > obstacles.yPos
    ) {
      gameOver = true;
      console.log('Game Over!')
    }
  }

  const animate = () => {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)
    
    drawPlayer()
    drawObstacle()

    const obstaclesStillInScreen = []

    obstacles.forEach(obstacle => {
      obstacle.draw()
      obstacle.checkCollision()
      obstacle.move()
      if (obstacle.xPos < canvas.width) {
        obstaclesStillInScreen.push(obstacle)
      }
    })
    obstacles = obstaclesStillInScreen

    if (animateId % 250 === 0) {
      obstacles.push(new Obstacle)
    }

    checkCollision()
    if (isMovingUp) {
      playerY += 1
    } if (isMovingLeft) {
      playerX -= 1
    } if (isMovingDown) {
      playerY -= 1
    } if (isMovingRight) {
      playerX += 1
    }

    if (gameOver) {
      cancelAnimationFrame(animateId)
    } else {
      requestAnimationFrame(animate)
    }
  }

  const startGame = () => {
    document.querySelector('.game-intro').style.display = 'none'
    document.querySelector('.game-board').style.display = 'block'

    animate()
  }

  document.getElementById('start-button').addEventListener('click', () => {
    startGame()
  })

  document.addEventListener('keydown', event => {
    console.log(event)
    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
      isMovingUp = true
    }
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
      isMovingLeft = true
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        isMovingDown = true
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        isMovingRight = true
    }
    console.log({ isMovingUp, isMovingLeft, isMovingDown, isMovingRight })
  })

  document.addEventListener('keyup', event => {
    console.log(event)
    if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') {
      isMovingUp = false
    }
    if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') {
      isMovingLeft = false
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') {
        isMovingDown = false
    }
    if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') {
        isMovingRight = false
    }
    console.log({ isMovingUp, isMovingLeft, isMovingDown, isMovingRight })
  })
})