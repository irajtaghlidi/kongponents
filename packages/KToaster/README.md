# @kongponents/ktoaster

[![](https://img.shields.io/npm/v/@kongponents/ktoaster.svg?style=flat-square)](https://www.npmjs.com/package/@kongponents/ktoaster)

```js
new Vue({
  data(){
    return {
      isVisible: false,
    }
  },
  methods: {
    showToaster() {
      this.isVisible = true;
    },
    closeToaster() {
      this.isVisible = false;
    }
  },
  template: `
    <div>
      <KButton appearance='primary' :isRounded='true' :handleClick="showToaster">Open Toaster</KButton>
      <KToaster :isVisible="isVisible" appearance='success' message="Hello! 👋🏼" @close="closeToaster" />
    </div>
  `
})
```
