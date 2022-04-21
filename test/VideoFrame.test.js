import { mount, createLocalVue } from '@vue/test-utils'
import VideoFrame from '@/components/VideoFrame.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('VideoFrame', () => {
  let store
  store = new Vuex.Store({
    state: { auth: { user: null } },
  })

  test('capitalises lift name', () => {
    const wrapper = mount(VideoFrame, {
      propsData: {
        name: 'squat',
        data: {
          weight: 100.0,
          unit: 'kg',
        },
        slug: 'john-doe',
      },
      store,
      localVue,
    })

    expect(wrapper.find('h2').text()).toBe('Squat')
  })
})
