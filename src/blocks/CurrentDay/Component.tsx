import { CurrentDayBlock, CurrentDayBox } from '@/payload-types'

type SplitDays = NonNullable<CurrentDayBlock['splitDays']>
type SplitDay = Extract<SplitDays[number], CurrentDayBox>
type CheckboxProps = Pick<SplitDay, 'title' | 'status'>

const Checkbox = ({ title, status }: CheckboxProps) => {
  return (
    <div className="flex gap-x-2">
      <div>{title}</div>
      <div>{status}</div>
      <input type="checkbox" />
    </div>
  )
}

export default function CurrentDay({ splitDays }: CurrentDayBlock) {
  return (
    <div className="container">
      <div>Current Day</div>
      <div>
        {splitDays?.map((split) => {
          if (typeof split === 'number') return null
          return <Checkbox key={split.id} title={split.title} status={split.status} />
        })}
      </div>
    </div>
  )
}
