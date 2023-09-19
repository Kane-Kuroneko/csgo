<template>
    <div></div>
</template>

<script>
    export default {
        name: "emptyRouer",
        beforeRouteEnter(to,form,next){
            next(vm =>{
                vm.$router.replace(form.path)
            })
        }
    }
</script>

<style scoped>

</style>
