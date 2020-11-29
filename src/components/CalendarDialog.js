import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Portal, Dialog } from "react-native-paper";
import styled from "styled-components/native";
import { CalendarList } from "react-native-calendars";
import { setCalendarDialogVisible } from "../store/expenses/actions";
import { Button } from 'react-native-paper';

export class CalendarDialog extends React.Component {
  state = {
    tempSelectedDate: moment()
  };

  componentDidMount() {
    this.setState({ tempSelectedDate: moment(this.props.selectedDate) });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.selectedDate !== this.props.selectedDate)
      this.setState({ tempSelectedDate: moment(this.props.selectedDate) });
  }
  hideCalendarDialog = () => this.props.setCalendarDialogVisible(false);

  getDisabledDays = () => {
    let result = {};
    const endDate = moment().endOf("month");
    const date = moment().add(1, "day");

    while (date.isSameOrBefore(endDate)) {
      result = {
        ...result,
        [date.format("YYYY-MM-DD")]: { disabled: true, disableTouchEvent: true }
      };
      date.add(1, "day");
    }
    return result;
  };

  onDayPress = day => {
    if (!moment(day.dateString).isAfter(moment(), "day")) {
      this.setState({ tempSelectedDate: moment(day.dateString) });
    }
  };

  render() {
    return (
      <Portal>
        <Container
          visible={this.props.calendarDialogVisible}
          onDismiss={() => {
            this.setState({
              tempSelectedDate: moment(this.props.selectedDate)
            });
            this.hideCalendarDialog();
          }}
        >
          <Title>Select date</Title>
          <Dialog.Content>
            <CalendarList
              lastScrollRange={24}
              futureScrollRange={0}
              calendarWidth={wp("75%")}
              style={{
                height: 370
              }}
              selected={this.state.tempSelectedDate}
              onDayPress={day => this.onDayPress(day)}
              markedDates={{
                [this.state.tempSelectedDate.format("YYYY-MM-DD")]: {
                  selected: true,
                  disableTouchEvent: true
                },
                ...this.getDisabledDays()
              }}
            />
          </Dialog.Content>
          <Button
            mode="contained"
            onPress={() => {
              this.hideCalendarDialog();
              this.props.setSelectedDate(this.state.tempSelectedDate);
            }}
          >
          Select</Button>
        </Container>
      </Portal>
    );
  }
}

const mapStateToProps = state => ({
  calendarDialogVisible: state.expenses.calendarDialogVisible
});

const mapDispatchToProps = dispatch => ({
  setCalendarDialogVisible: visible => dispatch(setCalendarDialogVisible(visible)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDialog);

const Container = styled(Dialog)`
  background-color: ${ useColorScheme === 'dark' ? "black": "white"};
`;

const Title = styled(Dialog.Title)`
  align-self: center;
  font-weight: normal;
  font-size: 18px;
`;


