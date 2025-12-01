<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const props = defineProps({
    name: { type: String, required: true }
})

const IconComponent = defineAsyncComponent(() =>
    import(`@assets/icons/${props.name}.svg`)
)

console.log(IconComponent);
</script>

<template>
    <component :is="IconComponent" class="w-6 h-6 text-gray-700" />
</template>
