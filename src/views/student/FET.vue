<template>
    <div class="modal-backdrop1" style="z-index:1;">
      <div class="modal1 col-md-4 col-10" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Izbor prioriteta smjerova
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <ul class="list-group">
                <li v-for="(smjer, broj) in $store.getters.moduleList" v-bind:key="broj" class="list-group-item">
                    <span>{{smjer}}</span>
                    <div class="btn-group button-caret-group">  
                        <button class="btn button-caret-up shadow-none" v-on:click="move(broj,broj-1)" :disabled="broj==0">
                            <i class="fas fa-caret-square-up"></i>         
                        </button>
                        <button class="btn button-caret-down shadow-none" v-on:click="move(broj,broj+1)" :disabled="broj==($store.state.courses.length-1)">
                            <i class="fas fa-caret-square-down"></i>
                        </button>
                    </div>
                </li>
            </ul>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-close" @click.prevent="close" aria-label="Close modal">Done</button>
          </slot>
        </footer>
      </div>
    </div>
</template>

<script>
export default {
    name: 'modal',
    methods: {
        close() {
            this.$emit('close');
        },
        move(from, to) {
          this.$store.dispatch('move', {
            from: from,
            to: to
          })
            var temp_from = this.$store.state.courses[from]
            var temp_to = this.$store.state.courses[to]
            this.$store.state.courses.splice(from, 1, temp_to)
            this.$store.state.courses.splice(to, 1, temp_from)
        },
    },
};
</script>