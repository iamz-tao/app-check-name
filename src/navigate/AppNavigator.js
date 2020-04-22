import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from './LoginScreen';
import Register from './Register';
import ForgotPassword from './forgotPassword';
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
import ListMySubject from './Lecturer/components/mySubject';
import StudentCheckName from './Student/components/checkName';
import LecturerCloseClass from './Lecturer/components/closeClass';
import StudentInSection from './Lecturer/components/listStudents';
import TeachingHistory from './Lecturer/components/teachingHistory';
import ListStudentsCheckName from './Lecturer/components/teachingHistory/components/studentListCheck';
import StudentListCheckName from './Student/components/subjects/components/listStudentsCheck';
import UpdateProfile from './Profile';

const optsNavigation = {
  initialRouteName: 'Login',
};

const AppNavigator = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Register: {screen: Register},
    'Forgot Password': {screen: ForgotPassword},
    'Student Home Page': {screen: StudentHomePage},
    'Subject Register': {screen: StudentSubjectRegister},
    'Lecturer Home Page': {screen: LecturerHomePage},
    'Open Section': {screen: OpenSection},
    'Registered Subject': {screen: StudentListSubject},
    'Student Approve': {screen: StudentApprove},
    'List of Students': {screen: ListStudentApprove},
    'Open Class': {screen: OpenClass},
    'Create New Subject': {screen: CreateSubject},
    Beacons: {screen: Beacon},
    'Create New Beacon': {screen: CreateNewBeacon},
    'My Subjects': {screen: ListMySubject},
    'Attendance Roll': {screen: StudentCheckName},
    'Close Class': {screen: LecturerCloseClass},
    'Students in Section': {screen: StudentInSection},
    'Teaching History': {screen: TeachingHistory},
    'List of Students Attendance': {screen: ListStudentsCheckName},
    'Attendance History': {screen: StudentListCheckName},
    'Update Profile': {screen: UpdateProfile},
  },
  optsNavigation,
);

const App = createAppContainer(AppNavigator);

export default App;
