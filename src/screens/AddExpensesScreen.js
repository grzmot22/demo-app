import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import moment from 'moment';
import { connect } from "react-redux";
import { addExpense } from "../store/expenses/actions";

  export class AddExpensesScreen extends React.Component {

    state = {
      description: '',
      note:  '',
      amount:  '',
      createdAt: moment(),
      error: ''
  };

    render(){
      return (
        <Container>
        <TextField           
              placeholder={"Description"}
              onChangeText={description => this.setState({ description })}
              value={this.state.description}
              />
        <TextField   placeholder={"Note"}
              onChangeText={note => this.setState({ note })}
              value={this.state.note}
              />
       <TextField   placeholder={"Amount"}
              onChangeText={amount => this.setState({ amount })}
              value={this.state.amount}
              />
       <StyledButton mode="contained" onPress={() => this.props.addExpense({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })} >Submit</StyledButton>
        </Container>
      );
    }
}

const mapStateToProps = ({ auth, expenses, filters }) => ({
  userId: auth,
  expenses: expenses,
  selectedDate: filters.selectedDate
});

const mapDispatchToProps = dispatch => ({
  addExpense: expense => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensesScreen);


const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-Content: center;
`;

const StyledButton = styled(Button)`
align-items: flex-start;
justify-content: flex-start;
`;

const TextField = styled(TextInput)` 
width: 80%;
margin-bottom: 10px;
background-color: darkslategrey;
`;