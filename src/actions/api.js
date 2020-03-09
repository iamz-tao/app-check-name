import {StackActions} from '@react-navigation/native';
import NavigationServices from '../navigate/NavigationServices';

import {Alert} from 'react-native';

// Auth
async function Login(data) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/login',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      },
    );

    const responseJson = await response.json();
    if (responseJson.message === 'PASS') {
      resolve(responseJson);
      if (responseJson.data.user.role === 'PROFESSOR') {
        NavigationServices.navigate('LecturerHomePage');
      } else if (responseJson.data.user.role === 'NISIT') {
        NavigationServices.navigate('StudentHomePage');
      } else {
        Alert.alert(
          'Login failed!',
          '	Email or password is not valid.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK'},
          ],
          {cancelable: false},
        );
      }
    } else {
      reject(responseJson);
    }
  });
}

// Year
async function GetCurrentYear(data) {
  const token = data.token;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/getCurrentYear',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
      },
    );
    const responseJson = await response.json();
    if (responseJson.status.dataStatus === 'SUCCESS') {
      resolve(responseJson);
    } else {
      reject(responseJson);
    }
  });
}

// Student
async function StudentGetSubjectRegister(data) {
  const token = data.token;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/getSubjectByStudent',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
      },
    );
    const responseJson = await response.json();
    if (responseJson.status.dataStatus === 'SUCCESS') {
      resolve(responseJson);
    } else {
      reject(responseJson);
    }
  });
}

async function RegisterSubject(data) {
  const token = data.token;
  const section_id = data.section_id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/subjectRegister',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          section_id,
        }),
      },
    );
    const responseJson = await response.json();

    if (responseJson.status.dataStatus === 'SUCCESS') {
      resolve(responseJson);
    } else {
      reject(responseJson);
    }
  });
}

async function GetStudentApprove(data) {
  const token = data.token;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/getSubjects',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
      },
    );
    const responseJson = await response.json();
    if (responseJson.status.dataStatus === 'SUCCESS') {
      resolve(responseJson);
    } else {
      reject(responseJson);
    }
  });
}

export const Api = {
  Login,
  StudentGetSubjectRegister,
  RegisterSubject,
  GetCurrentYear,
  GetStudentApprove,
};
