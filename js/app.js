import Score from './Score.js'
import {Cookie, Plusnumb, CookieFall, Radiant} from './Cookie.js'


const scoreDiv = document.querySelector('section.game .score h1')
const cookiesPSP = document.querySelector('section.game .score h1')

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


/* settings */
canvas.width = 400
canvas.height = 650
const canvasHeightPlus = 150

const cookieSizeNumb = 250
const cookieSize = {width: cookieSizeNumb, height: cookieSizeNumb}
const cookieSrc = './img/cookie.png'
const cookieScale = 0.95
const scaleSpeed = 0.05

const scorePoints = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0
const scoreValue = 2

const plusnumb = []
const plusnumbFontSize = 20
const plusnumbFont = 'Poppins'
const plusnumbWeight = 500
const plusnumbSpeed = 2
const plusnumbUpRange = 85

const cookieFall = []
const cookieFallSize = 10
const cookieFallSizeRange = 10
const cookieFallSpeed = 2

const radiantSrc = './img/radiant.png'
const radiantSize = 650
const rotateSpeed = 0.5

const radiant = new Radiant(radiantSrc,canvas.width,canvas.height, radiantSize, canvasHeightPlus,rotateSpeed)
const score = new Score(scorePoints, scoreValue, scoreDiv)
const cooke = new Cookie(cookieSrc,cookieSize.width, cookieSize.height, canvas.width, (canvas.height+canvasHeightPlus),cookieScale,scaleSpeed)

const mouse = {click: false};


/* click listtener */
canvas.addEventListener('mousedown', e => {
  let rect = canvas.getBoundingClientRect()
  let x = e.clientX-rect.left, y = e.clientY-rect.top
  let cx = (canvas.width/2-cookieSize.width/2), cy =  ((canvas.height+canvasHeightPlus)/2-cookieSize.height/2)
  if(
    x >= cx && x <= cx+cookieSize.width &&
    y >= cy && y <= cy+cookieSize.height
  ) mouse.click = true;
})

canvas.addEventListener('mouseup', e => {
  let rect = canvas.getBoundingClientRect()
  let x = e.clientX-rect.left, y = e.clientY-rect.top
  let cx = (canvas.width/2-cookieSize.width/2), cy =  ((canvas.height+canvasHeightPlus)/2-cookieSize.height/2)
  mouse.click = false
  score.addScore()
  if(
    x >= cx && x <= cx+cookieSize.width &&
    y >= cy && y <= cy+cookieSize.height
    ){
    cookieFall.push(new CookieFall(canvas.width,canvas.height, cookieSrc,cookieFallSize, cookieFallSizeRange, cookieFallSpeed))
    plusnumb.push(new Plusnumb(scoreValue,plusnumbFont, plusnumbFontSize,plusnumbWeight, x,  y, plusnumbSpeed, plusnumbUpRange))
  }
})

/* engine */
const FRAMES_PER_SECOND = 60;
const FRAME_MIN_TIME = (1000/60) * (60 / FRAMES_PER_SECOND) - (1000/60) * 0.5;
let lastFrameTime = 0;

function loop(time){
  if(time-lastFrameTime < FRAME_MIN_TIME){
    requestAnimationFrame(loop);
    return; 
  }
  lastFrameTime = time;

  ctx.clearRect(0,0,canvas.width,(canvas.height+canvasHeightPlus))
  
  radiant.draw(ctx)
  ctx.translate(0,0)
  cookieFall.forEach(n => {
    if(n.state()){
      n.draw(ctx)
    }else{
      cookieFall.shift()
    }
  })
  
  cooke.draw(ctx, mouse.click, canvas.width, (canvas.height+canvasHeightPlus))
  
  plusnumb.forEach(n => {
    if(n.state()){
      n.draw(ctx)
    }else{
      plusnumb.shift()
    }
  })
  
  requestAnimationFrame(loop)
}

loop()