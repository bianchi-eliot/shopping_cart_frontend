<script setup lang="ts">
import { ref, reactive } from 'vue'
const name = ref('')
const number = ref('')
const expiration = ref('')
const CVC = ref('')

type Message = {
  message: string
  show: boolean
}
const wrongName: Message = reactive({ message: '', show: false })
const wrongNumber: Message = reactive({ message: '', show: false })
const wrongExpiration: Message = reactive({ message: '', show: false })
const wrongCVC: Message = reactive({ message: '', show: false })

function checkNumberInput() {
  let string = number.value
  string = string.replace(/\D/g, '')
  string = string.replace(/(\d{4})/g, '$1 ')
  string = string.trim()
  number.value = string
}

function checkExpirationInput() {
  let string = expiration.value
  string = string.replace(/\D/g, '')
  string = string.replace(/(\d{2})/, '$1 / ')
  expiration.value = string
}

function checkCVCInput() {
  const regex = new RegExp(/\D/, 'g')
  if (regex.test(CVC.value) === false) return
  CVC.value = CVC.value.replace(regex, '')
}

function verifyName(cardName: string) {
  if (cardName.length === 0) {
    wrongName.message = 'Can not be blank'
    wrongName.show = true
  } else {
    wrongName.message = ''
    wrongName.show = false   
  }
}

function verifyNumber(cardNumber: string) {
  cardNumber = cardNumber.replace(/\D/g, '')
  if (cardNumber.length === 0) {
    wrongNumber.message = 'Can not be blank'
    wrongNumber.show = true
  } else if (cardNumber.length !== 16) {
    wrongNumber.message = 'Must be a 16 digit number'
    wrongNumber.show = true
  } else {
    wrongNumber.message = ''
    wrongNumber.show = false   
  }
}

function verifyExpiration(expiration: string) {
  const [start, end] = expiration.split(' / ')
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear().toString()

  if (/\d{2}\s\/\s\d{2}/.test(expiration) === false) {
    wrongExpiration.message = 'Incomple date'
    wrongExpiration.show = true
  } else if (parseInt(start) < 1 || parseInt(start) > 12) {
    wrongExpiration.message = 'Error with month'
    wrongExpiration.show = true
  } else if (parseInt(end) < parseInt( year.substring(2, 4) )) {
    wrongExpiration.message = 'Wrong date'
    wrongExpiration.show = true
  } else if (parseInt(start) < month) {
    wrongExpiration.message = 'Wrong date'
    wrongExpiration.show = true
  } else {
    wrongExpiration.message = ''
    wrongExpiration.show = false
  }
}

function verifyCVC(cardCVC: string) {
  if (cardCVC.length === 0) {
    wrongCVC.message = 'Can not be blank'
    wrongCVC.show = true
  } else if (cardCVC.length !== 3) {
    wrongCVC.message = 'Must be a 3 digit number'
    wrongCVC.show = true
  } else {
    wrongCVC.message = ''
    wrongCVC.show = false   
  }
}

function buy() {
  verifyName(name.value)
  verifyNumber(number.value)
  verifyExpiration(expiration.value)
  verifyCVC(CVC.value)

  if (wrongName.show || wrongNumber.show || wrongExpiration.show || wrongCVC.show) {
    alert('NOT OK')
  } else {
    alert('OK')
  }
}
</script>

<template>
  <section class="payment">
    <p>You're not logged in</p>

    <form class="card" @submit.prevent="buy">
      <div class="card-data">
        <label for="card-name">
          <span>Name on Card</span>
          <span class="exclamation-point" :class="{ show: wrongName.show }" 
            :data-message="wrongName.message">!</span>
        </label>
        <input class="inpt" type="text" id="card-name" placeholder="Jane Doe"
          @blur="verifyName(name)" v-model="name">
      </div>

      <div class="card-data">
        <label for="card-number">
          <span>Card Number</span>
          <span class="exclamation-point" :class="{ show: wrongNumber.show }" 
            :data-message="wrongNumber.message">!</span>
        </label>
        <input class="inpt" type="text" id="card-number" placeholder="1111 1111 1111 1111" maxlength="19" 
         @input="checkNumberInput" @blur="verifyNumber(number)" v-model="number">
      </div>

      <div class="card-expiration-cvc">
        <div class="card-data">
          <label for="card-expiration">
            <span>Expiration Date</span>
            <span class="exclamation-point" :class="{ show: wrongExpiration.show }" 
            :data-message="wrongExpiration.message">!</span>
          </label>
          <input class="inpt" type="text" id="card-expiration" placeholder="MM / YY" maxlength="7" 
            @input="checkExpirationInput" @blur="verifyExpiration(expiration)" v-model="expiration">
        </div>

        <div class="card-data">
          <label for="card-cvc">
            <span>CVC Code</span>
            <span class="exclamation-point" :class="{ show: wrongCVC.show }" 
            :data-message="wrongCVC.message">!</span>
          </label>
          <input class="inpt" type="text" id="card-cvc" placeholder="CVC" maxlength="3"
           @input="checkCVCInput" @blur="verifyCVC(CVC)" v-model="CVC">
        </div>
      </div>

      <input type="submit" class="btn large success" value="Buy">
    </form>
  </section>
</template>

<style>
.payment {
  flex-grow: 1;
  background-color: var(--light);
  padding: 50px 20px 0 20px;
  margin-top: -40px;
  min-width: 375px;
  height: calc(100vh - var(--navbar-height));
}
.card {
  display: flex;
    flex-direction: column;
    gap: 25px;
  border-radius: 3px;
  background-color: var(--light);
  box-shadow: 2px 2px 3px 1px var(--secondary);
  padding: 20px 10px;
}

.card-data {
  display: flex;
    flex-direction: column;
    gap: 7px;
}

.card-data > label {
  display: flex;
    align-items: center;
    gap: 10px;
  font-size: 20px;
  width: 250px;
  height: 30px;
}

.exclamation-point {
  position: relative;
  display: none;
    justify-content: center;
    align-items: center;
  background-color: var(--danger);
  border-radius: 100px;
  width: 25px;
  aspect-ratio: 1 / 1;
}
.exclamation-point.show { display: flex; }
.exclamation-point:hover::before {
  position: absolute;
    top: -60px;
  content: attr(data-message);
  background-color: var(--dark);
  border-radius: 3px;
  box-shadow: 2px 2px 3px 1px var(--secondary);
  color: var(--light);
  font-size: 18px;
  padding: 10px;
  width: max-content;
}
.exclamation-point:hover::after {
  position: absolute;
    top: -25px;
  content: "";
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 20px solid var(--dark);
}

.card-expiration-cvc {
  display: flex;
    gap: 20px;
}
.card-expiration-cvc > .card-data {
  flex-grow: 1;
}


@media all and (max-width: 590px) {
  .card-expiration-cvc {
    flex-direction: column;
  }
}
@media all and (min-width: 850px) and (max-width: 1300px) {
  .card-expiration-cvc {
    flex-direction: column;
  }
}
</style>