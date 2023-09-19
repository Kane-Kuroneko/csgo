<template>
  <div style = "display: contents">
    <LoginWAP />
    <LoginPC />
  </div>
</template>

<script>
import LoginWAP from './Login.Wap';
import LoginPC from './Login.PC';

export default reaxper({
  components : {
    LoginWAP,
    LoginPC,
  },
})
</script>
