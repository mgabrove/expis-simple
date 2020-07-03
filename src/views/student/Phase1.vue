<template>
    <div>
        <table class="table table-striped offset-1 col-10">
            <tbody>
                <tr>
                    <td class="table_title">Ime</td>
                    <td class="table_content">{{ime}}</td>
                    <td class="table_title">Godina</td>
                    <td class="table_content">{{godina}}</td>
                </tr>
                <tr>
                    <td class="table_title">Prezime</td>
                    <td class="table_content">{{prezime}}</td>
                    <td class="table_title">Studij</td>
                    <td class="table_content">{{studij}}</td>
                </tr>
                <tr>
                    <td class="table_title">OIB</td>
                    <td class="table_content">{{oib}}</td>
                    <td class="table_title">Smjer</td>
                    <td v-if="smjerovi === null" class="table_content">/</td>
                    <td v-if="smjerovi !== null" class="table_content">
                        <ol>
                            <li v-for="(smjer, broj) in smjerovi" v-bind:key="broj">
                                {{broj+1}}. {{smjer}}
                            </li>
                        </ol>
                        <button v-if="stupanj === 1" class="btn btn-primary" @click="showModal">Izmjeni</button>
                        <FET v-if="isModalVisible === true" :smjerovi="smjerovi" @close="closeModal"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="stupanj === 1">
            <button class="btn btn-primary" @click="prihvati">Prihvati</button>
            <button class="btn btn-primary" @click="showModal">Odbij</button>
        </div>
    </div>
</template>

<script>
import FET from '@/views/student/FET'

export default {
    name: 'phase1',
    props: ['stupanj'],
    components: {
        FET
    },
    data() {
        return {
            ime: 'Ivan',
            prezime: 'Ivanić',
            oib: '012345678',
            godina: '1',
            studij: 'FET',
            smjerovi: ['Financijski management', 'Management i poduzetništvo', 'Marketinško upravljanje', 'Informatički menadžment', 'Turizam'],
            isModalVisible: false,
        }
    },  
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        prihvati() {
            this.$emit('prihvatio', 2);
        }
    }
};
</script>