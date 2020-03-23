import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_SUBJECT_REGIS_STD,
  SET_SUBJECT_REGIS_STD,
  REGISTER_SUBJECT_REQUEST,
  REGISTER_SUBJECT_REQUEST_SUCCESS,
  REGISTER_SUBJECT_REQUEST_FAILED,
  GET_CURRENT_YEAR,
  SET_CURRENT_YEAR,
  GET_STUDENT_APPROVE,
  SET_STUDENT_APPROVE,
  CREATE_SUBJECT,
  CREATE_SUBJECT_FAILED,
  CREATE_SUBJECT_SUCCESS,
  LOGOUT,
  GET_SUBJECT_TEACH,
  SET_SUBJECT_TEACH,
  APPROVE_STUDENT,
  APPROVE_STUDENTS,
  APPROVE_STUDENT_SUCCESS,
  APPROVE_STUDENTS_SUCCESS,
  REJECT_STUDENTS_SUCCESS,
  REJECT_STUDENT,
  REJECT_STUDENTS,
  REJECT_STUDENT_SUCCESS,
  REQUEST_ERROR,
  GET_SUBJECT_OPEN_SECTION,
  SET_SUBJECT_OPEN_SECTION,
  OPEN_SECTION,
  OPEN_SECTION_SUCCESS,
  OPEN_SECTION_FAILED,
  GET_ALL_BEACON,
  SET_ALL_BEACON,
  GET_SUBJECT_REGISTRATION,
  SET_SUBJECT_REGISTRATION,
  REGISTER_BEACON,
  REGISTER_BEACON_SUCCESS,
  REGISTER_BEACON_FAILURE,
  OPEN_CLASS,
  OPEN_CLASS_FAILED,
  OPEN_CLASS_SUCCESS,
  GET_CLASS,
  GET_CLASS_SUCCESS,
  GET_CLASS_FAILED,
  CLOSE_CLASS,
  CLOSE_CLASS_SUCCESS,
  CHECKNAME,
  CHECKNAME_SUCCESS,
  CHECKNAME_FAILURE,
  GET_STUDENT_IN_SECTION,
  SET_STUDENT_IN_SECTION,
} from '../constant';
import {Api} from './api';
import NavigationServices from '../navigate/NavigationServices';

export const login = () => ({
  type: LOGIN,
});

export const login_success = payload => ({
  payload,
  type: LOGIN_SUCCESS,
});

export const login_failure = payload => ({
  payload,
  type: LOGIN_FAILURE,
});

export const requestError = payload => ({
  payload,
  type: REQUEST_ERROR,
});

export const studentGetSubjectRegis = payload => ({
  payload,
  type: GET_SUBJECT_REGIS_STD,
});

export const studentSetSubjectRegis = payload => ({
  payload,
  type: SET_SUBJECT_REGIS_STD,
});

export const registerSubject = payload => ({
  payload,
  type: REGISTER_SUBJECT_REQUEST,
});

export const registerSubjectSuccess = payload => ({
  payload,
  type: REGISTER_SUBJECT_REQUEST_SUCCESS,
});

export const registerSubjectFailed = payload => ({
  payload,
  type: REGISTER_SUBJECT_REQUEST_FAILED,
});

export const getCurrentYear = payload => ({
  payload,
  type: GET_CURRENT_YEAR,
});

export const setCurrentYear = payload => ({
  payload,
  type: SET_CURRENT_YEAR,
});

export const getStudentsApprove = payload => ({
  payload,
  type: GET_STUDENT_APPROVE,
});

export const setStudentsApprove = payload => ({
  payload,
  type: SET_STUDENT_APPROVE,
});

export const getSubjectsApprove = payload => ({
  payload,
  type: GET_SUBJECT_TEACH,
});

export const setSubjectsApprove = payload => ({
  payload,
  type: SET_SUBJECT_TEACH,
});

export const createSubject = payload => ({
  payload,
  type: CREATE_SUBJECT,
});

export const createSubjectSuccess = payload => ({
  payload,
  type: CREATE_SUBJECT_SUCCESS,
});

export const createSubjectFailed = payload => ({
  payload,
  type: CREATE_SUBJECT_FAILED,
});

export const logout = payload => ({
  payload,
  type: LOGOUT,
});

export const approveStudent = payload => ({
  payload,
  type: APPROVE_STUDENT,
});

