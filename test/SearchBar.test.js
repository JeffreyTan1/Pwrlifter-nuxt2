import { mount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'

describe('SearchBar', () => {
  test('handles input', async () => {
    const wrapper = mount(SearchBar)
    await wrapper.find('input').setValue('')
    expect(wrapper.find('input').text()).toBe('')
  })
})
