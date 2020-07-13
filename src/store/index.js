import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = 'http://ira.unipu.hr/expis'

//import firebase from 'firebase'
//import db from '@/firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    username: localStorage.getItem('access_username') || null,
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
  getters: {
    loggedIn(state) {
      return state.token != null
    }
  },
  mutations: {
    setCanDownloadAAI(state) {
      state.canDownloadAAI = true
    },
    hasAcceptedEnrollment(state) {
      state.acceptedEnrollment = true
      state.canDownloadBill = true
    },
    engageRefreshScenarioDummy(state) {
      state.canDownloadBill = false
      state.canDownloadAAI = false
      state.acceptedEnrollment = false
    },
    retrieveInfo(state, doc) {
      console.log(doc)
      state.name = doc.data.name
      state.surname = doc.data.surname
      state.oib = doc.data.oib
      state.course = doc.data.course
      state.courseForm = doc.data.courseForm
      state.dateOfBirth = doc.data.dateOfBirth
      state.postalTown = doc.data.postalTown
      state.postalNumber = doc.data.postalCode
      state.streetAddress = doc.data.streetAddress
      state.telephone = doc.data.telephone
      state.placement = doc.data.placement
      state.upisniBroj = doc.data.upisniBroj
      state.courses = doc.data.modulePreferences
      state.canDownloadBill = doc.data.canDownloadBill
      state.canDownloadAAI = doc.data.canDownloadAAI
      state.billKey = doc.data.billKey
      state.AAIkey = doc.data.AAIkey
      state.acceptedEnrollment = doc.data.acceptedEnrollment
      state.render = true
    },
    retrieveToken(state, data) {
      state.token = data.token
      state.username = data.username 
    },
    destroyToken(state) {
      state.token = null
      state.username = null
    }
  },
  actions: {
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', {
          oib: credentials.username,
          password: credentials.password
        })
        .then(response => {
          const token = response.data
          localStorage.setItem('access_token', token)
          localStorage.setItem('access_username', credentials.username)
          context.commit('retrieveToken', {
            token: token,
            username: credentials.username
          })
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    destroyToken(context) {
      if(context.getters.loggedin) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('access_username')
        context.commit('destroyToken')
      }
    },

    /* destroyToken(context) {
      if(context.getters.loggedin) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
          .then(response => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('access_username', token)
            context.commit('destroyToken')
            console.log(error)
            reject(error)
          })
        })
      }
    }, */

    setCanDownloadAAI(context) {
      context.commit('setCanDownloadAAI')
    },
    hasAcceptedEnrollment(context) {
      context.commit('hasAcceptedEnrollment')
    },
    engageRefreshScenarioDummy(context) {
      context.commit('engageRefreshScenarioDummy')
    },
    /* retrieveInfo(context){
      var user = firebase.auth().currentUser
      db.collection("users").where("uID","==",user.uid)
      .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            context.commit('retrieveInfo', doc)
          })
      })
    }, */
    /* acceptEnrollment(){
      var user = firebase.auth().currentUser
      db.collection("users").where("uID","==",user.uid)
      .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
              db.collection("users").doc(doc.id).update({ 
                  acceptedEnrollment: this.state.acceptedEnrollment,
                  canDownloadBill: this.state.canDownloadBill,
                  modulePreferences: this.state.courses
              })
          })
      })
    },
    downloadAIIDummy(){
      var user = firebase.auth().currentUser
      db.collection("users").where("uID","==",user.uid)
      .onSnapshot(snapshot => {
          snapshot.forEach(doc => {
              db.collection("users").doc(doc.id).update({ 
                  canDownloadAAI: this.state.canDownloadAAI
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
                acceptedEnrollment: this.state.acceptedEnrollment,
                canDownloadBill: this.state.canDownloadBill,
                canDownloadAAI: this.state.canDownloadAAI
              })
          })
      })
    }, */

    /*login(credentials){
      axios.post('/login', {
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

    retrieveInfo(context){
      axios.defaults.headers.common['Authorization'] = 'basic ' + context.state.token
      axios.get('/info/'+context.state.username)
      .then(response => {
        context.commit('retrieveInfo', response)
      }) 
      .catch(error => console.log(error))
    }

  },
  modules: {
  }
})
