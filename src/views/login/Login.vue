<template>
    <div class="top150">
        <h2>Login</h2>
            <div class="form-group offset-lg-4 col-lg-4 col-10 offset-1">
                <input @keyup.enter="enterClicked()" type="text" aria-describedby="emailHelp" v-model="username" placeholder="OIB" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Potreban OIB</div>
            </div>
            <div class="form-group offset-lg-4 col-lg-4 col-10 offset-1">
                <input @keyup.enter="enterClicked()" type="password" v-model="password" placeholder="lozinka" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Potrebna lozinka</div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;" @click.prevent="login">Ulaz</button>
                <p v-if="$store.state.feedback" class="mt-3 feedback">{{$store.state.feedback}}</p>
            </div>
    </div>
</template>

<script>
//import firebase from 'firebase'

export default {
    data () {
        return {
            username: null,
            password: null,
            submitted: null
        }
    },
    methods: {
        /* login () {
            this.$store.state.username = this.username
            if (this.username && this.password) {
                this.$store.state.feedback = null
                firebase.auth().signInWithEmailAndPassword(this.username, this.password)
                .then(() => {
                    this.$router.push({ 
                        name: 'HomePage'
                    })
                }).catch(err => {
                    this.$store.state.feedback = err.message
                })
            } else {
                this.$store.state.feedback = 'Please fill out both fields'
            }
        }, */
        login() {
            if(this.username && this.password) {
                this.$store.dispatch('retrieveToken', {
                    username: this.username,
                    password: this.password
                })
                .then(() => {
                    this.$router.push({
                        name: 'HomePage'
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
            } else {
                this.$store.state.feedback = "Trebate popuniti oba polja"
            }
        },
        enterClicked () {
            this.login()
        }
    }
}
</script>

<style scoped>

</style>