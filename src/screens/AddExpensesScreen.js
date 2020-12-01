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
  
    onSubmit = () => {
      const {description,amount,createdAt,note} = this.state;
      if(!description || !amount) {
        this.setState(() =>({error: 'Please provide description and amount.'}))
      }else {
        this.setState(() =>({error: ''}))
        this.props.addExpense({
          description: description,
          amount: parseFloat(amount, 10) * 100,
          createdAt: createdAt.valueOf(),
          note: note
      })
      this.props.navigation.navigate('Expenses');
      }
    }

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
       <StyledButton mode="contained" onPress={() => this.onSubmit()} >Submit</StyledButton>
       <ErrorMessage>{this.state.error}</ErrorMessage>
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

const ErrorMessage = styled.Text`
color: red;
margin-top: 10px;
height:20px;
width: 80%;
margin-left: 30px;
`