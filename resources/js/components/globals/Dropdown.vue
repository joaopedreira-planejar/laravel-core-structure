<script setup>
import {ref, onMounted, onBeforeUnmount, computed} from 'vue';

const props = defineProps({
    triggerClass: { type: String, default: '' },
    placement: { type: String, default: 'bottom-start' },
    modelValue: { type: Boolean, default: null },
    closeOnSelect: { type: Boolean, default: true }
});
const emit = defineEmits(['update:modelValue', 'open', 'close']);

const isOpen = ref(false);
const triggerRef = ref(null);
const menuRef = ref(null);
const id = `dropdown-${Math.random().toString(36).substr(2,9)}`;

const placementClass = computed(() => {
    // map props.placement to daisyUI class e.g. 'bottom-end' -> 'dropdown-end'
    const map = {
        'bottom-start': 'dropdown-bottom dropdown-start',
        'bottom-end': 'dropdown-bottom dropdown-end',
        'top': 'dropdown-top',
        'top-start': 'dropdown-top dropdown-start',
        'top-end': 'dropdown-top dropdown-end'
        // etc.
    };
    return map[props.placement] || '';
});
const popoverTargetAttr = { popovertarget: id, style: `anchor-name:--anchor-${id}` };
const popoverMenuAttr = { id, popover: '', style: `position-anchor:--anchor-${id}` };

function toggle() {
    isOpen.value = !isOpen.value;
    emit('update:modelValue', isOpen.value);
    if (isOpen.value) emit('open');
    else emit('close');
}

function onDocumentClick(e) {
    if (!triggerRef.value?.contains(e.target) && !menuRef.value?.contains(e.target)) {
        isOpen.value = false;
        emit('update:modelValue', false);
        emit('close');
    }
}

function onMenuClick() {
    if (props.closeOnSelect) {
        isOpen.value = false;
        emit('update:modelValue', false);
        emit('close');
    }
}

onMounted(() => {
    document.addEventListener('click', onDocumentClick);
});
onBeforeUnmount(() => {
    document.removeEventListener('click', onDocumentClick);
});

// Watch modelValue if using v-model to sync external controlled state
if (props.modelValue !== null) {
    watch(() => props.modelValue, v => {
        isOpen.value = v;
    });
}
</script>

<template>
    <div :class="['dropdown', placementClass]">
        <div ref="triggerRef"
             :class="triggerClass"
             @click="toggle"
             v-bind="popoverTargetAttr">
            <slot name="trigger"></slot>
        </div>
        <ul v-show="isOpen"
            ref="menuRef"
            class="dropdown-content menu"
            v-bind="popoverMenuAttr"
            @click="onMenuClick">
            <slot name="menu"></slot>
        </ul>
    </div>
</template>

<style scoped>

</style>
