import type { Block } from 'payload'

export const CurrentDay: Block = {
  slug: 'currentDay',
  interfaceName: 'CurrentDayBlock',
  fields: [
    {
      name: 'splitDays',
      type: 'relationship',
      relationTo: 'currentDayBoxes',
      hasMany: true,
    },
    // {
    //   name: 'code',
    //   type: 'code',
    //   label: false,
    //   required: true,
    // },
  ],
}
