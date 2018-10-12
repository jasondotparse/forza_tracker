new Vue({
  el:'#vue-app',
  data: {
    title: 'Forzatracker',
    counter: 0,
    x: 0,
    y: 0
  },
  methods: {
    add: function() {
      this.counter++;
    },
    subtract: function() {
      this.counter--;
    },
    updateXY: function(evt) {
      this.x = evt.offsetX;
      this.y = evt.offsetY;
    }
  }
});