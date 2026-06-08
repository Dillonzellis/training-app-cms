import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const CurrentDayBoxes: CollectionConfig = {
  slug: 'currentDayBoxes',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
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
    slugField({
      position: undefined,
    }),
  ],
}
