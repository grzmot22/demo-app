import * as React from 'react';
import { Button, List, Text } from 'react-native-paper';
import styled from 'styled-components/native';
import numeral from 'numeral';
import { connect } from "react-redux";
import { setCalendarDialogVisible } from "../store/expenses/actions";

  export class ExpensesScreen extends React.Component {
    
    render()
    {
      return (
        <Container>
        <StyledButton mode="contained"  onPress={() => this.props.navigation.navigate('AddExpenses')} >Add</StyledButton>
       {this.props.expenses.length !== 0 ? this.props.expenses.map((expense)=> (
         <StyledList
        title={expense.description}
        description={`${numeral(expense.amount / 100).format('$0,0.00')} ${expense.note}`}
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