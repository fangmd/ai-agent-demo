import * as React from 'react'
import { motion, Reorder } from 'framer-motion'
import { Ingredient } from './page'
import { CloseIcon } from './CloseIcon'
import clsx from 'clsx'

interface Props {
  item: Ingredient
  isSelected: boolean
  onClick: () => void
  onRemove: () => void
}

export const Tab = ({ item, onClick, onRemove, isSelected }: Props) => {
  return (
    <Reorder.Item
      value={item}
      id={item.label}
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        backgroundColor: isSelected ? '#f3f3f3' : '#fff',
        y: 0,
        transition: { duration: 0.15 },
      }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      whileDrag={{ backgroundColor: '#e3e3e3' }}
      className={clsx(isSelected ? 'selected' : '', 'm-0 list-none p-0 font-[Poppins] text-sm font-medium')}
      onPointerDown={onClick}
    >
      <motion.span layout="position">{`${item.icon} ${item.label}`}</motion.span>
      <motion.div layout className="absolute inset-y-0 right-[10px] flex flex-shrink-0 items-center justify-end">
        <motion.button
          onPointerDown={(event) => {
            event.stopPropagation()
            onRemove()
          }}
          initial={false}
          animate={{ backgroundColor: isSelected ? '#e3e3e3' : '#fff' }}
        >
          <CloseIcon />
        </motion.button>
      </motion.div>
    </Reorder.Item>
  )
}
