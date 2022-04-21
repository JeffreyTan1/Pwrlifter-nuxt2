import { mount } from '@vue/test-utils'
import FollowCard from '@/components/FollowCard.vue'

describe('FollowCard', () => {
  test('displays name', () => {
    const wrapper = mount(FollowCard, {
      propsData: {
        name: 'John Doe',
      },
    })

    expect(wrapper.find('h2').text()).toBe('John Doe')
  })
})
