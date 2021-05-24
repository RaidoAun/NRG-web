<template>
    <div class = "MessageBoxOut">
        <div :key="message.id" v-for="message in messages">
            <p>{{message.text}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        messages: Array
    }
}
</script>