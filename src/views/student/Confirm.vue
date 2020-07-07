<template>
    <div class="modal-backdrop1">
      <div class="modal1 col-md-4 col-10" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            Jeste li sigurni? bla bla bla...
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
  props: ['user', 'action'],
  name: 'modal',
    data(){
    return{
    }
  },
  methods: {
    close(broj) {
      this.$emit('close', broj);
    },
    approve() {
      if(this.action === true) {
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