<template>
    <div class="MessageBoxIn">
        <input type="text" name="text" placeholder="Lisa Oma Tekst Siia" v-model="text">
        <Button @button-click="onButtonClick" text="minutekst"></Button>
    </div>
</template>



<script>

import Button from "@/components/Button.vue"

export default {
    name: "MessageBoxIn",
    components: {
        Button
    },
    data(){
        return {
            text:''
        }
    },
    methods:{
        onButtonClick(){
            const message = {
                id:Math.floor(Math.random()*10000),
                text: this.text
            }


            this.$emit('new-message-added', message)
        }
    }
}
</script>