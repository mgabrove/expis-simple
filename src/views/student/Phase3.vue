<template>
    <div>
        <a :href="ugovor" target="_blank"><button>Ugovor za potpisati</button></a>
        <a :href="identitet" target="_blank"><button>AAI pristupni podaci</button></a>
    </div>
</template>

<script>

export default {
    name: 'phase3',
    data() {
        return {
            ugovor: "https://www.fthm.uniri.hr/images/doktorski/obrasci/Ugovor_o_studiranju_PHD_full_time_21_02_2019.pdf",
            identitet: "http://os-trnsko-zg.skole.hr/upload/os-trnsko-zg/images/static3/2256/attachment/Elektronicki_identitet-doc.pdf"
        }
    },  
    methods: {
    }
};
</script>