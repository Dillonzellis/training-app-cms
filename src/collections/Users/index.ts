import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { superAdmin } from '../../access/superAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: superAdmin,
    delete: superAdmin,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Super Admin', value: 'superAdmin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
      access: {
        update: ({ req: { user } }) => user?.role === 'superAdmin',
      },

    },
  ],
  timestamps: true,
}
