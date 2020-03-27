import { mount } from '@vue/test-utils'
import KTable, { defaultSorter } from '@/KTable/KTable'

const options = {
  headers: [
    { label: 'Name', key: 'name', sortable: true },
    { label: 'ID', key: 'id' },
    { label: 'Enabled', key: 'enabled' },
    { key: 'actions', hideLabel: true }
  ],
  data: [
    {
      name: 'Basic Auth',
      id: '517526354743085',
      enabled: 'true'
    },
    {
      name: 'Website Desktop',
      id: '328027447731198',
      enabled: 'false'
    },
    {
      name: 'Android App',
      id: '405383051040955',
      enabled: 'true'
    }
  ]
}

describe('KTable', () => {
  describe('default', () => {
    it('renders link in action slot', () => {
      const wrapper = mount(KTable, {
        propsData: {
          options
        },
        scopedSlots: {
          actions: '<a href="#" slot-scope="actions">Link</a>'
        }
      })

      const actions = wrapper.findAll('.k-table td:last-of-type > *')

      expect(actions.at(0).is('a')).toBe(true)
      expect(actions.at(1).is('a')).toBe(true)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('has hover class when passed', () => {
      const wrapper = mount(KTable, {
        propsData: {
          options,
          hasHover: true
        }
      })

      expect(wrapper.classes()).toContain('has-hover')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('has small class when passed', () => {
      const wrapper = mount(KTable, {
        propsData: {
          options,
          isSmall: true
        }
      })

      expect(wrapper.classes()).toContain('is-small')
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('sorting', () => {
    it('should have sortable class when passed', () => {
      const wrapper = mount(KTable, {
        propsData: {
          options
        }
      })

      const actions = wrapper.findAll('.k-table th')

      expect(actions.at(0).classes()).toContain('sortable')
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('defaultSorter(): sorts the items by string', () => {
      const items = [
        {
          custom_id: '1234',
          id: '410ecd35-696e-4e7a-ad35-c69bd4e14cbb',
          username: 'henry'
        }, {
          custom_id: '1345',
          id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb3',
          username: 'bobby'
        }, {
          custom_id: '13445',
          id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb4',
          username: 'zach'
        }
      ]

      expect(items[0].username).toEqual('henry')

      let { previousKey: sortKey1, sortOrder: sortOrder1 } = defaultSorter('username', '', 'ascending', items)

      expect(items[0].username).toEqual('bobby')
      expect(sortKey1).toEqual('username')
      expect(sortOrder1).toEqual('ascending')

      let { previousKey: sortKey2, sortOrder: sortOrder2 } = defaultSorter('username', 'username', sortOrder1, items)

      expect(items[0].username).toEqual('zach')
      expect(sortKey2).toEqual('username')
      expect(sortOrder2).toEqual('descending')
    })

    it('defaultSorter(): sorts the items by number', () => {
      const items = [
        {
          custom_id: 1234,
          id: '410ecd35-696e-4e7a-ad35-c69bd4e14cbb',
          username: 'henry'
        }, {
          custom_id: 145,
          id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb3',
          username: 'bobby'
        }, {
          custom_id: 13445,
          id: '410ecd35-696e-4e7a-ad35-c69bd4e14cb4',
          username: 'zach'
        }
      ]

      expect(items[0].username).toEqual('henry')
      expect(items[0].custom_id).toEqual(1234)

      let { previousKey: sortKey1, sortOrder: sortOrder1 } = defaultSorter('custom_id', '', 'ascending', items)

      expect(items[0].username).toEqual('bobby')
      expect(items[0].custom_id).toEqual(145)
      expect(sortKey1).toEqual('custom_id')
      expect(sortOrder1).toEqual('ascending')

      let { previousKey: sortKey2, sortOrder: sortOrder2 } = defaultSorter('custom_id', 'custom_id', sortOrder1, items)

      expect(items[0].username).toEqual('zach')
      expect(items[0].custom_id).toEqual(13445)
      expect(sortKey2).toEqual('custom_id')
      expect(sortOrder2).toEqual('descending')
    })
  })

  describe('events', () => {
    it('@row:event', () => {
      const evtTrigger = jest.fn()
      const wrapper = mount(KTable, {
        attachToDocument: true,
        propsData: {
          options
        },
        listeners: {
          [`row:click`]: evtTrigger,
          [`row:mouseover`]: evtTrigger
        }
      })

      const bodyRow = wrapper.find('.k-table tbody tr')

      bodyRow.trigger('click')
      bodyRow.trigger('mouseover')
      expect(evtTrigger).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'click' }), options.data[0], 'row')
      expect(evtTrigger).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'mouseover' }), options.data[0], 'row')
    })

    it('@cell:event', () => {
      const evtTrigger = jest.fn()
      const wrapper = mount(KTable, {
        attachToDocument: true,
        propsData: { options },
        listeners: {
          [`cell:click`]: evtTrigger,
          [`cell:mouseover`]: evtTrigger,
          [`cell:mouseout`]: evtTrigger
        }
      })

      const bodyCell1 = wrapper.find('.k-table tbody td')
      const bodyCell2 = wrapper.find('.k-table tbody td:nth-child(2)')

      bodyCell1.trigger('click')
      bodyCell1.trigger('mouseover')
      bodyCell2.trigger('mouseout')
      expect(evtTrigger).toHaveBeenNthCalledWith(1, expect.objectContaining({ type: 'click' }), 'Basic Auth', 'cell')
      expect(evtTrigger).toHaveBeenNthCalledWith(2, expect.objectContaining({ type: 'mouseover' }), 'Basic Auth', 'cell')
      expect(evtTrigger).toHaveBeenNthCalledWith(3, expect.objectContaining({ type: 'mouseout' }), '517526354743085', 'cell')
    })
  })
})
