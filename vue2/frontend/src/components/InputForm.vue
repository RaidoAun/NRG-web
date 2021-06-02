<template>
    <div class="InputForm">
        <div class="form-group">
            <label>Auto mudel</label>
            <input type="text" class="form-control" v-model="mudel">
            <label>Auto nr</label>
            <input type="text" class="form-control" v-model="autonr">
        </div>
        <Button btnclass = "btn btn-success" text = "Lisa / confirm" @button-click="outputText"></Button>
    </div>
</template>

<script>
import Button from "@/components/Button.vue"
export default {
    components: {
        Button
    },
    data(){
        return{
            mudel:'',
            autonr:''
        }
    },
    methods:{
        outputText(){
            let output = {mudel: this.mudel,autonr: this.autonr}
            this.$emit("inputform-output", output)
        },
    }

}
</script>