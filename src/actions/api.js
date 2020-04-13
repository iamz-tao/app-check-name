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
          "You don't have permission to access application.",
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
      Alert.alert(
        'Login failed!',
        responseJson.message,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'OK'},
        ],
        {cancelable: false},
      );
      reject(responseJson);
    }
  });
}

async function updateProfile(data) {
  const {token, dataUser} = data;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/updateUser',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token: token.token,
        },
        body: JSON.stringify({
          ...dataUser,
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

async function getProfile(params) {
  const token = params.token;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://us-central1-kpscheckin.cloudfunctions.net/api/getProfile`,
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

async function GetSubjectRegistration(data) {
  const token = data.token;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/ListRegistration',
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

async function StudentGetHistory(data) {
  const token = data.token;
  const id = data.id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://us-central1-kpscheckin.cloudfunctions.net/api/studentHistory/${id}`,
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

async function getClassCheckName(data) {
  const token = data.token;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/getClassForCheckName',
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

// Lecturer
async function GetSubjectsApprove(data) {
  const token = data.token;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/ListSectionTeacher',
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

async function GetStudentsApprove(data) {
  const token = data.token;
  const id = data.id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://us-central1-kpscheckin.cloudfunctions.net/api/ListStudentInSection/${id}`,
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

async function CreateSubject(data) {
  const token = data.token;
  const subject_code = data.subject_code;
  const subject_name = data.subject_name;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/createSubject',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          subject_code,
          subject_name,
          approved_status: 'PENDING',
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

async function ApproveStudent(data) {
  const token = data.token;
  const id = data.id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/approveStudent',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          id,
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

async function ApproveStudents(data) {
  const token = data.token;
  const id = data.id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/approveStudent',
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          id,
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

async function RejectStudent(data) {
  const token = data.token;
  const id = data.id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/rejectStudent',
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          id,
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

async function RejectStudents(data) {
  const token = data.token;
  const id = data.id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/rejectStudent',
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          id,
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

async function GetSubjectOpenSection(data) {
  const token = data.token;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/ListSubjects',
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

async function OpenSection(data) {
  const token = data.token;
  const payload = data.payload;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/subject_register',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          ...payload,
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

async function GetAllBeacon(data) {
  const token = data.token;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/listBeacon',
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

async function RegisterBeacon(params) {
  const token = params.token.token;
  const payload = params.payload;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/createBeacon',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          ...payload,
        }),
      },
    );
    const responseJson = await response.json();
    if (responseJson.status.dataStatus === 'SUCCESS') {
      resolve(responseJson);
      Alert.alert('Add Beacon Success');
    } else {
      reject(responseJson);
      Alert.alert(responseJson.message);
    }
  });
}

async function OpenClass(data) {
  const token = data.token;
  const payload = data.payload;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/openClass',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          ...payload,
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

async function CloseClass(data) {
  const token = data.token;
  const id = data.id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://us-central1-kpscheckin.cloudfunctions.net/api/closeClass/${id}`,
      {
        method: 'PUT',
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

async function GetClass(data) {
  const token = data.token;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/getClass',
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

async function GetStudentInSection(data) {
  const token = data.token;
  const payload = data.payload;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      'https://us-central1-kpscheckin.cloudfunctions.net/api/listSecStudent',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({
          ...payload,
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

async function StudentDrop(data) {
  const token = data.token;
  const id = data.id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://us-central1-kpscheckin.cloudfunctions.net/api/dropSubject/${id}`,
      {
        method: 'DELETE',
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

async function DeleteStudentFromSec(data) {
  const token = data.token;
  const id = data.id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://us-central1-kpscheckin.cloudfunctions.net/api/dropStudent/${id}`,
      {
        method: 'DELETE',
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

async function getTeacherHistory(params) {
  const token = params.token;
  const section_id = params.section_id;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://us-central1-kpscheckin.cloudfunctions.net/api/TeachHistory/${section_id}`,
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

async function getStudentChecknameInClass(params) {
  const {token, class_id} = params;
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `https://us-central1-kpscheckin.cloudfunctions.net/api/studentInClass/${class_id}`,
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
  GetSubjectsApprove,
  CreateSubject,
  GetStudentsApprove,
  ApproveStudent,
  ApproveStudents,
  RejectStudent,
  RejectStudents,
  GetSubjectOpenSection,
  OpenSection,
  GetAllBeacon,
  GetSubjectRegistration,
  RegisterBeacon,
  OpenClass,
  GetClass,
  CloseClass,
  GetStudentInSection,
  DeleteStudentFromSec,
  StudentDrop,
  getTeacherHistory,
  updateProfile,
  getProfile,
  StudentGetHistory,
  getClassCheckName,
  getStudentChecknameInClass,
};
