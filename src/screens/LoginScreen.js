import * as React from 'react';
import { Button, List } from 'react-native-paper';
import styled from 'styled-components/native';
import { connect } from "react-redux";
import { signIn } from "../store/auth/actions";


  export class LoginScreen extends React.Component {

    render(){
      return (
        <Container>
        <StyledButton mode="contained"  onPress={() => this.props.signIn()} >Login with Google</StyledButton>
        </Container>
      );
    }
}

const mapStateToProps = ({ auth, expenses, filters }) => ({
  userId: auth.userId,
  expenses: expenses,
  selectedDate: filters.selectedDate
});

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch(signIn()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);


const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-Content: center;
`;

const StyledButton = styled(Button)`
align-items: flex-start;
justify-content: flex-start;
`;

const StyledList = styled(List.Item)`
display:flex;
align-items: flex-start;
justify-content: flex-start;
color: white;
`;