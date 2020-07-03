<template>
    <div class="col-12 flexdisplay">
        <div>
            <a :href="račun" target="_blank"><button>Račun za upis</button></a>
            <a :href="prototip" target="_blank"><button>Prototip ugovora</button></a>
        </div>
        <div class="flexdisplay">
            <UploadBill :status="status" @send="storeBill"/>
            <a :href="uploadCheck" target="_blank" v-if="status === -1"><button class="red-button">Odbijeno</button></a>
            <a :href="uploadCheck" target="_blank" v-if="status === 0"><button class="yellow-button">Obrada</button></a>
            <a :href="uploadCheck" target="_blank" v-if="status === 1"><button class="green-button">Prihvaćeno</button></a>
        </div>

    </div>
</template>

<script>
import UploadBill from '@/views/student/UploadBill'

export default {
    name: 'phase2',
    props: ['stupanj'],
    components: {
        UploadBill
    },
    data() {
        return {
            račun: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
            prototip: "http://www.africau.edu/images/default/sample.pdf",
            upload: "",
            uploadCheck: "https://en.unesco.org/inclusivepolicylab/sites/default/files/dummy-pdf_2.pdf",
            status: null
        }
    },  
    methods: {
        storeBill (billData) {
            this.upload = billData;
            this.status = 1;
            this.$emit('alliswell');
        }
    }
};
</script>