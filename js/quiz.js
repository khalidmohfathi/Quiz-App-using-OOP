export class Quiz {
   constructor(userQuestions) {
      this.questions = userQuestions
      this.questionsNumber = userQuestions.length
      this.currentQuestionIndex = 0
      this.score = 0
      this.nextQuestion = document.querySelector("#next")
      this.tryAgain = document.querySelector("#tryBtn")
      this.nextQuestion.addEventListener("click", () => {
         this.getNextQuestion()
      })
      this.tryAgain.addEventListener("click", () => {
         this.startAgain()
      })
      this.showQuestion()
   }

   showQuestion() {
      document.querySelector("#currentQuestion").innerHTML = this.currentQuestionIndex + 1
      document.querySelector("#totalNumberOfQuestions").innerHTML = this.questionsNumber
      const currentQuestion = this.questions[this.currentQuestionIndex]
      document.querySelector("#question").innerHTML = currentQuestion.question
      this.correctAnswer = currentQuestion.correct_answer
      this.incorrectAnswers = currentQuestion.incorrect_answers
      this.allAnswers = [...this.incorrectAnswers]
      const randomNumber = Math.floor(Math.random() * this.allAnswers.length)
      this.allAnswers.splice(randomNumber, 0, this.correctAnswer)
      console.log(currentQuestion);
      let cartona = ''
      this.allAnswers.forEach((answer) => {
         cartona +=
            `
            <li class="my-3 animate__animated">
               <div class="d-flex align-items-center">
                  <input type="radio" name="answer" value="${answer}" />
                  <div class="state p-success-o">
                     <label class="m-0 p-2">${answer}</label>
                  </div>
               </div>
            </li>
         `
      })

      document.querySelector("#rowAnswer").innerHTML = cartona
   }

   getNextQuestion() {
      this.selectedAnswer = document.querySelector('[name="answer"]:checked')?.value
      if (this.selectedAnswer) {
         document.querySelector("#alert").classList.remove("d-block")
         if (this.selectedAnswer === this.correctAnswer) {
            this.score++;
         }
         this.currentQuestionIndex++
         if (this.currentQuestionIndex >= this.questionsNumber) {
            document.querySelector("#quiz").classList.remove("show")
            document.querySelector("#finish").classList.add("show")
            document.getElementById("score").innerHTML = this.score
         } else {
            this.showQuestion()
         }
      } else {
         document.querySelector("#alert").classList.add("d-block")
      }
   }

   startAgain() {
      window.location.reload()
   }
}