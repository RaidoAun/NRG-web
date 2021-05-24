<template>
  <div class="Button">
      <button @click="onClick()">{{text}}</button>
  </div>
</template>

<script>
export default {
    name: "Button",
    props: {
        text: String
    },
    methods: {
        onClick(){
            this.$emit("button-click")
        }
    }
}
</script>