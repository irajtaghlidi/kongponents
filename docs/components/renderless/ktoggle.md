# KToggle

Provide toggle functionality to components.

e.g.

- on / off
- enabled / disabled
- visible / not visible

<KCard>
  <template v-slot:body>
    <KToggle v-slot="{isToggled, toggle}">
        <KButton @click="toggle">
          {{ isToggled ? 'toggled' : 'not toggled' }}
        </KButton>
    </KToggle>
  </template>
</KCard>

```vue
<KToggle v-slot="{isToggled, toggle}">
  <KButton @click="toggle">
    {{ isToggled ? 'toggled' : 'not toggled' }}
  </KButton>
</KToggle>
```

## Props

### toggled

The toggled state that the component should begin with.

- Default: `false`

## Slots

- `default` - content to toggle.

### Slot Props

| Props       | Type     | Description                     |
| :---------- | :------- | :------------------------------ |
| `isToggled` | Boolean  | the component is toggled or not |
| `toggle`    | Function | function to toggle!             |

You can trigger the `toggle` function to switch the state in any way you'd like.
For instance, here we are toggling the state on `mouseover` and toggling back on
`mouseout`.

<KCard>
  <template v-slot:body>
    <KToggle :toggled="true" v-slot="{isToggled, toggle}">
      <div
        :style="{color: isToggled ? 'green' : 'red'}"
        @mouseover="toggle" 
        @mouseout="toggle">
        {{ isToggled ? 'yes' : 'no' }}
      </div>
    </KToggle>
  </template>
</KCard>

```vue
<KToggle v-slot="{isToggled, toggle}" :toggled="true">
  <div
    :style="{color: isToggled ? 'green' : 'red'}"
    @mouseover="toggle" 
    @mouseout="toggle">
    {{ isToggled ? 'yes' : 'no' }}
  </div>
</KToggle>
```

## Events

| Event     | returns             |
| :-------- | :------------------ |
| `toggled` | `isToggled` Boolean |

<KCard>
  <div slot="body">
    <KToggle v-slot="{ toggle }" @toggled="sayHello">
      <KButton @click="toggle">keep clicking me</KButton>
    </KToggle>
  </div>
</KCard>

```vue
<template>
  <KToggle v-slot="{ toggle }" @toggled="sayHello">
    <KButton @click="toggle">keep clicking me</KButton>
  </KToggle>
</template>

<script>
export default {
  methods: {
    sayHello(isToggled) {
      alert('hello! the toggled is set to: ' + isToggled)
    }
  }
}
</script>
```

## Usage

KToggle is meant to be used to add behavior to other components, by wrapping
them and placing them inside `KToggle`'s default slot.

### KModal

<KCard class="mt-3">
  <div slot="body">
    <KToggle v-slot="{ isToggled, toggle }">
      <div>
        <KButton @click="toggle">
          Show Modal
        </KButton>
        <KModal
          :isVisible="isToggled"
          @proceed="toggle"
          @canceled="toggle" />
      </div>
    </KToggle>
  </div>
</KCard>

```vue
<KToggle v-slot="{ isToggled, toggle }">
  <div>
    <KButton @click="toggle">
      Show Modal
    </KButton>
    <KModal
      :isVisible="isToggled"
      @proceed="toggle"
      @canceled="toggle" />
  </div>
</KToggle>
```

### Collapse/Expand

<KCard class="mt-2" style="min-height: 100px;">
  <div slot="body">
    <KToggle v-slot="{isToggled, toggle}">
      <div>
        <KButton @click="toggle">
          {{ isToggled ? 'collapse' : 'expand' }}
        </KButton>
        <KAlert 
          v-if="isToggled" 
          class="mt-3" 
          alertMessage="Every day, once a day, give yourself a present." />
      </div>
    </KToggle>
  </div>
</KCard>

```vue
<KToggle v-slot="{isToggled, toggle}">
  <div>
    <KButton @click="toggle">
      {{ isToggled ? 'collapse' : 'expand' }}
    </KButton>
    <KAlert 
      v-if="isToggled" 
      class="mt-3" 
      alertMessage="Every day, once a day, give yourself a present." />
  </div>
</KToggle>
```

#### Toggle with Animation

<KCard class="mt-2" style="min-height: 100px;">
  <div slot="body">
    <KToggle v-slot="{isToggled, toggle}">
      <div>
        <KButton @click="toggle">
          {{ isToggled ? 'collapse' : 'expand' }}
        </KButton>
        <transition name="expand">
          <KAlert
            v-if="isToggled" 
            class="mt-3"
            alertMessage="Every day, once a day, give yourself a present." />
        </transition>
      </div>
    </KToggle>
  </div>
</KCard>

```vue
<KToggle v-slot="{isToggled, toggle}">
  <div>
    <KButton @click="toggle">
      {{ isToggled ? 'collapse' : 'expand' }}
    </KButton>
    <transition name="expand">
      <KAlert
        v-if="isToggled" 
        class="mt-3"
        alertMessage="Every day, once a day, give yourself a present." />
    </transition>
  </div>
</KToggle>
```

<script>
export default {
  methods: {
    sayHello (isToggled) {
      alert('hello! the toggled is set to: ' + isToggled)
    }
  }
}
</script>

<style>
.expand-enter-active {
  transform-origin: top left;
  animation: expand-in 0.5s;
}
.expand-leave-active {
  animation: expand-in 0.5s;
  animation-direction: reverse;
  transform-origin: top left;
}

@keyframes expand-in {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  100% {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>
