<template>
    <div class="top150">
        <h2>Login</h2>
            <div class="form-group offset-4 col-4">
                <input type="text" v-model="username" placeholder="Username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group offset-4 col-4">
                <input type="password" v-model="password" placeholder="Password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary" @click.prevent="login">Login</button>
                <p v-if="feedback" class="mt-3 feedback">{{feedback}}</p>
            </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            username: null,
            password: null,
            feedback: null,
            submitted: false
        }
    },
    methods: {
        login () {
            if (this.username && this.password) {
                if (this.username === "student") {
                    this.$router.push({ 
                        name: 'Student'
                    })
                } 
                if (this.username === "referada") {
                    this.$router.push({ 
                        name: 'Referada'
                    })
                }                
            } else {
                this.feedback = 'Please fill out both fields'
            }
        }
    }
};
</script>