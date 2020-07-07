<template>
    <div class="top150">
        <h2>Login</h2>
            <div class="form-group offset-lg-4 col-lg-4 col-10 offset-1">
                <input @keyup.enter="enterClicked()" type="text" aria-describedby="emailHelp" v-model="username" placeholder="Username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group offset-lg-4 col-lg-4 col-10 offset-1">
                <input @keyup.enter="enterClicked()" type="password" v-model="password" placeholder="Password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;" @click.prevent="login">Login</button>
                <p v-if="feedback" class="mt-3 feedback">{{feedback}}</p>
            </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    data () {
        return {
            username: null,
            password: null,
            feedback: null,
            submitted: null
        }
    },
    methods: {
        login () {
            if (this.username && this.password) {
                this.feedback = null
                firebase.auth().signInWithEmailAndPassword(this.username, this.password)
                .then(() => {
                    this.$router.push({ 
                        name: 'HomePage'
                    })
                }).catch(err => {
                    this.feedback = err.message
                })
            } else {
                this.feedback = 'Please fill out both fields'
            }
        },
        enterClicked () {
            this.login()
        }
    }
};
</script>

<style scoped>

</style>