<template>
    <div class="grid grid-cols-1 gap-5">
        <Card title="Basic Select">
            <div class="space-y-5">
                <FromGroup label="Date & TIme" name="d2">
                    <flat-pickr
                        v-model="dateNtim"
                        class="form-control"
                        placeholder="Date & Time"
                        id="d2"
                        :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                    />
                </FromGroup>
                <!-- <FromGroup label="Date Range Picker" name="d5">
                    <DateRangePicker />
                </FromGroup> -->
            </div>
        </Card>
    </div>
</template>

<script>
import FromGroup from "@/components/FromGroup/index.vue";
import { defineComponent } from "vue";
import Card from "@/components/Card/index.vue";
export default defineComponent({
    components: {
        Card,
        FromGroup,
    },
    props: {},
    data() {
        return {
            dateDefault: null,
            dateNtim: null,
            timePicker: null,
            multiDate: null,
            rangeDate: null,
        };
    },
});
</script>