export const approveStudents = payload => ({
  payload,
  type: APPROVE_STUDENTS,
});

export const approveStudentSuccess = payload => ({
  payload,
  type: APPROVE_STUDENT_SUCCESS,
});

export const approveStudentsSuccess = payload => ({
  payload,
  type: APPROVE_STUDENTS_SUCCESS,
});

export const rejectStudent = payload => ({
  payload,
  type: REJECT_STUDENT,
});

export const rejectStudents = payload => ({
  payload,
  type: REJECT_STUDENTS,
});


export const rejectStudentSuccess = payload => ({
  payload,
  type: REJECT_STUDENT_SUCCESS,
});

export const rejectStudentsSuccess = payload => ({
  payload,
  type: REJECT_STUDENTS_SUCCESS,
});

export const getSubjectOpenSection = payload => ({
  payload,
  type: GET_SUBJECT_OPEN_SECTION,
});

export const setSubjectOpenSection = payload => ({
  payload,
  type: SET_SUBJECT_OPEN_SECTION,
});

export const openSection = payload => ({
  payload,
  type: OPEN_SECTION,
});

export const openSectionSuccess = payload => ({
  payload,
  type: OPEN_SECTION_SUCCESS,
});

export const openSectionFailed = payload => ({
  payload,
  type: OPEN_SECTION_FAILED,
});

export const getAllBeacon = payload => ({
  payload,
  type: GET_ALL_BEACON,
});

export const setAllBeacon = payload => ({
  payload,
  type: SET_ALL_BEACON,
});

export const getSubjectRegistration = payload => ({
  payload,
  type: GET_SUBJECT_REGISTRATION,
});

export const setSubjectRegistration = payload => ({
  payload,
  type: SET_SUBJECT_REGISTRATION,
});

export const registerBeacon = payload => ({
  payload,
  type: REGISTER_BEACON,
});

export const registerBeaconSuccess = payload => ({
  payload,
  type: REGISTER_BEACON_SUCCESS,
});

export const registerBeaconFailure = payload => ({
  payload,
  type: REGISTER_BEACON_FAILURE,
});

export const openClass = payload => ({
  payload,
  type: OPEN_CLASS,
});

export const openClassSuccess = payload => ({
  payload,
  type: OPEN_CLASS_SUCCESS,
});

export const openClassFailed = payload => ({
  payload,
  type: OPEN_CLASS_FAILED,
});

export const closeClass = payload => ({
  payload,
  type: CLOSE_CLASS,
});

export const closeClassSuccess = payload => ({
  payload,
  type: CLOSE_CLASS_SUCCESS,
});

export const getClass = payload => ({
  payload,
  type: GET_CLASS,
})

export const getClassSuccess = payload => ({
  payload,
  type: GET_CLASS_SUCCESS,
})

export const getClassFailed = payload => ({
  payload,
  type: GET_CLASS_FAILED,
})

export const checkname = payload => ({
  payload,
  type:CHECKNAME
})

export const checkname_success = payload => ({
  payload,
  type:CHECKNAME_SUCCESS
})

export const checkname_failure = payload => ({
  payload,
  type:CHECKNAME_FAILURE
})


export const getStudentInSection = payload => ({
  payload,
  type: GET_STUDENT_IN_SECTION,
})

export const setStudentInSection = payload => ({
  payload,
  type: SET_STUDENT_IN_SECTION,
})

