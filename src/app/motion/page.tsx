'use client'

import { useState } from 'react'
import { removeItem, closestItem } from '@/utils/array-utils'
import { motion, Reorder, AnimatePresence } from 'framer-motion'
import { Tab } from './Tab'
import { AddIcon } from './AddIcon'

export const allIngredients = [
  { icon: '🍅', label: 'Tomato' },
  { icon: '🥬', label: 'Lettuce' },
  { icon: '🧀', label: 'Cheese' },
  { icon: '🥕', label: 'Carrot' },
  { icon: '🍌', label: 'Banana' },
  { icon: '🫐', label: 'Blueberries' },
  { icon: '🥂', label: 'Champers?' },
]

const [tomato, lettuce, cheese] = allIngredients
export const initialTabs = [tomato, lettuce, cheese]

export interface Ingredient {
  icon: string
  label: string
}

export default function LayoutAnimation() {
  const [tabs, setTabs] = useState(initialTabs)

  const [isOn, setIsOn] = useState(false)

  const toggleSwitch = () => setIsOn(!isOn)

  const [selectedTab, setSelectedTab] = useState(tabs[0])

  const remove = (item: Ingredient) => {
    if (item === selectedTab) {
      setSelectedTab(closestItem(tabs, item))
    }

    setTabs(removeItem(tabs, item))
  }

  const add = () => {}

  return (
    <div>
      <div className="h-10 bg-gray-200"></div>
      <button
        className="toggle-container bg-blue-400"
        style={{
          ...container,
          justifyContent: 'flex-' + (isOn ? 'start' : 'end'),
        }}
        onClick={toggleSwitch}
      >
        <motion.div
          className="toggle-handle"
          style={handle}
          layout
          transition={{
            type: 'spring',
            visualDuration: 0.2,
            bounce: 0.2,
          }}
        />
      </button>
      <div className="h-10 bg-gray-200"></div>
      <nav
        style={{
          background: '#fdfdfd',
          padding: '5px 5px 0',
          borderRadius: '10px',
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottom: '1px solid #eeeeee',
          height: '44px',
          display: 'grid',
          gridTemplateColumns: '1fr 35px',
          maxWidth: '480px',
          overflow: 'hidden',
        }}
      >
        <Reorder.Group
          as="ul"
          axis="x"
          onReorder={setTabs}
          values={tabs}
          className="flex w-[420px] grow flex-nowrap items-end justify-start pr-[10px] list-none p-0 m-0 font-[Poppins] font-medium text-sm"
        >
          <AnimatePresence initial={false}>
            {tabs.map((item) => (
              <Tab
                key={item.label}
                item={item}
                isSelected={selectedTab === item}
                onClick={() => setSelectedTab(item)}
                onRemove={() => remove(item)}
              />
            ))}
          </AnimatePresence>
        </Reorder.Group>
        <motion.button
          className="h-[30px] w-[30px] cursor-pointer self-center rounded-full border-0 bg-[#eee] disabled:pointer-events-none disabled:cursor-default disabled:opacity-40"
          onClick={add}
          disabled={tabs.length === allIngredients.length}
          whileTap={{ scale: 0.9 }}
        >
          <AddIcon />
        </motion.button>
      </nav>
      <div className="h-10 bg-gray-200"></div>
    </div>
  )
}

/**
 * ==============   Styles   ================
 */

const container = {
  width: 100,
  height: 50,
  borderRadius: 50,
  cursor: 'pointer',
  display: 'flex',
  padding: 10,
}

const handle = {
  width: 30,
  height: 30,
  backgroundColor: '#9911ff',
  borderRadius: '50%',
}
