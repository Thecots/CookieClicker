export default class Score{
  constructor(score, value, element){
    this.score = score
    this.value = value
    this.element = element

    this.update()
  }
  addScore(){
    this.score += this.value
    localStorage.setItem('score',this.score)
    this.update()
  }
  removeSore(e){
    this.score -= e
    this.update()
  }

  update(){
    this.element.innerText = `${this.score} Cookies`
  }
}
