<template>
  <div>
    <div>speed: {{ displayedSpeed }}mph</div>
  </div>
</template>

<script>
export default {
  props: ['speedMPH'],
  data() {
    return {
      
    };
  },
  computed: {
    displayedSpeed: function () {
      return Math.round(Number(this.speedMPH));
    }
  }
};
</script>
