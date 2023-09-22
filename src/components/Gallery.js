import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable'

import { Grid } from './Grid'
import { SortablePhoto } from './SortablePhotos'
import { Photo } from './Photo'

const UploadGallery = () => {
  const [items, setItems] = useState([
    'IMG_0798.JPG',
    'IMG_0824.JPG',
    'IMG_0859.JPG',
    'IMG_1946.JPG',
    'IMG_1956.JPG',
    'IMG_0779.JPG',
    'IMG_1631.JPG',
    'IMG_0836.JPG',
    'IMG_0866.JPG',
    'IMG_0909.JPG',
    'IMG_0827.JPG',
    'IMG_0847.JPG',
  ])
  const [activeId, setActiveId] = useState(null)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <Grid columns={4}>
          {items.map((url, index) => (
            <SortablePhoto key={url} url={url} index={index} />
          ))}
        </Grid>
      </SortableContext>

      <DragOverlay adjustScale={true}>
        {activeId ? (
          <Photo url={activeId} index={items.indexOf(activeId)} />
        ) : null}
      </DragOverlay>
    </DndContext>
  )

  function handleDragStart(event) {
    setActiveId(event.active.id)
  }

  function handleDragEnd(event) {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }

    setActiveId(null)
  }

  function handleDragCancel() {
    setActiveId(null)
  }
}

export default UploadGallery
