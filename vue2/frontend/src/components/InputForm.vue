<template>
    <div class="InputForm">
        <div class="form-group">
            <label>Auto nr</label>
            <input type="text" class="form-control" v-model="car_nr">
        </div>
        <b-button variant="success"  @click="outputText()">Lisa</b-button>
    </div>
</template>

<script>
//import Button from "@/components/Button.vue"
export default {
    components: {
        //Button
    },
    data:()=>{
        return{
            car_nr:''
        }
    },
    methods:{
        outputText(){
            let output = {car_nr: this.car_nr}
            this.$emit("inputform-output", output)
        },
    }

}
</script>