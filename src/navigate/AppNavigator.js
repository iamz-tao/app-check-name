import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from './LoginScreen';
import Register from './Register';
import StudentHomePage from './Student';
import StudentSubjectRegister from './Student/components/subjectRegister';
import LecturerHomePage from './Lecturer';
import OpenSection from './Lecturer/components/openSection';
import StudentListSubject from './Student/components/subjects';

const optsNavigation = {
  initialRouteName: 'Login',
};

const AppNavigator = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Register: {screen: Register},
    StudentHomePage: {screen: StudentHomePage},
    StudentSubjectRegister: {screen: StudentSubjectRegister},
    LecturerHomePage: {screen: LecturerHomePage},
    OpenSection: {screen: OpenSection},
    StudentListSubject: {screen: StudentListSubject},
  },
  optsNavigation,
);

const App = createAppContainer(AppNavigator);

export default App;
