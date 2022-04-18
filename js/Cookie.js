class Cookie{
  constructor(src, width, height, canvasWidth, canvasHeight, scale, scaleSpeed){
    this.src = src
    this.width = width
    this.height = height
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.scale = scale
    this.cscale = 1
    this.scaleSpeed = scaleSpeed
  }
  
  draw(ctx, click){
    let img = new Image()
    img.src = this.src

      if(click && this.scale < this.cscale){
        this.cscale -= this.scaleSpeed
      }else if(!click && 1 >= this.cscale){
        this.cscale += this.scaleSpeed >= 1 ? 1 : this.scaleSpeed 
      }
      ctx.translate(0,0)
      ctx.drawImage(img,(this.canvasWidth/2-(this.width*this.cscale)/2), (this.canvasHeight/2-(this.height*this.cscale)/2), this.width*this.cscale, this.height*this.cscale);
  }
}

class Plusnumb{
  constructor(value,font,fontSize,weight,x,y, speed, range){
    this.value = value
    this.font = font
    this.fontSize = fontSize
    this.weight = weight
    this.speed = speed
    this.range = range
    this.x = x
    this.y = y
    this.fixedY = y
  }

  draw(ctx){
    ctx.font =  `${this.weight} ${this.fontSize}px ${this.font}`;
    ctx.fillStyle = "white";
    ctx.fillText(`+${this.value}`, this.x-(this.fontSize/2), this.y+(this.fontSize/3));
  }

  state(){
    if(
      this.fixedY-(this.fontSize/3)-this.range < this.y+(this.fontSize/3)
    ){
      this.y -= this.speed
      return true
    }
    return false
  }
}


class CookieFall{
  constructor(weight,height, src, cookieFallSize, cookieFallSizeRange, cookieFallSpeed){
    this.src = src
    this.cookieSize = Math.random() *(cookieFallSize+cookieFallSizeRange)+cookieFallSize
    this.x = Math.round(Math.random()*(weight-this.cookieSize))
    this.y =  -this.cookieSize 
    this.height = height
    this.speed = cookieFallSpeed
  }

  draw(ctx){
    this.y += this.speed
    let img = new Image()
    img.src = this.src
    ctx.drawImage(img,this.x,this.y, this.cookieSize, this.cookieSize);
  }

  state(){
    if(this.height > this.y) {return true}
    return false
  }
}

class Radiant{
  constructor(src,canvasWidth,canvasHeight, size, canvasHeightPlus,rotateSpeed){
    this.src = src
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.cscale = 1
    this.size = size
    this.canvasHeightPlus = canvasHeightPlus
    this.rotate = 1
    this.rotateSpeed = rotateSpeed
  }
  
  draw(ctx){
    let img = new Image()
    img.src = this.src
    ctx.save()
    ctx.globalAlpha = 0.45
    ctx.translate(this.canvasWidth/2,(this.canvasHeight+this.canvasHeightPlus)/2)
    this.rotate -= this.rotateSpeed*100
    ctx.rotate(this.rotate)
    ctx.drawImage(img,-this.size/2,-this.size/2, this.size,this.size);
    ctx.restore()
  }
}

/* ctx.translate(0,0) */

export {
  Cookie,
  Plusnumb,
  CookieFall,
  Radiant
}
