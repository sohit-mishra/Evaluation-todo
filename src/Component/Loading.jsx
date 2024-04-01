import { Box, Flex } from '@chakra-ui/react'
import { SpinnerIcon } from '@chakra-ui/icons'
export default function Loading() {
  return (
    <Box>
      <Flex justifyContent="center" alignItems="Center" height="100vh" fontSize="32"><SpinnerIcon transform="rotate(45deg)" />
      </Flex>
    </Box>
  )
}
