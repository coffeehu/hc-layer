<template>
  <transition name="h-message-fade">
    <div v-show="visible"
         class="h-message" 
         :class="[messageTypeClass, center ? 'is-text-center' : '', 'is-'+position, customClass]">
      <i v-if="iconClass" :class="iconClass"></i>
      <i v-else class="h-message--icon" :class="iconTypeClass"></i>
      <p class="h-message--content" v-if="userHtmlString" v-html="message"></p>
      <p class="h-message--content" v-else>{{ message }}</p>
      <i v-if="showClose" class="h-icon--close h-message--close" @click="close"></i>
    </div>
  </transition>
</template>

<script>
export default {
  mounted: function(){
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },
  data () {
    return {
      visible: false,
      message: '',
      type: 'info',
      duration: 3000,
      showClose: false,
      closed: false,
      iconClass: '',
      customClass: '',
      center: false, //文本居中
      position: 'top',  // top/center/bottom; default: top
      userHtmlString: false
    }
  },
  watch: {
    closed: function(newVal) {
      if(newVal){
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },
  computed: {
    messageTypeClass: function(){
      return ( this.type && !this.iconClass ) ? 'h-message--'+this.type : '';
    },
    iconTypeClass: function(){
      return 'h-icon--'+this.type;
    }
  },
  methods: {
    startTimer: function(){
      const that = this;
      if(that.duration > 0){
        setTimeout(function(){
          if(!that.closed) {
            that.close();
          }
        }, that.duration);
      }
    },
    close: function(){
      this.closed = true;
      if(typeof this.onClose === 'function'){
        this.onClose(this);
      }
    },
    destroyElement: function(){
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    },
    keydown: function(e){
      if(e.keyCode === 27){
        if(!this.closed){
          this.close();
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
