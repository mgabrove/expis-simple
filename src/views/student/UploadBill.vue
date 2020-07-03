<template>
<div class="container-fluid" style="text-align:center;">
    <input type="file" class="form-control-file" id="selectedFile" @change="previewBill" accept="bill/*"/>
    <button :disabled="status === 0 || status === 1" @click.prevent="getBill">Upload potvrde o plačanju</button>
</div>
</template>

<script>
/* eslint-disable no-unused-vars */
export default {
  name: "UploadBill",
  props: ['status'],
  data() {
    return {
      billData: ""
    };
  },
  methods: {
    getBill() {
      document.getElementById("selectedFile").click();
    },
    previewBill: function(event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = e => {
          this.billData = e.target.result;
          this.$emit('send', this.billData)
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  },
};
</script>

<style lang="scss">
.bill .bill-preview{
  text-align: center;
}
.bill img.preview {
  max-width: 200px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
#selectedFile {
  display: none;
}
.bill {
    max-width: 400px;
    margin-top: 60px;
}
.bill h2 {
    font-size: 4.2em;
}
</style>