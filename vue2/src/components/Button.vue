<template>
    <div class="Button">
        <button :class="btnclass" @click="onClick">{{text}}</button>
    </div>
</template>
<script>
export default {
    props:{
        btnclass: String,
        text:String
    },
    methods: {
        onClick(){
            this.$emit("button-click")
        }
    }
}
</script>