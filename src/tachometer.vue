<template>
  <div>
    <div>rpm: {{ rpmCurrent }}</div>
    <div>rpmMax: {{ rpmMax }}</div>
    <div>rpmIdle: {{ rpmIdle }}</div>
  </div>
</template>

<script>
export default {
  props: [ 'rpmCurrent', 'rpmMax', 'rpmIdle' ],
  data() {
    return {
      
    };
  }
};
</script>
