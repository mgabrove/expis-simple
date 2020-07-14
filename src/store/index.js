import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
axios.defaults.baseURL = 'http://ira.unipu.hr/expis'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    username: localStorage.getItem('access_username') || null,
    feedback: null,
    title: null,

    name: null,
    surname: null,
    oib: null,
    course: null,
    faculty: null,
    fullTimeStudent: null,
    notStudiedBefore: null,
    dateOfBirth: null,
    postalTown: null,
    postalNumber: null,
    streetAddress: null,
    telephone: null,
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
    name(state) {
      return state.name
    },
    surname(state) {
      return state.surname
    },
    loggedIn(state) {
      return state.token != null
    },
    moduleList(state) {
      return state.courses
    },
    billUrl(state) {
      return ("http://ira.unipu.hr/files/codes/"+state.billKey+"/racun-"+state.oib+".png")
    }
  },
  mutations: {
    move(state, data) {
      var temp_from = state.courses[data.from]
      var temp_to = state.courses[data.to]
      state.courses.splice(data.from, 1, temp_to)
      state.courses.splice(data.to, 1, temp_from)
    },
    acceptEnrollment(state) {
      state.acceptedEnrollment = true
    },
    retrieveInfo(state, doc) {
      console.log(doc)
      state.name = doc.data.name
      state.surname = doc.data.surname
      state.oib = doc.data.oib
      state.course = doc.data.course
      state.faculty = doc.data.faculty
      state.fullTimeStudent = doc.data.fullTimeStudent
      state.notStudiedBefore = doc.data.notStudiedBefore
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
      state.billKey = doc.data.billHash
      state.AAIkey = doc.data.AAIkey
      state.acceptedEnrollment = doc.data.acceptedEnrollment
      state.render = true
      state.title = "Upisi na UniPu - "+state.name+" "+state.surname
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
    move(context, data) {
      context.commit('move', data)
    },
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
          context.state.feedback = "OIB ili lozinka nisu ispravni"
          reject(error)
        })
      })
    },
    destroyToken(context) {
      if(context.getters.loggedIn) {
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
    hasAcceptedEnrollment(context) {
      context.commit('hasAcceptedEnrollment')
    },
    acceptEnrollment(context){
      if(context.state.courses != null) {
        axios.defaults.headers.common['Authorization'] = 'basic ' + context.state.token
        axios.patch('/info/'+context.state.username, {
          acceptedEnrollment: true,
          modulePreferences: context.state.courses
        })
        .then(() => {
          context.commit('acceptEnrollment')
        }) 
        .catch(error => console.log(error))
      } else {
        axios.defaults.headers.common['Authorization'] = 'basic ' + context.state.token
        axios.patch('/info/'+context.state.username, {
          acceptedEnrollment: true,
        })
        .then(() => {
          context.commit('acceptEnrollment')
        }) 
        .catch(error => console.log(error))        
      }
      context.dispatch('retrieveInfo')
    },
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
