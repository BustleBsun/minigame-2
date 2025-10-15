const gameContainer = document.getElementById("game-container")
const caughtDisplay = document.getElementById("caught")
const resultScreen = document.getElementById("result-screen")
const resultContent = document.getElementById("result-content")

let caughtFlowers = 0
const totalFlowers = 10
let gameActive = true
let flowers = []

const flowerEmojis = ["🌸", "🌺", "🌻", "🌷", "🌹", "💐"]

function createFlower() {
  if (!gameActive) return

  const flower = document.createElement("div")
  flower.className = "flower"
  flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)]
  flower.style.left = Math.random() * (window.innerWidth - 50) + "px"
  flower.style.top = "-50px"

  const speed = 2 + Math.random() * 3
  const id = Date.now() + Math.random()

  flower.addEventListener("click", () => catchFlower(flower, id))

  gameContainer.appendChild(flower)

  flowers.push({ element: flower, id: id, speed: speed })
}

function catchFlower(flowerElement, flowerId) {
  if (!gameActive) return

  flowerElement.remove()
  flowers = flowers.filter((f) => f.id !== flowerId)

  caughtFlowers++
  caughtDisplay.textContent = caughtFlowers

  if (caughtFlowers >= totalFlowers) {
    winGame()
  }
}

function updateFlowers() {
  if (!gameActive) return

  flowers.forEach((flower, index) => {
    const currentTop = Number.parseFloat(flower.element.style.top)
    const newTop = currentTop + flower.speed

    if (newTop > window.innerHeight) {
      loseGame()
      return
    }

    flower.element.style.top = newTop + "px"
  })

  requestAnimationFrame(updateFlowers)
}

function createFireworks() {
  const colors = ["#ff1493", "#ff69b4", "#ffc0cb", "#ff6b9d", "#c71585"]

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight * 0.5

      for (let j = 0; j < 30; j++) {
        const firework = document.createElement("div")
        firework.className = "firework"
        firework.style.left = x + "px"
        firework.style.top = y + "px"
        firework.style.background = colors[Math.floor(Math.random() * colors.length)]

        const angle = (Math.PI * 2 * j) / 20
        const velocity = 100 + Math.random() * 90
        const tx = Math.cos(angle) * velocity
        const ty = Math.sin(angle) * velocity

        firework.style.setProperty("--tx", tx + "px")
        firework.style.setProperty("--ty", ty + "px")
        firework.style.animation = "firework-explosion 1s ease-out forwards"

        gameContainer.appendChild(firework)

        setTimeout(() => firework.remove(), 1000)
      }
    }, i * 300)
  }
}

function winGame() {
  gameActive = false
  flowers.forEach((f) => f.element.remove())
  flowers = []

  createFireworks()

  setTimeout(() => {
    resultContent.className = "win-screen"
    resultContent.innerHTML = `
            <h2>🎉 Chúc Mừng! 🎉</h2>
            <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=300&fit=crop" 
                 alt="Cute flowers" class="cute-image">
            <p class="win-message">
                Chúc mừng ngày Phụ nữ Việt Nam 20/10! 🌸<br><br>
                Chúc bạn luôn xinh đẹp, rạng rỡ và hạnh phúc!<br>
                Mãi mãi là đóa hoa đẹp nhất trong lòng mọi người! 💖<br><br>
                Kiểm tra thì bài thi luôn ghi điểm 10
                Nụ cười rực rỡ hơn ánh nắng ban mai của mặt trời
                Chúc bạn một ngày thật vui vẻ và ý nghĩa! 🎁
            </p>
            <button id="restart-btn" onclick="restartGame()">Chơi Lại</button>
        `
    resultScreen.style.display = "flex"
  }, 1500)
}

function loseGame() {
  gameActive = false
  flowers.forEach((f) => f.element.remove())
  flowers = []

  resultContent.className = "lose-screen"
  resultContent.innerHTML = `
        <h2>😢 Rất Tiếc!</h2>
        <p>
            Bạn đã để bông hoa rơi mất rồi!<br><br>
            Hãy thử lại và cẩn thận hơn nhé! 🌸<br><br>
            Đừng để bất kỳ bông hoa nào rơi xuống đất!
        </p>
        <button id="restart-btn" onclick="restartGame()">Thử Lại</button>
    `
  resultScreen.style.display = "flex"
}

function restartGame() {
  caughtFlowers = 0
  caughtDisplay.textContent = "0"
  gameActive = true
  flowers = []
  resultScreen.style.display = "none"
  startGame()
}

function startGame() {
  updateFlowers()

  setInterval(() => {
    if (gameActive && caughtFlowers < totalFlowers) {
      createFlower()
    }
  }, 1500)
}

startGame()
