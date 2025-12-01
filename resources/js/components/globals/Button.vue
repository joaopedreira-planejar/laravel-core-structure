<script setup>
const props = defineProps({
    type: {

    },
    text: {
        type: String,
        required: true
    },
    isLink: {
        type: Boolean,
        default: false
    },
    href: {
        type: String,
        validator(value, props) {
            if(props.link && !value) {
                console.warn("Prop 'href' é obrigatória quando 'link' é true");
                return false;
            }
            return true;
        },
    },
});
</script>

<template>
    <div>
        <button v-if="!isLink" class="btn bg-black text-white border-black px-4">
            <slot name="back-svg"></slot>
            {{ text }}
            <slot name="front-svg"></slot>
        </button>
        <a v-else :href class="btn bg-black text-white border-black px-4">
            <slot name="back-svg"></slot>
            {{ text }}
            <slot name="front-svg"></slot>
        </a>
    </div>
</template>

<style scoped>

</style>
