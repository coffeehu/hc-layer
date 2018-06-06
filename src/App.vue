<template>
  <div id="app">
    <img src="./assets/logo.png" width="100" height="100">
    <HelloWorld/>
    
    <div class="module-wrapper root-module">
      <h1>Message</h1>
      <div class="module-wrapper">
        <button @click="showMessage">默认</button>
        <button @click="showMessageSuccess">success</button>
        <button @click="showMessageHelp">help</button>
        <button @click="showMessageWarn">warn</button>
        <button @click="showMessageError">error</button>
        <button @click="showMessageNoIcon">无图标</button>
      </div>
      <div class="module-wrapper">
        <button @click="showMessageClose">显示关闭按钮</button>
        <button @click="showMessageNotClose">不会自动关闭</button>
      </div>
      <div class="module-wrapper">
        <button @click="showMessageTextCenter">文本居中</button>
        <button @click="showMessageCenter">位置居中</button>
        <button @click="showMessageBottom">位置靠底</button>
      </div>
      <button @click="closeMessage">close</button>
    </div>

    <div class="module-wrapper root-module">
      <h1>Notification</h1>
      <div class="module-wrapper">
        <button @click="showNotification">默认</button>
        <button @click="showNotificationInfo">info</button>
        <button @click="showNotificationSuccess">success</button>
        <button @click="showNotificationHelp">help</button>
        <button @click="showNotificationWarn">warn</button>
        <button @click="showNotificationError">error</button>
      </div>
      <div class="module-wrapper">
        <button @click="showNotificationBottomRight">右下</button>
        <button @click="showNotificationBottomLeft">左下</button>
        <button @click="showNotificationTopLeft">左上</button>
        <button @click="showNotificationOffset">垂直偏移</button>
      </div>
      <div class="module-wrapper">
        <button @click="showNotificationNoClose">不显示关闭按钮</button>
      </div>
      <button @click="closeNotification">close</button>
    </div>

    <div class="module-wrapper root-module">
      <h1>MessageBox</h1>

      <div class="module-wrapper" style="border-color:#a8def5">
        <h1>alert</h1>
        <div class="module-wrapper">
          <button @click="msgboxAlert">alert-默认</button>
          <button @click="msgboxAlertInfo">alert-info</button>
          <button @click="msgboxAlertSuccess">alert-success</button>
          <button @click="msgboxAlertHelp">alert-help</button>
          <button @click="msgboxAlertWarn">alert-warn</button>
          <button @click="msgboxAlertError">alert-error</button>
        </div>
        <div class="module-wrapper">
          <button @click="msgboxAlertCenter">alert-文本居中</button>
          <button @click="msgboxAlertCenterIcon">alert-文本居中带图标</button>
        </div>
      </div>

      <div class="module-wrapper" style="border-color:pink">
        <h1>confirm</h1>
        <div class="module-wrapper">
          <button @click="msgboxConfirm">confirm-默认</button>
          <button @click="msgboxConfirmNoLock">confirm-不锁滚动条</button>
          <p class="tips">和 alert 的区别只是多了一个 cancel 按钮</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Message from './packages/message'
import Notification from './packages/notification'
import MessageBox from './packages/message-box'
import './assets/h-ui.css'

