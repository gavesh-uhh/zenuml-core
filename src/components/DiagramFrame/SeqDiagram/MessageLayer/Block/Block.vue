<template>
  <div class="block" :data-origin="origin">
    <div
      class="statement-container mt-1"
      :data-origin="origin"
      v-for="(stat, index) in statements"
      :key="index"
    >
      <Statement
        :origin="origin"
        :context="stat"
        :collapsed="collapsed"
        :number="getNumber(index)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import Statement from "./Statement/Statement.vue";
import { increaseNumber } from "@/utils/Numbering";

const props = defineProps<{
  origin?: string;
  context?: any;
  number?: string;
  incremental?: boolean;
  collapsed?: boolean;
}>();
const statements = computed(() => props.context?.stat() || []);
const getNumber = (index: number) => {
  if (props.number) {
    return props.incremental
      ? increaseNumber(props.number, index)
      : `${props.number}.${index + 1}`;
  }
  return String(index + 1);
};
</script>
