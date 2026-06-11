import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { superAdmin } from '../access/superAdmin'

export const CurrentDayBoxes: CollectionConfig = {
  slug: 'currentDayBoxes',
  access: {
    create: authenticated,
    delete: superAdmin,
    read: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superAdmin') return true
      return { user: { equals: user.id } }
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'superAdmin') return true
      return { user: { equals: user.id } }
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        condition: (_, siblingData, { user }) => user?.role === 'superAdmin',
      },
      hooks: {
        beforeChange: [
          ({ req, operation, value }) => {
            if (operation === 'create' && req.user?.role !== 'superAdmin') {
              return req.user?.id
            }
            return value
          },
        ],
      },
    },
  ],
}
