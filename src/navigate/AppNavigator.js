import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from './LoginScreen';
import Register from './Register';
import StudentHomePage from './Student';
import StudentSubjectRegister from './Student/components/subjectRegister'

const AppNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Register: {screen: Register},
  StudentHomePage: {screen: StudentHomePage},
  StudentSubjectRegister: {screen: StudentSubjectRegister},
});

const App = createAppContainer(AppNavigator);

export default App;
