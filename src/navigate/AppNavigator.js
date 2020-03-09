import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from './LoginScreen';
import Register from './Register';
import StudentHomePage from './Student';
import StudentSubjectRegister from './Student/components/subjectRegister';
import LecturerHomePage from './Lecturer';
import OpenSection from './Lecturer/components/openSection';
import StudentListSubject from './Student/components/subjects';
import StudentApprove from './Lecturer/components/studentApprove';
import ListStudentApprove from './Lecturer/components/studentApprove/components/listStudentApprove';
import OpenClass from './Lecturer/components/openClass';
import CreateSubject from './Lecturer/components/createSubject';
import Beacon from './Lecturer/components/beacon';
import CreateNewBeacon from './Lecturer/components/beacon/createNewBeacon';

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
    StudentApprove: {screen: StudentApprove},
    ListStudentApprove: {screen: ListStudentApprove},
    OpenClass: {screen: OpenClass},
    CreateSubject: {screen: CreateSubject},
    Beacon: {screen: Beacon},
    CreateNewBeacon: {screen: CreateNewBeacon},
  },
  optsNavigation,
);

const App = createAppContainer(AppNavigator);

export default App;
