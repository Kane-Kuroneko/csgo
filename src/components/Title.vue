<template>
    <div class="page-title">
        <div class="home-title" style="width: max-content;margin: auto">
            <img src="../assets/image/titleLeft.png" alt="" class="hide-m">
            <img src="../assets/image/lineLM.png" alt="" class="hide-p hide-ipad">
            <span> {{name}}</span>
            <img src="../assets/image/lineRm.png" alt="" class="hide-p hide-ipad">
            <img src="../assets/image/titleRigth.png" alt="" class="hide-m">
        </div>
        <div class="subtitle">{{subTitle}}</div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Title",
        props: {
            name: {
                default: '',
                type: String
            },
            subTitle: {
                default: '',
                type: String
            }
        }
    }
</script>

<style scoped>

</style>
