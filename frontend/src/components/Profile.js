import { Box, Image,  VStack } from '@chakra-ui/react';
import Posts from './Posts';
import download from "./download.png"
const Profile = () => {
  return (
    <Box>
      <VStack p={7} m="auto" width="fit-content" borderRadius={6} bg="gray.700">
        <Image
          borderRadius="full"
          boxSize="80px"
          src={download}
          alt="Profile"
        />
       
      </VStack>

      <Posts />
    </Box>
  );
};
export default Profile;
