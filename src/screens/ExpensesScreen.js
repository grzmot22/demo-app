import * as React from 'react';
import { Button, List } from 'react-native-paper';
import styled from 'styled-components/native';
import { connect } from "react-redux";
import { setCalendarDialogVisible } from "../store/expenses/actions";

  export class ExpensesScreen extends React.Component {

    render(){
      return (
        <Container>
        <StyledButton mode="contained"  onPress={() => this.props.navigation.navigate('AddExpenses')} >Add</StyledButton>
        <StyledButton mode="contained"  onPress={() => console.log("d",this.props.expenses)} >ee</StyledButton>
        <StyledList
        title="First Item"
        description="Item description"
        left={props => <List.Icon {...props} icon="cash" />}
      />
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