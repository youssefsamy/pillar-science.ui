import Vue from 'vue'
import Home from '@/components/Home'
import router from '@/router'

describe('Home.vue', () => {
  it('Should render following text', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor({router}).$mount()
    expect(vm.$el.querySelector('h1.title').textContent)
      .to.equal('Home page')
  })
})
