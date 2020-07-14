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
            <p>Unesite vaš OIB za potvrdu izbora.</p>
            <input @keyup.enter="enterClicked()" type="text" aria-describedby="emailHelp" v-model="oib" placeholder="OIB" name="username" class="form-control"/>
            <div v-show="doShow" class="invalid-feedback">Unos i OIB se ne podudaraju</div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot v-if="isAccept" name="footer">
            <button type="button" class="btn-close" @click="approve" aria-label="Close modal">PRIHVATI UPIS</button>
            <button type="button" class="btn-close" @click="decline" aria-label="Close modal">POVRATAK</button>
          </slot>
          <slot v-if="!isAccept" name="footer">
            <button type="button" class="btn-close" @click="approve" aria-label="Close modal">ODBIJ UPIS</button>
            <button type="button" class="btn-close" @click="decline" aria-label="Close modal">POVRATAK</button>
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
      oib: null,
      doShow: false
    }
  },
  methods: {
    close(broj) {
      this.$emit('close', broj)
    },
    approve() {
      if(this.oib === this.$store.state.oib) {
        if(this.isAccept === true) {
          this.close(1)
        }
        else {
          this.close(-1)
        }
      } else {
        this.doShow = true
      }
    },
    decline() {
      this.close(0)
    }
  },
};
</script>