const initialState = {
  staffList: [],
  reportList: [],
  attendanceList: [],
};

function staffReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_STAFF_SUCCESS":
      return {
        ...state,
        staffList: action.payload,
      };
    case "FETCH_REPORT_SUCCESS":
      return {
        ...state,
        reportList: action.payload,
      };
    case "FETCH_ATTENDANCE_SUCCESS":
      return {
        ...state,
        attendanceList: action.payload,
      };
    default:
      return state;
  }
}

export default staffReducer;
