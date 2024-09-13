<template>
    <div class="form-group">
        <label for="example-text-input" class="form-control-label fw-bolder">
            <small>{{ label.toUpperCase() }} <span class="text-danger">*</span></small>
        </label>
        <select :value="value" @input="$emit('update:value', $event.target.value)"
            class="form-select form-select-sm border border-primary">
            <option value="">Select {{ label }}</option>
            <option v-for="item in data" :key="item.id" :value="item.id">
                {{ item[columnName] }}</option>
        </select>
        <span class="badge bg-danger mt-2" v-if="error">{{
                error[0] }}</span>
    </div>
</template>
<script>

export default {
    name: "SelectComponents",
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        columnName: {
            type: String,
            required: true
        },
        data: Object,
        error: Object

    },
    emits: ['update:value']
}
</script>