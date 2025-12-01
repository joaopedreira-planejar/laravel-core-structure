<template>
    <div class="w-full h-full flex container mx-auto bg-red-200">
        <main class="w-full h-full flex">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";

onMounted(() => {
    console.log("oi mundo 123");
});
</script>
