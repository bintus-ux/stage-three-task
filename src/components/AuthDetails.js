import React, { useEffect, useState } from 'react'
import { Heading, Button, Box, Image, Stack, Input } from '@chakra-ui/react'
import { Skeleton, SkeletonText } from '@chakra-ui/react'
import { auth } from '../firebase'
import UploadGallery from './Gallery'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [signoutIsLoading, setSignoutIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const items = [
    {
      tag: 'cap',
      src: 'IMG_0798.JPG',
    },
    {
      tag: 'air jordan',
      src: 'IMG_0824.JPG',
    },
    {
      tag: 'carmo',
      src: 'IMG_0859.JPG',
    },
    {
      tag: 'sneaker',
      src: 'IMG_1946.JPG',
    },
    {
      tag: 'knitwear',
      src: 'IMG_1956.JPG',
    },
    {
      tag: 'LA cap',
      src: 'IMG_0779.JPG',
    },
    {
      tag: 'jacket',
      src: 'IMG_1631.JPG',
    },
    {
      tag: 'hoodie',
      src: 'IMG_0836.JPG',
    },
    {
      tag: 'native',
      src: 'IMG_0866.JPG',
    },
    {
      tag: 'set',
      src: 'IMG_0909.JPG',
    },
    {
      tag: 'versace slipper',
      src: 'IMG_0827.JPG',
    },
    {
      tag: 'tee',
      src: 'IMG_0847.JPG',
    },
  ]

  const handleSearch = () => {
    const results = items.filter((image) => image.tag == searchTerm)
    setSearchResults(results)
  }

  const navigate = useNavigate()

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

  return (
    <div className='gallery-wrapper'>
      <div className='gallery-content'>
        {isLoading ? (
          <>
            <Skeleton
              height='50vh'
              width='250px'
              style={{ backgroundColor: 'white' }}
            />
            <SkeletonText
              style={{ backgroundColor: 'white' }}
              mt='4'
              noOfLines={5}
              spacing='4'
            />
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
                <UploadGallery />
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
  )
}

export default AuthDetails
