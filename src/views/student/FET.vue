<template>
    <div class="modal-backdrop1">
      <div class="modal1 col-md-4 col-10" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Izbor prioriteta smjerova
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <ul class="list-group">
                <li v-for="(smjer, broj) in smjerovi" v-bind:key="broj" class="list-group-item">
                    <span>{{smjer}}</span>
                    <div class="btn-group button-caret-group">  
                        <button class="btn button-caret-up shadow-none" v-on:click="move(broj,broj-1)" :disabled="broj==0">
                            <i class="fas fa-caret-square-up"></i>         
                        </button>
                        <button class="btn button-caret-down shadow-none" v-on:click="move(broj,broj+1)" :disabled="broj==(smjerovi.length-1)">
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
    props: ['smjerovi'],
    methods: {
        close() {
            this.$emit('close', this.smjerovi);
        },
        move(from, to) {
            var temp_from = this.smjerovi[from]
            var temp_to = this.smjerovi[to]
            this.smjerovi.splice(from, 1, temp_to);
            this.smjerovi.splice(to, 1, temp_from);
        },
    },
};
</script>