<template>
    <div class="modal-backdrop1" style="z-index:1;">
      <div class="modal1 col-md-4 col-10" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <p>Jeste li sigurni? ...</p>
            <p>...</p>
            <p v-if="isAccept && $store.state.courses != null">Studenti FER-a ne mogu mijenjati izbor smjerova nakon prihvaćanja uvjeta!</p>
            <p v-if="!isAccept">Odbijanjem gubite prava upisa!</p>
            <p>...</p>
            <p>Vaš izbor je trajan!!!</p>
            <p>...</p>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-close" @click="approve" aria-label="Close modal">DA</button>
            <button type="button" class="btn-close" @click="decline" aria-label="Close modal">NE</button>
          </slot>
        </footer>
      </div>
    </div>
</template>

<script>
export default {
  props: ['isAccept'],
  name: 'modal',
    data(){
    return{
    }
  },
  methods: {
    close(broj) {
      this.$emit('close', broj)
    },
    approve() {
      if(this.isAccept === true) {
        this.close(1)
      }
      else {
        this.close(-1)
      }
    },
    decline() {
      this.close(0)
    }
  },
};
</script>