// Auth
export const Login = params => {
  return dispatch => {
    dispatch(login());
    Api.Login(params)
      .then(result => {
        dispatch(login_success(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(login_failure(err));
      });
  };
};

export const Logout = params => {
  return dispatch => {
    dispatch(logout());
    NavigationServices.navigate('Login');
  };
};

// Year
export const GetCurrentYear = params => {
  return dispatch => {
    dispatch(getCurrentYear(params));
    Api.GetCurrentYear(params)
      .then(result => {
        dispatch(setCurrentYear(JSON.stringify(result)));
      })
      .catch(err => {
        // console.log('error>>>',err)
        dispatch(requestError(err));
      });
  };
};

//Subject Student
export const StudentGetSubjectRegis = params => {
  return dispatch => {
    dispatch(studentGetSubjectRegis(params));
    Api.StudentGetSubjectRegister(params)
      .then(result => {
        dispatch(studentSetSubjectRegis(JSON.stringify(result)));
      })
      .catch(err => {
        // console.log('error>>>',err)
        dispatch(requestError(err));
      });
  };
};

export const RegisterSubject = params => {
  return dispatch => {
    dispatch(registerSubject(params));
    Api.RegisterSubject(params)
      .then(result => {
        dispatch(registerSubjectSuccess(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(registerSubjectFailed(err));
      });
  };
};

export const GetSubjectRegistration = params => {
  return dispatch => {
    dispatch(getSubjectRegistration(params));
    Api.GetSubjectRegistration(params)
      .then(result => {
        dispatch(setSubjectRegistration(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};

// Lecturer
export const GetSubjectsApprove = params => {
  return dispatch => {
    dispatch(getSubjectsApprove(params));
    Api.GetSubjectsApprove(params)
      .then(result => {
        dispatch(setSubjectsApprove(JSON.stringify(result)));
      })
      .catch(err => {
        // console.log('error>>>',err)
        dispatch(requestError(err));
      });
  };
};

export const GetStudentsApprove = params => {
  return dispatch => {
    dispatch(getStudentsApprove(params));
    Api.GetStudentsApprove(params)
      .then(result => {
        dispatch(setStudentsApprove(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};

export const CreateSubject = params => {
  return dispatch => {
    dispatch(createSubject());
    Api.CreateSubject(params)
      .then(result => {
        dispatch(createSubjectSuccess(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(createSubjectFailed(err));
      });
  };
};

export const ApproveStudent = params => {
  return dispatch => {
    dispatch(approveStudent());
    Api.ApproveStudent(params)
      .then(result => {
        dispatch(approveStudentSuccess(params));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};

export const ApproveStudents = params => {
  return dispatch => {
    dispatch(approveStudents());
    Api.ApproveStudents(params)
      .then(result => {
        dispatch(approveStudentsSuccess(params));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};


export const RejectStudent = params => {
  return dispatch => {
    dispatch(rejectStudent());
    Api.RejectStudent(params)
      .then(result => {
        dispatch(rejectStudentSuccess(params));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};

export const RejectStudents = params => {
  return dispatch => {
    dispatch(rejectStudents());
    Api.RejectStudents(params)
      .then(result => {
        dispatch(rejectStudentsSuccess(params));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};

export const GetSubjectOpenSection = params => {
  return dispatch => {
    dispatch(getSubjectOpenSection());
    Api.GetSubjectOpenSection(params)
      .then(result => {
        dispatch(setSubjectOpenSection(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};

export const OpenSection = params => {
  return dispatch => {
    dispatch(openSection());
    Api.OpenSection(params)
      .then(result => {
        dispatch(openSectionSuccess(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(openSectionFailed(err));
      });
  };
};

export const GetAllBeacon = params => {
  return dispatch => {
    dispatch(getAllBeacon());
    Api.GetAllBeacon(params)
      .then(result => {
        dispatch(setAllBeacon(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};

export const RegisterBeacon = params => {
  return dispatch => {
    dispatch(registerBeacon());
    Api.RegisterBeacon(params)
      .then(result => {
        dispatch(registerBeaconSuccess(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(registerBeaconFailure(err));
      });
  };
};
export const OpenClass = params => {
  return dispatch => {
    dispatch(openClass());
    Api.OpenClass(params)
      .then(result => {
        dispatch(openClassSuccess(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(openClassFailed(err));
      });
  };
};

export const GetClass = params => {
  return dispatch => {
    dispatch(getClass());
    Api.GetClass(params)
      .then(result => {
        dispatch(getClassSuccess(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(getClassFailed(err));
      });
  };
};

export const CloseClass = params => {
  return dispatch => {
    dispatch(closeClass());
    Api.CloseClass(params)
      .then(result => {
        dispatch(closeClassSuccess(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};

export const ListStudentInSection = params => {
  return dispatch => {
    dispatch(getStudentInSection());
    Api.GetStudentInSection(params)
      .then(result => {
        dispatch(setStudentInSection(JSON.stringify(result)));
      })
      .catch(err => {
        dispatch(requestError(err));
      });
  };
};

export const CheckName = params => {
  return dispatch => {
    dispatch(checkname());
    Api.checkName(params)
    .then(result => {
      dispatch(checkname_success(JSON.stringify(result)))
    })
    .catch(err => {
      dispatch(checkname_failure(err))
    })
  }
}