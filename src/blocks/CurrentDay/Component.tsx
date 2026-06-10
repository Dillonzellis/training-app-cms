'use client'

import { CurrentDayBlock, CurrentDayBox } from '@/payload-types'
import { useState } from 'react'

type SplitDays = NonNullable<CurrentDayBlock['splitDays']>
type SplitDay = Extract<SplitDays[number], CurrentDayBox>
type CheckboxProps = Pick<SplitDay, 'title' | 'status' | 'id'> & {
  onChange: (id: number, status: boolean) => void
}

const Checkbox = ({ title, status, id, onChange }: CheckboxProps) => {
  return (
    <div className="flex gap-x-2">
      <div>{title}</div>
      <input
        type="checkbox"
        defaultChecked={status}
        onChange={(e) => onChange(id, e.target.checked)}
      />
    </div>
  )
}

export default function CurrentDay({ splitDays }: CurrentDayBlock) {
  const [checked, setChecked] = useState(() =>
    Object.fromEntries(
      (splitDays ?? [])
        .filter((split): split is SplitDay => typeof split !== 'number')
        .map((split) => [split.id, split.status]),
    ),
  )

  console.log(checked, setChecked)

  return (
    <div className="container">
      <div>Current Day</div>
      <div>
        {splitDays?.map((split) => {
          if (typeof split === 'number') return null
          return (
            <Checkbox
              key={split.id}
              id={split.id}
              title={split.title}
              status={checked[split.id]}
              onChange={(id, value) => setChecked((prev) => ({ ...prev, [id]: value }))}
            />
          )
        })}
      </div>
    </div>
  )
}
