<template>
    <div style="height: 100vh; width: 100vw">
        <router-view />
    </div>
</template>

<script>
export default {
    watch: {},
    created() {
        console.log(this);
        console.log(this.$router);
        console.log(this.$route);
    },
};
</script>

<style></style>
