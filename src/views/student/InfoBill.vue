<template>
    <div class="modal-backdrop1" style="z-index:1;">
      <div class="modal1 col-lg-4 col-10 offset-1 offset-lg-0" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Podaci za uplatu
          </slot>
        </header>
        <section class="modal-body" id="modalDescription" style="overflow-y:auto;">
          <slot name="body">
            <table style="border-collapse:collapse; border-style:hidden;">
              <tbody>
                <tr>
                  <td style="border: 1px solid lightgray;" class="table_title">Primatelj</td>
                  <td style="border: 1px solid lightgray;" class="table_content">SVEUČILIŠTE JURJA DOBRILE U PULI</td>
                </tr>
                <tr>
                  <td style="border: 1px solid lightgray;" class="table_title">Adresa</td>
                  <td style="border: 1px solid lightgray;" class="table_content">ZAGREBAČKA 30, HR-52100 PULA</td>
                </tr>
                <tr>
                  <td style="border: 1px solid lightgray;" class="table_title">IBAN</td>
                  <td style="border: 1px solid lightgray; word-break:break-all;" class="table_content">HR1923600001101931377</td>
                </tr>
                <tr>
                  <td style="border: 1px solid lightgray;" class="table_title">Model</td>
                  <td style="border: 1px solid lightgray;" class="table_content">HR99</td>
                </tr>
                <tr>
                  <td style="border: 1px solid lightgray;" class="table_title">Poziv na broj (vaš OIB)</td>
                  <td style="border: 1px solid lightgray;" class="table_content">{{$store.state.oib}}</td>
                </tr>
                <tr>
                  <td style="border: 1px solid lightgray;" class="table_title">Iznos</td>
                  <td style="border: 1px solid lightgray;" class="table_content">300,00kn (dummy)</td>
                </tr>
              </tbody>
            </table>
          </slot>
          <div><a :href="$store.getters.billUrl" target="_blank"><img :src="$store.getters.billUrl" style="width:100%;"></a></div>  
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn-close" @click="close" aria-label="Close modal">Zatvori</button>
          </slot>
        </footer>
      </div>
    </div>
</template>

<script>
export default {
  props: ['user'],
  name: 'modal',
    data(){
    return{
      
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  },
};
</script>