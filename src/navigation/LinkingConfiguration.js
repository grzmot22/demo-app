import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Expenses: {
            screens: {
              ExpensesScreen: 'Expenses',
              AddExpensesScreen: 'AddExpenses',
              EditExpensesScreen: 'EditExpenses'
            },
          },
          Places: {
            screens: {
              PlacesScreen: 'two',
            }
          },
            Settings: {
              screens: {
                SettingsScreen: 'three',
              },
            }
        },
      },
      NotFound: '*',
    },
  },
};
