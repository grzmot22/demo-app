import * as React from 'react';
import { Button, List, Text } from 'react-native-paper';
import styled from 'styled-components/native';
import numeral from 'numeral';
import { connect } from "react-redux";

  export class ExpensesScreen extends React.Component {
    
    render()
    {
      return (
        <Container>
        <StyledButton mode="contained"  onPress={() => this.props.navigation.navigate('AddExpenses')} >Add</StyledButton>
       {this.props.expenses.length !== 0 ? this.props.expenses.map((expense, i)=> (
         <StyledList
         key={i}
        title={expense ? expense.description : ""}
        description={expense ? `${numeral(expense.amount / 100).format('$0,0.00')} ${expense.note}`: ""}
        onPress={() => {this.props.navigation.navigate('EditExpenses', { expense: expense })}}
        left={props => <List.Icon {...props} icon="cash" />}
      />)): <StyledText>No Expenses</StyledText>}
        </Container>
      );
    }
}

const mapStateToProps = ({ auth, expenses, filters }) => ({
  userId: auth.userId,
  expenses: expenses,
  selectedDate: filters.selectedDate
});


export default connect(mapStateToProps)(ExpensesScreen);


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
const StyledText = styled(Text)`
width:100%;
text-align: center;
margin-top:10px;
`