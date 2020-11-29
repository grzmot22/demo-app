import * as React from 'react';
import { Button, Text } from 'react-native-paper';
import styled from 'styled-components/native';
import moment from 'moment';
import { connect } from "react-redux";
import { setCalendarDialogVisible } from "../store/expenses/actions";

  export class ExpensesScreen extends React.Component {

    state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      error: ''
  };

    render(){
      return (
        <Container>
        <TextField             
              placeholder={""}
              onChangeText={username => this.setState({ username })}
              value={this.state.username}/>
        <TextField/>
       <StyledButton mode="contained" onPress={() => console.log('Pressed')} >Submit</StyledButton>
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
  setCalendarDialogVisible: visible => dispatch(setCalendarDialogVisible(visible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesScreen);


const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-Content: center;
`;

const StyledButton = styled(Button)`
align-items: flex-start;
justify-content: flex-start;
`;

const TextField = styled(Text)`::after

`