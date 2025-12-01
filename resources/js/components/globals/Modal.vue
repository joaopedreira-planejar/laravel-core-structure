<script setup>
import {ref} from "vue";

const props = defineProps({
    buttonTitle: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
})

const modalRef = ref(null);
const id = `my_modal_${Math.random().toString(36).substr(2,9)}`;

function openModal() {
    modalRef.value?.showModal();
}
</script>

<template>
    <button class="btn" @click="openModal">{{ buttonTitle }}</button>
    <dialog :id="id" ref="modalRef" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
            <h3 class="text-lg font-bold" v-if="title">{{ title }}</h3>
            <slot name="text" />
            <!-- if there is a button in form, it will close the modal -->
            <!--<div class="modal-action">
                <form method="dialog">
                    <button class="btn">Close</button>
                </form>
            </div>-->
        </div>
    </dialog>
</template>

<style scoped>

</style>
