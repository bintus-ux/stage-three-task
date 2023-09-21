import React, { useEffect, useState } from 'react'
import {
  Heading,
  Flex,
  Button,
  Box,
  Image,
  Stack,
  Input,
} from '@chakra-ui/react'
import { Skeleton, SkeletonText } from '@chakra-ui/react'
import DragDropImages from './DragDropImages'
import { auth } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [signoutIsLoading, setSignoutIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = () => {
    const results = imageUrls.filter((image) => image.id == searchTerm)
    setSearchResults(results)
  }

  const navigate = useNavigate()

  const [imageUrls, setImageUrls] = useState([
    {
      id: 1,
      src: 'IMG_0829.JPG',
    },
    {
      id: 2,
      src: 'IMG_0830.JPG',
    },
    {
      id: 3,
      src: 'IMG_0831.JPG',
    },
    {
      id: 4,
      src: 'IMG_0832.JPG',
    },
    {
      id: 5,
      src: 'IMG_0833.JPG',
    },
    {
      id: 6,
      src: 'IMG_0834.JPG',
    },
    {
      id: 7,
      src: 'IMG_0835.JPG',
    },
    {
      id: 8,
      src: 'IMG_0836.JPG',
    },
    {
      id: 9,
      src: 'IMG_0837.JPG',
    },
    {
      id: 10,
      src: 'IMG_0838.JPG',
    },
    {
      id: 11,
      src: 'IMG_0839.JPG',
    },
    {
      id: 12,
      src: 'IMG_0840.JPG',
    },
    {
      id: 13,
      src: 'IMG_0841.JPG',
    },
    {
      id: 14,
      src: 'IMG_0842.JPG',
    },
    {
      id: 15,
      src: 'IMG_0843.JPG',
    },
  ])

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      listen()
    }
  }, [])

  const userSignOut = () => {
    setSignoutIsLoading(true)

    setTimeout(() => {
      setSignoutIsLoading(false)
    }, 2000)
    signOut(auth)
      .then(() => {
        console.log('Signed out')

        navigate('/')
      })
      .catch((error) => console.log(error))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id === over.id) {
      return
    }
    setImageUrls((items) => {
      const activeIndex = items.findIndex((item) => item.id === active.id)
      const overIndex = items.findIndex((item) => item.id === over.id)

      return arrayMove(items, activeIndex, overIndex)
    })
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className='gallery-wrapper'>
        <div className='gallery-content'>
          {isLoading ? (
            <>
              <Skeleton height='200px' my='2' />
              <SkeletonText mt='4' noOfLines={5} spacing='4' />
            </>
          ) : (
            <>
              <Heading size='lg' fontSize='50px' color='red.500' p={2}>
                Gallery
              </Heading>
              <Box p={4}>
                <Stack direction='row' spacing={2}>
                  <Input
                    type='text'
                    placeholder='Search by ID'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button colorScheme='teal' onClick={handleSearch}>
                    Search
                  </Button>
                </Stack>
              </Box>
              <ul>
                {searchResults.map((result) => (
                  <Image
                    id={result.id}
                    src={result.src}
                    alt='image'
                    boxSize='150px'
                    m={2}
                  />
                ))}
              </ul>
              {authUser ? (
                <>
                  <Flex
                    flexWrap='wrap'
                    justifyContent='center'
                    className='img-container'
                    alignItems='center'>
                    <SortableContext
                      items={imageUrls}
                      strategy={rectSortingStrategy}>
                      {imageUrls.map((imageUrl) => (
                        <Box
                          display='flex'
                          justifyContent='center'
                          alignItems='center'
                          key={imageUrl.id}>
                          <DragDropImages imageUrl={imageUrl} />
                        </Box>
                      ))}
                    </SortableContext>
                  </Flex>
                  <Button
                    isLoading={signoutIsLoading}
                    loadingText='Signing out...'
                    color='red.500'
                    mt={5}
                    onClick={userSignOut}>
                    Sign out
                  </Button>
                </>
              ) : (
                <p>Signed out</p>
              )}
            </>
          )}
        </div>
      </div>
    </DndContext>
  )
}

export default AuthDetails
