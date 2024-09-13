<template>
    <div class="form-group">
        <label for="example-text-input" class="form-control-label fw-bolder">
            <small>{{ label.toUpperCase() }}<span v-if="required" class="text-danger">*</span></small>
        </label>
        <input type="file" class="form-control form-control-sm border border-primary" @change="fileSelected" />
        <span class="badge bg-danger mt-2" v-if="error">
            {{ error[0] }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'FileAttachComponent',
    props: {
        required: {
            type: Boolean,
            default: true
        },
        label: {
            type: String,
            required: true
        },
        value: {
            type: Object,
            required: true
        },
        error: Object
    },
    emits: ['update:value'],
    methods: {
        fileSelected(event) {
            const files = event.target.files;
            if (files.length > 0) {
                this.$emit('update:value', files[0]);
            }
        },
    }
}
</script>
