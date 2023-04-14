window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')

  const backgroundImage = new Image()
  backgroundImage.src = './images/background.png'

  const playerImage = new Image()
  playerImage.src = './images/tanya_pig.png'

  const obstacleImage = new Image()
  obstacleImage.src = './images/rock.png'

  const gameDiv = document.querySelector('.game-board')
  gameDiv.style.display = 'none'

  const intro = document.querySelector('.game-intro')

  const endGame = document.querySelector('.game-over')
  endGame.style.display = 'none'
  
  const playerWidth = 215
  const playerHeight = 200
  let playerX = 0
  let playerY = 525
  
  const obstacleWidth = 40
  const obstacleHeight = 30
  let obstacleX = 1055
  let obstacleY = 675
  
  const minX = 0
  const maxX = canvas.width - playerWidth
  const minY = 375
  const maxY = 625

  let isMovingUp = false;
  let isMovingLeft = false;
  let isMovingDown = false;
  let isMovingRight = false;
  
  let gameOver = false
  let animateId = 0

  let obstacles = []

  class Obstacle {
    constructor(x, y) {
      this.xPos = x
      this.yPos = y
      this.width = 40
      this.height = 30
      this.image = obstacleImage
    }

    draw() {
      ctx.drawImage(this.image ,this.xPos, this.yPos, this.width, this.height)
    }

    move() {
      this.draw()
      this.xPos -= 1
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
    ctx.drawImage(obstacleImage, obstacleX, obstacleY, obstacleWidth, obstacleHeight)
    ctx.fill()
    ctx.closePath()
  }

  const animate = () => {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

    if (animateId % 250 === 0) {
      obstacles.push(new Obstacle (canvas.width,(Math.random() * (810 - 625 + 1) + 625)))
      console.log(obstacles)
    }

    obstacles.forEach(obstacle => {
      obstacle.move()
   })

    obstacles.forEach(obstacle => {
      if (
        playerX < obstacle.xPos + obstacle.width &&
        playerX + playerWidth > obstacle.xPos &&
        (playerY + (playerHeight / 4 * 3)) < obstacle.yPos + obstacle.height &&
        playerHeight + playerY > obstacle.yPos
      ) {
        gameOver = true
      }
    })

    drawPlayer()

    if (isMovingUp) {
      playerY -= 2
    } if (isMovingLeft) {
      playerX -= 2
    } if (isMovingDown) {
      playerY += 2
    } if (isMovingRight) {
      playerX += 2
    }
    
    if (playerX > maxX) {
    isMovingRight = false
    } if (playerX < minX) {
    isMovingLeft = false
    } if (playerY < minY) {
    playerY = minY
    } if (playerY > maxY) {
    playerY = maxY
    }

    if (gameOver) {
      cancelAnimationFrame(animateId)
      intro.style.display = 'none'
      gameDiv.style.display = 'none'
      endGame.style.display = 'block'
    } else {
      animateId = requestAnimationFrame(animate)
    }
  }

  const startGame = () => {
    intro.style.display = 'none'
    gameDiv.style.display = 'block'
    endGame.style.display = 'none'
      animate()
  }

  document.getElementById('start-button').addEventListener('click', () => {
     intro.style.display = 'none'
     endGame.style.display = 'none'
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