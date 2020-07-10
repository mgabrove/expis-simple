import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'

import firebase from 'firebase'
import db from '@/firebase/firebaseInit'

window.axios = require('axios')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    user: null,
    username: null,
    feedback: null,

    name: null,
    surname: null,
    oib: null,
    course: null,
    courseForm: null,
    dateOfBirth: null,
    postalTown: null,
    postalNumber: null,
    streetAddress: null,
    telephone: null,
    citizenship: null,
    placement: null,
    upisniBroj: null,
    courses: null,
    canDownloadBill: null,
    canDownloadAAI: null,
    billKey: null,
    contractKey: null,
    AAIkey: null,
    prototip: null,
    acceptedEnrollment: null,
    render: false
  },
  mutations: {
  },
  actions: {
    retrieveInfo(){
      this.user = firebase.auth().currentUser
      db.collection("users").where("uID","==",this.user.uid)
      .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
              this.state.name = doc.data().name
              this.state.surname = doc.data().surname
              this.state.oib = doc.data().oib
              this.state.course = doc.data().course
              this.state.courseForm = doc.data().courseForm
              this.state.dateOfBirth = doc.data().dateOfBirth
              this.state.postalTown = doc.data().postalTown
              this.state.postalNumber = doc.data().postalCode
              this.state.streetAddress = doc.data().streetAddress
              this.state.telephone = doc.data().telephone
              this.state.citizenship = doc.data().citizenship
              this.state.placement = doc.data().placement
              this.state.upisniBroj = doc.data().upisniBroj
              this.state.courses = doc.data().modulePreferences
              this.state.canDownloadBill = doc.data().canDownloadBill
              this.state.canDownloadAAI = doc.data().canDownloadAAI
              this.state.billKey = doc.data().billKey
              this.state.AAIkey = doc.data().AAIkey
              this.state.acceptedEnrollment = doc.data().acceptedEnrollment
              this.state.render = true
          })
      })
    },
    acceptEnrollment(){
      this.user = firebase.auth().currentUser
      db.collection("users").where("uID","==",this.user.uid)
      .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
              db.collection("users").doc(doc.id).update({ 
                  acceptedEnrollment: true,
                  canDownloadBill: true,
                  modulePreferences: this.state.courses
              })
          })
      })
    },
    downloadAIIDummy(){
      this.user = firebase.auth().currentUser
      db.collection("users").where("uID","==",this.user.uid)
      .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
              db.collection("users").doc(doc.id).update({ 
                  canDownloadAAI: true
              })
          })
      })
    },
    refreshScenarioDummy(){
      this.user = firebase.auth().currentUser
      db.collection("users").where("uID","==",this.user.uid)
      .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
              db.collection("users").doc(doc.id).update({ 
                acceptedEnrollment: false,
                canDownloadBill: false,
                canDownloadAAI: false
              })
          })
      })
    },

    /*login(credentials){
      axios.post('https://ira.unipu.hr/info/login', {
        username: credentials.username,
        password: credentials.password
      })
      .then(response => {
        const token = response.data.token
        localStorage.setItem('access_token', token)
      })
      .catch(error => {
        this.$store.state.feedback = error.message
      })
    }*/

    /*retrieveInfo1(){
      axios.get('https://ira.unipu.hr/info/'+this.state.username, {
        //...data
      }, {
        headers: {
          'Authorization': `Basic ${this.state.token}`
        }
      })
      .then(response => {
        this.state.name = response.data.name
        this.state.surname = response.data.surname
        this.state.oib = response.data.oib
        this.state.stateOfBirth = response.data.stateOfBirth
        this.state.postalTown = response.data.postalTown
        this.state.postalNumber = response.data.postalCode
        this.state.streetAddress = response.data.streetAddress
        this.state.telephone = response.data.telephone
        this.state.citizenship = response.data.citizenship
        this.state.placement = response.data.placement
        this.state.upisniBroj = response.data.upisniBroj
        this.state.courses = response.data.modulePreferences
        this.state.canDownloadBill = response.data.canDownloadBill
        this.state.canDownloadAAI = response.data.canDownloadAAI
        this.state.billKey = response.data.billKey
        this.state.AAIkey = response.data.AAIkey
        this.state.acceptedEnrollment = response.data.acceptedEnrollment
      }) 
      .catch(error => console.log(error))
    }*/

  },
  modules: {
  }
})
