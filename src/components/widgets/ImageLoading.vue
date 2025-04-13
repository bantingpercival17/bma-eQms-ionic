<template>
    <div class="image-container">
        <img :src="imageSrc" alt="Loading..." />
    </div>
</template>

<script>
export default {
    name: 'ImageLoading',
    data() {
        return {
            imageSrc: '/eqms_loading.gif' // Relative to the public folder root
        };
    }
};
</script>
<style scoped>
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    /* Full screen height — adjust as needed */
    width: 100%;
}

.image-container img {
    max-width: 250px;
    height: auto;
}
</style>