import { Quiz } from './quiz.js'

export class Setting {
   constructor() {
      this.category = document.querySelector("#category")
      this.difficulty = document.getElementsByName("difficulty")
      this.amount = document.querySelector("#numberOfQuestions")
      this.startBtn = document.querySelector("#startBtn")
      this.startBtn.addEventListener("click", ()=>{
         this.getUserData()
      })
   }

   async getUserData() {
      let category = this.category.value
      let noOfQuestions = this.amount.value
      let difficulty = Array.from(this.difficulty).find((item) => item.checked).value
      if (noOfQuestions > 0 && noOfQuestions <= 50) {
         let questions = await this.getQuestions(noOfQuestions, category, difficulty)
         let quiz = new Quiz(questions)
         document.querySelector("#alert1").classList.remove("d-block")
         document.querySelector("#setting").classList.remove("show")
         document.querySelector("#quiz").classList.add("show")
      } else {
         document.querySelector("#alert1").classList.add("d-block")
      }
   }

   async getQuestions(noOfQuestions, category, difficulty) {
      const apiUrl = await fetch(`https://opentdb.com/api.php?amount=${noOfQuestions}&category=${category}&difficulty=${difficulty}`)
      const { results } = await apiUrl.json()
      return results
   }
}