export default {
  name: 'App',
  data() {
    return {
      shadow: false
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    /*-----------------Message-----------------*/
    showMessage() {
       Message({
        message: 'hello',
      });
    },
    showMessageSuccess() {
       Message.success('hello');
    },
    showMessageHelp() {
       Message.help('hello');
    },
    showMessageWarn() {
       Message.warn('hello');
    },
    showMessageError() {
       Message.error('hello');
    },
    showMessageClose() {
       Message({
        message: 'hello',
        showClose: true
       })
    },
    showMessageNotClose() {
       Message({
        message: 'hello',
        showClose: true,
        duration: 0
       })
    },
    showMessageNoIcon() {
       Message({
        message: 'hello',
        iconClass: true
       });
    },
    showMessageTextCenter() {
       Message({
        message: 'hello',
        center: true,
        showClose: true
      });
    },
    showMessageCenter() {
       Message({
        message: 'hello',
        position: 'center',
        showClose: true
      });
    },
    showMessageBottom() {
       Message({
        message: 'hello',
        position: 'bottom',
        showClose: true
      });
    },
    closeMessage() {
      Message.closeAll();
    },

    /*-----------------Notification-----------------*/
    showNotification() {
      Notification({
        title:'info',
        message:'hello'
      })
    },
    showNotificationInfo() {
      Notification.info({
        title:'info',
        message:'hello',
      })
    },
    showNotificationSuccess() {
      Notification.success({
        title:'info',
        message:'hello',
      })
    },
    showNotificationHelp() {
      Notification.help({
        title:'info',
        message:'hello',
      })
    },
    showNotificationWarn() {
      Notification.warn({
        title:'info',
        message:'hello',
      })
    },
    showNotificationError() {
      Notification.error({
        title:'info',
        message:'hello',
      })
    },
    showNotificationBottomLeft() {
      Notification({
        title:'info',
        message:'hello',
        type: 'success',
        position: 'bottom-left'
      })
    },
    showNotificationBottomRight() {
      Notification({
        title:'info',
        message:'hello',
        type: 'success',
        position: 'bottom-right'
      })
    },
    showNotificationTopLeft() {
      Notification({
        title:'info',
        message:'hello',
        type: 'success',
        position: 'top-left'
      })
    },
    showNotificationNoClose() {
      Notification({
        title:'info',
        message:'hello',
        showClose: false
      })
    },
    showNotificationOffset() {
      Notification({
        title:'info',
        message:'hello',
        type: 'success',
        offset: 200
      })
    },
    closeNotification() {
      Notification.closeAll();
    },

    /*-----------------MessageBox-----------------*/
    msgboxAlert() {
      MessageBox.alert('hello', 'title', {
        confirmButtonText: '确定',
      })
    },
    msgboxAlertInfo() {
      MessageBox.alert('hello', 'title', {
        type: 'info',
        confirmButtonText: '确定',
        beforeClose: function(instance, close){
          console.log('beforeClose', instance);
          close();
        }
      });
    },
    msgboxAlertHelp() {
      MessageBox.alert('hello', 'title', {
        type: 'help',
        confirmButtonText: '确定'
      });
    },
    msgboxAlertSuccess() {
      MessageBox.alert('hello', 'title', {
        type: 'success',
        confirmButtonText: '确定'
      });
    },
    msgboxAlertWarn() {
      MessageBox.alert('hello', 'title', {
        type: 'warn',
        confirmButtonText: '确定'
      });
    },
    msgboxAlertError() {
      MessageBox.alert('hello', 'title', {
        type: 'error',
        confirmButtonText: '确定'
      });
    },
    msgboxAlertCenter() {
      MessageBox.alert('hello', 'title', {
        center: true,
        confirmButtonText: '确定'
      });
    },
    msgboxAlertCenterIcon() {
      MessageBox.alert('hello', 'title', {
        type: 'success',
        center: true,
        confirmButtonText: '确定'
      });
    },
    msgboxConfirm() {
      MessageBox.confirm('hello', 'title', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        Message.success('确定');
      }).catch(() => {
        Message.info('取消');
      })
    },
    msgboxConfirmNoLock(){
      MessageBox.confirm('hello', 'title', {
        confirmButtonText: 'confirm',
        cancelButtonText: 'cancel',
        lockScroll: false
      }).then(() => {
        Message.success({
          message: 'confirm',
          showClose: true
        });
      }).catch(() => {
        Message.info({
          message: 'cancel',
          showClose: true
        });
      })
    }



  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
#app h1 {
  margin: 0;
  padding: 0;
  margin-bottom: 20px;
}
.module-wrapper {
  border: 1px solid #e2e2e2;
  padding: 20px 5px;
  margin: 10px 30px;
}
.root-module {
  width: 60%;
  margin-left: 50%;
  margin-bottom: 50px;
  transform: translateX(-50%);
  border-color: #c4c4c4;
}
.module-wrapper button {
  line-height: 1.3;
  padding: 10px 15px;
  border: 1px solid #c4c4c4;
  outline: none;
  background: #e2e2e2;
  cursor: pointer;
}
.module-wrapper button:hover {
  color: #666;
}
#app .module-wrapper h1 {
  text-align: left;
  padding-left: 30px;
  font-size: 26px;
}
#app .root-module > h1 {
  text-align: center;
  font-size: 30px;
}
/*#app .root-module > .module-wrapper:nth-of-type(1) {
  border-color: #a8def5;
}
#app .root-module > .module-wrapper:nth-of-type(2) {
  border-color: pink;
}
#app .root-module > .module-wrapper:nth-of-type(3) {
  border-color: burlywood;
}*/
.tips {
  font-size: 12px;
  color: #666;
}
</style>
