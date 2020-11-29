import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Expenses: {
            screens: {
              ExpensesScreen: 'one',
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
