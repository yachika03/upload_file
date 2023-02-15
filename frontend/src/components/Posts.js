import {
  Box,
  Button,
  CircularProgress,
  AspectRatio ,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import useMutation from '../hooks/useMutation';
import useQuery from '../hooks/useQuery';

const validFileTypes = ['video/mp4'];
const URL = '/video';

const ErrorText = ({ children, ...props }) => (
  <Text fontSize="lg" color="red.300" {...props}>
    {children}
  </Text>
);

const Posts = () => {
  const [refetch, setRefetch] = useState(0);
  const {
    mutate: uploadvideo,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL });

  const {
    data: videoUrls = [],
    isLoading: videoLoading,
    error: fetchError,
  } = useQuery(URL, refetch);

  const [error, setError] = useState('');

  const handleUpload = async e => {
    const file = e.target.files[0];

    if (!validFileTypes.find(type => type === file.type)) {
      setError('File must be in JPG/PNG format');
      return;
    }

    const form = new FormData();
    form.append('video', file);

    await uploadvideo(form);
    setTimeout(() => {
      setRefetch(s => s + 1);
    }, 1000);
  };

  return (
    <Box mt={6}>
      <Input id="videoInput" type="file" hidden onChange={handleUpload} />
      <Button
        as="label"
        htmlFor="videoInput"
        colorScheme="blue"
        variant="outline"
        mb={4}
        cursor="pointer"
        isLoading={uploading}
      >
        Upload
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
      {uploadError && <ErrorText>{uploadError}</ErrorText>}

      <Text textAlign="left" mb={4}>
        Posts
      </Text>
      {videoLoading && (
        <CircularProgress
          color="gray.600"
          trackColor="blue.300"
          size={7}
          thickness={10}
          isIndeterminate
        />
      )}
      {fetchError && (
        <ErrorText textAlign="left">Failed to load video</ErrorText>
      )}
      {!fetchError && videoUrls?.length === 0 && (
        <Text textAlign="left" fontSize="lg" color="gray.500">
          No video found
        </Text>
      )}

      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {videoUrls?.length > 0 &&
          videoUrls.map(url => (
            <AspectRatio borderRadius={5} src={url} alt="video" key={url} />
          ))}
      </SimpleGrid>
    </Box>
  );
};
export default Posts;
