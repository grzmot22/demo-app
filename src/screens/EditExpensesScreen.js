import * as React from 'react';
import { Button, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import { connect } from "react-redux";
import { startEditExpense, startRemoveExpense } from "../store/expenses/actions";

  export class EditExpensesScreen extends React.Component {

    state = {
      description: this.props.expense.description,
      note:  this.props.expense.note,
      amount:  (this.props.expense.amount / 100).toString(),
      createdAt: this.props.expense.createdAt,
      error: ''
  };

  onSubmit = () => {
    const {description,amount,createdAt,note} = this.state;
    if(!description || !amount) {
      this.setState(() =>({error: 'Please provide description and amount.'}))
    }else {
      this.setState(() =>({error: ''}))
      this.props.startEditExpense(this.props.expense.id,{
        description: description,
        amount: parseFloat(amount, 10) * 100,
        createdAt: createdAt.valueOf(),
        note: note
    })
    this.props.navigation.navigate('Expenses');
    }
  }

  onRemove = () => {
    this.props.startRemoveExpense({id: this.props.expense.id});
   this.props.navigation.navigate('Expenses');
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
       <StyledButton mode="contained" onPress={() => this.onSubmit()} >Submit</StyledButton>
       <StyledButton mode="contained" onPress={() => this.onRemove()} >Remove</StyledButton>
       <ErrorMessage>{this.state.error}</ErrorMessage>
        </Container>
      );
    }
}

const mapStateToProps = ({ expenses },props) => ({
  expense: expenses.find((expense) => expense.id === props.route.params.expense.id)
});

const mapDispatchToProps = dispatch => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensesScreen);


const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-Content: center;
`;

const StyledButton = styled(Button)`
align-items: flex-start;
justify-content: flex-start;
margin-bottom: 10px
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