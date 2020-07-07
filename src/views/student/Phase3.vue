<template>
    <div class="margin-top-10">
        <a :href="ugovor" target="_blank" class="floating-right"><button class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;">Ugovor</button></a>
        <a :href="identitet" target="_blank" class="floating-right changing-margin-10"><button class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;">AAI podaci</button></a>
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

<style scoped>
    .changing-margin-10 {
        margin-right:10px;
    }
    @media (min-width: 992px) {
        .floating-right {
            float:right;
        }
    }
    @media (max-width: 768px) {
        .changing-margin-10 {
            margin-left: 10px;
        }
        .margin-top-10 {
            margin-top: 10px;
        }
    }
</style>