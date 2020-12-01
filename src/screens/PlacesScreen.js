import * as React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styled from 'styled-components/native';

export default function PlacesScreen() {
  return (
    <Container>
   <TextField
        placeholder="Search"
        query={{
          key: "AIzaSyDBR7WsjsAwYq5a01jP4j8SLKorszeyvBI",
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
    </Container>
  );
}



const Container = styled.View`
`;



const TextField = styled(GooglePlacesAutocomplete)` 
width: 100px;
margin-bottom: 10px;
`;