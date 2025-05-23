import {
    incrementCustomProperty,
    setCustomProperty,
    getCustomProperty,
  } from "./update.js"
  
  const dinoElem = document.querySelector("[data-dino]")
  const JUMP_SPEED = 0.45
  const GRAVITY = 0.0015
  const DINO_FRAME_COUNT = 2
  const FRAME_TIME = 100
  let gameSound = new Audio("audio/press_sound.mp3");
  gameSound.volume=0.5;
  let Collisionsound = new Audio("audio/hit_sound.mp3");
  Collisionsound.volume = 0.5;
  
  let isJumping
  let dinoFrame
  let currentFrameTime
  let yVelocity
  export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
  }
  
  export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
  }
  
  export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
  }
  
  export function setDinoLose() {
    dinoElem.src = "images/dino-lose.png"
    Collisionsound.play();
    
  }
  
  function handleRun(delta, speedScale) {
    if (isJumping) {
      dinoElem.src = `images/dino-stationary.png`
      return
    }
  
    if (currentFrameTime >= FRAME_TIME) {
      dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
      dinoElem.src = `images/dino-run-${dinoFrame}.png`
      currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
  }
  
  function handleJump(delta) {
    if (!isJumping) return
  
    incrementCustomProperty(dinoElem, "--bottom", yVelocity * delta)
  
    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
      setCustomProperty(dinoElem, "--bottom", 0)
      isJumping = false
    }
  
    yVelocity -= GRAVITY * delta
  }
  
  function onJump(e) {
    if (e.code !== "Space" || isJumping) return
  
    yVelocity = JUMP_SPEED
    isJumping = true
    gameSound.play()
  }