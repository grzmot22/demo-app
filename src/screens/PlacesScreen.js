import * as React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import styled from 'styled-components/native';


const GooglePlacesInput = () => {

  const [place, setPlace] = React.useState("");

  return (
  <Container>
  <GoogleContainer>
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        setPlace(data.description)
        console.log(data, details.geometry);
      }}
      query={{
        key: 'AIzaSyDBR7WsjsAwYq5a01jP4j8SLKorszeyvBI',
        language: 'en',
      }}
    />
    </GoogleContainer>
    <Text>{`Your selected place: ${place}`}</Text>
  </Container>


  );
};

export default GooglePlacesInput;

const Container = styled.View`
flex:1;
height:1000px;
`;
const GoogleContainer = styled.View`
height:400px;
`;
const Text = styled.Text`
display: flex;
color: red;
margin-top: 50px;
align-items: center;
height:100%;
width: 80%;
margin-left: 30px;
`