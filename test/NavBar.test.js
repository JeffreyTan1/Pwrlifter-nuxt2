import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import NavBar from '@/components/NavBar.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('NavBar', () => {
  let store

  store = new Vuex.Store({
    state: { auth: { user: null } },
  })

  test('Displays login and signup where there is no user', () => {
    const wrapper = mount(NavBar, { store, localVue })
    expect(wrapper.findAll('a').at(0).text()).toBe('Login')
    expect(wrapper.findAll('a').at(1).text()).toBe('Signup')
  })
})
