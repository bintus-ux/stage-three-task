import React, { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card, CardBody, Stack, Box, Image } from '@chakra-ui/react'

const DragDropImages = ({ imageUrl }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: imageUrl.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners} m={2}>
      <div className='img-container'>
        <Image
          id={imageUrl.id}
          src={imageUrl.src}
          alt='image'
          boxSize='150px'
          m={4}
          className='res-image'
        />
      </div>
    </Card>
  )
}

export default DragDropImages
