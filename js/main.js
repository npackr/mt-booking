/*
  MAIN SCRIPT FOR BOOKING by NPACkr
    Dependencies: jQuery, bootbox\template.js, global\strings.js
*/

/* GLOBAL VARIABLES */
const testing_room_uuid = "dc133267-7d7d-4def-a82e-a1f7ce179e6e";
const testing_user_uuid = "377e119f-2369-4f01-b81e-2ab82fc50248";

var session = getLoggedInSession();

/* WEBPAGE ONLOAD FUNCTIONS */
$(document).ready(function () {

  /* TOOL TIP */
  $('[data-toggle="tooltip"]').tooltip();

  /* ONLOAD FUNCTIONS */
  if (checkLoggedInStatus(session)) {
    getLoggedInUserInfo(session);
  } else {
    showUserMenu("#user-menu", null);
  }
})

/* BUTTON EVENTS */
$("#submit-button").on('click', function () {
  input_start_date = new Date($("#start-date").val());
  input_end_date = new Date($("#end-date").val());

  checkingRoomStatus(testing_room_uuid, input_start_date, input_end_date);
})

/* USER INPUT FUNCTIONS */
function getUserLoginCredential() {
  let user_name = $("#input-username").val();
  let user_password = $("#input-password").val();
  let user_login_credential = {
    username: user_name,
    password: user_password,
  }
  return user_login_credential;
}

/* UI FUNCTIONS */

// USER PROFILE FUNCTIONS
function showUserProfileModal() {
  $("#userProfileModal").modal('toggle');
}
function hiddenUserProfileModal(view_id) {
  $(view_id).modal('hide');
}

// USER ORDER HISTORY FUNCTIONS
function showUserOrderHistoryModal() {
  showUserOrderHistory("#user-order-history");
  $("#userOrderHistoryModal").modal('toggle');
  $("#userOrderHistoryModal").css('overflow-y', 'auto');
}

function hiddenUserHistoryModal(view_id) {
  $(view_id).modal('hide');
}

function hiddenLoginModal(view_id) {
  $(view_id).modal('toggle');
}

function showLoginModal(view_id) {
  $(view_id).modal('show');
}

function switchingLoginModal(view_id, target_view_id) {
  $(view_id).modal('hide');
  $(target_view_id).modal('show');
}

function showAdminPanelModal() {
  showAdminPanelItem();
  $("#adminPanelModal").modal('toggle');
}

function hiddenAdminPanelModal(view_id) {
  $(view_id).modal('hide');
}

function hiddenAdminFunctionModal(view_id) {
  $(view_id).modal('hide');
}

function hiddenOrderEditorModal() {
  showAdminOrderHistoryModal();
  $("#adminOrderEditorModal").modal('hide');
}

function showAdminOrderHistoryModal() {
  var adminDataSend = {
    event: "getAllUsersOrderHistory",
    session_uuid: session.session_uuid,
    session_key: session.session_key,
  };

  queryDataGet(adminDataSend, (query_result) => {
    if (query_result.status == "successful") {
      showAdminFunctionModal(NPACKR_ADMIN_ORDER_HISTORY, allUserOrderHistoryViewElement(query_result.result));
    } else if (query_result.status == "unsuccessful") {
      bbAlert("doesNotHaveAnyOrder");
      console.log(NPACKR_GET_ALL_USERS_ORDER_HISTORY_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function showAdminFunctionModal(title, result) {
  $("#admin-function-modal-title").html(title);
  $("#admin-function-modal-body").html(result);
  hiddenAdminPanelModal("#adminPanelModal");
  $("#adminFunctionModal").modal('toggle');
  $("#adminFunctionModal").css('overflow-y', 'auto');
}

function showAdminOrderEditorModal(order_uuid) {
  $("#admin-order-editor-modal-title").html(NPACKR_ADMIN_ORDER_EDITOR_TITLE);

  var dataSend = {
    event: "getOrderInfo",
    order_uuid: order_uuid
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      showAdminOrderEditor(query_result.result[0]);
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_GET_ALL_USERS_ORDER_HISTORY_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
  hiddenAdminFunctionModal("#adminFunctionModal");
  $("#adminOrderEditorModal").modal('show');
  $("#adminOrderEditorModal").css('overflow-y', 'auto');
}

function showUserProfile(user_number, user_name, user_email, user_phonenumber, user_birthday, user_address) {
  $("#user-profile-number").html(user_number);
  $("#user-profile-name").html(user_name);
  $("#user-profile-email").html(user_email);
  $("#user-profile-phone").html(user_phonenumber);
  $("#user-profile-birthday").html(user_birthday);
  $("#user-profile-address").html(user_address);
}

// Hiển thị danh mục các tòa nhà
function showBuildingList(view_id, user_uuid) {
  var dataSend = {
    event: "getBuildingsList",
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      var list_view = buildingsListViewElementHeader();
      query_result.result.forEach(result => {
        list_view = list_view + buildingsListViewElement(result.category_uuid, result.category_name, user_uuid);
      });
      $(view_id).html(list_view);
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_GET_BUILDING_LIST_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

// Hiển thị danh sách phòng của một tòa nhà cụ thể
function showRoomsOfBuilding(building_name, view_id, user_uuid) {
  var dataSend = {
    event: "getRoomsOfBuilding",
    name_of_building: building_name,
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      var list_view = roomsListViewElementHeader(building_name);
      query_result.result.forEach(result => {
        list_view = list_view + roomsListViewElement(result.item_uuid, result.item_name, user_uuid);
      });
      $(view_id).html(list_view);
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_GET_ROOMS_LIST_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function showSlotsOfRoom(view_id, room_uuid, room_name, user_uuid) {
  var dataSend = {
    event: "getSlotsOfRoom",
    room_uuid: room_uuid,
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      var list_view = slotsListViewElementHeader(room_name);
      query_result.result.forEach(result => {
        list_view = list_view + slotsListViewElement(result, user_uuid);
      });
      $(view_id).html(list_view);
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_GET_SLOTS_LIST_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function showUserOrderHistory(view_id) {
  var dataSend = {
    event: "getLoggedUserOrderHistory",
    session_uuid: session.session_uuid,
    session_key: session.session_key,
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      var list_view = userOrderHistoryViewElementHeader();
      query_result.result.forEach((result) => {
        list_view = list_view + userOrderHistoryViewElement(result);
      });
      $(view_id).html(list_view + "</tbody>");
    } else if (query_result.status == "unsuccessful") {
      $(view_id).html("<div class='left-align-subtitle'>" + NPACKR_DOES_NOT_HAVE_ANY_ORDER_BB_MESSAGE + "</div>");
      console.log(NPACKR_GET_ROOMS_LIST_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function showRentAssistDatePicker(view_id, slot_uuid, slot_name, user_uuid) {
  $(view_id + "-view-header").html(rentAssistDatePickerViewElementHeader(slot_name));
  $(view_id + "-view-body").removeClass("hidden");
  $("#ra-datepicker-input").change(() => {
    var rent_assistant_date_picker_value = $("#ra-datepicker-input").val();
    try {
      showSlotTimeSchedule('#time-schedule', slot_uuid, slot_name, rent_assistant_date_picker_value, user_uuid);
    } catch (error) {
      console.log(error);
    }
  })
}

// Hiển thị thời gian biểu của một phòng nhất định
function showTimeSchedule(view_id, room_id, room_name, start_date, user_uuid) {
  var time = new Date(start_date);
  var list_view = timeScheduleItemViewElementHeader(room_name);

  $(view_id).html(list_view);

  showTimeScheduleItem(room_id, view_id, time, room_name, user_uuid);
}

function showSlotTimeSchedule(view_id, slot_uuid, slot_name, start_date, user_uuid) {
  var list_view = timeScheduleItemSlotViewElementHeader(slot_name);
  for (let i = 0; i < 24; i++) {
    if (i == 7 || i == 12) {
      list_view = list_view + timeScheduleSlotViewElement(i, "", "", "", "", "");
    }
  }
  $(view_id).html(list_view);

  showTimeScheduleSlotItem(slot_uuid, view_id, start_date, slot_name, user_uuid);
}

// Hiển thị giờ trong thời gian biểu
function showTimeScheduleItem(room_id, view_id, input_date, room_name, user_uuid) {

  for (let i = 0; i < 24; i++) {
    var item_view_id = view_id + "-view-item-" + i;
    showTimeScheduleItemStatus(room_id, input_date, i, item_view_id, room_name, user_uuid);
  }
}

function showTimeScheduleSlotItem(slot_uuid, view_id, input_date, slot_name, user_uuid) {

  for (let i = 0; i < 24; i++) {
    if (i == 7 || i == 12) {
      var item_view_id = view_id + "-view-item-" + i;
      showTimeScheduleSlotStatus(slot_uuid, input_date, i, item_view_id, slot_name, user_uuid);
    }
  }
}

// Hiển thị trạng thái đặt hẹn tại một thời gian trong thời gian biểu
function showTimeScheduleItemStatus(room_id, time, i, item_view_id, room_name, user_uuid) {
  var start_time = `${time.getFullYear()}-${convertMonthToNumber(time.getMonth())}-${time.getDate()} ${i}:00:00`;
  var end_time = `${time.getFullYear()}-${convertMonthToNumber(time.getMonth())}-${time.getDate()} ${i}:59:59`;

  var dataSend = {
    event: "getRoomStatus",
    start_time: start_time,
    end_time: end_time,
    room_id: room_id,
  };

  queryDataGet(dataSend, function (query_result) {
    if (query_result.status == "successful") {
      var data = query_result.result;
      console.log(JSON.stringify(data));
      $(item_view_id).html(timeScheduleItemViewElement(i, "unavailable", start_time, room_id, room_name, user_uuid));
    } else if (query_result.status == "unsuccessful") {
      var data = query_result.result;
      console.log(JSON.stringify(data));
      $(item_view_id).html(timeScheduleItemViewElement(i, "available", start_time, room_id, room_name, user_uuid));
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function showTimeScheduleSlotStatus(slot_uuid, input_date, i, item_view_id, slot_name, user_uuid) {
  var time = new Date(input_date);
  var start_time = `${time.getFullYear()}-${convertMonthToNumber(time.getMonth())}-${time.getDate()} ${i}:00:00`;
  var end_time = endTimeByAmPmTransforming(start_time);

  var dataSend = {
    event: "getSlotStatus",
    start_time: start_time,
    end_time: end_time,
    slot_uuid: slot_uuid,
  };

  queryDataGet(dataSend, function (query_result) {
    if (query_result.status == "successful") {
      $(item_view_id).html(timeScheduleSlotViewElement(i, "unavailable", start_time, slot_uuid, slot_name, user_uuid));
    } else if (query_result.status == "unsuccessful") {
      $(item_view_id).html(timeScheduleSlotViewElement(i, "available", start_time, slot_uuid, slot_name, user_uuid));
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function listingUnavailableRoomByDate(time) {
  var start_time = startDateTransforming(time);
  var end_time = endDateTransforming(time);

  console.log(start_time + " ->" + end_time);

  var dataSend = {
    event: "getUnavailableRoomByDate",
    start_time: start_time,
    end_time: end_time,
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      bbRadioSelector(query_result.result);
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_GET_ROOMS_LIST_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function showUserMenu(view_id, user_name, user_type) {
  var list_view = userMenuViewElement(user_name, user_type);
  $(view_id).html(list_view);
}

function showAdminPanelItem() {
  $("#admin-panel-modal-body").html(adminPanelItemViewElement());
}

/* RENT ASSISTANT TIME TO USE EDITOR MODAL */
function showRentAssistantModal() {
  hiddenUserHistoryModal("#userOrderHistoryModal");
  $("#rentAssistantModal").modal('show');
  $("#rentAssistantModal").css('overflow-y', 'auto');
}
function hiddenRentAssistantModal() {
  $("#rentAssistantModal").modal('toggle');
  showUserOrderHistoryModal();
}
function showRentAssistantTTUModal(order_uuid) {
  $("#rent-assistant-ttu-editor-modal-header").html(ttuEditorHeaderViewElement(order_uuid));
  showTTUEditorBuildingList('#ttu-editor-buildings-list', order_uuid);

  $("#adminFunctionModal").modal('hide');
  $("#adminOrderEditorModal").modal('hide');
  $("#rentAssistantTTUModal").modal('toggle');
  $("#rentAssistantTTUModal").css('overflow-y', 'auto');
}

function hiddenRentAssistantTTUModal(order_uuid) {
  $("#rentAssistantTTUModal").modal('hide');
  showAdminOrderEditorModal(order_uuid);
}

function showTTUEditorBuildingList(view_id, order_uuid) {
  var dataSend = {
    event: "getBuildingsList",
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      var list_view = buildingsListViewElementHeader();
      query_result.result.forEach(result => {
        list_view = list_view + ttuEditorBuildingsListViewElement(result.category_uuid, result.category_name, order_uuid);
      });
      $(view_id).html(list_view);
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_GET_BUILDING_LIST_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function showTTUEditorRoomsOfBuilding(category_uuid, category_name, view_id, order_uuid) {
  var dataSend = {
    event: "getRoomsOfBuilding",
    category_uuid: category_uuid,
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      var list_view = roomsListViewElementHeader(category_name);
      query_result.result.forEach(result => {
        list_view = list_view + ttuEditorRoomsListViewElement(result.item_uuid, result.item_name, order_uuid);
      });
      $(view_id).html(list_view);
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_GET_ROOMS_LIST_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function showTTUEditorSlotsOfRoom(view_id, room_uuid, room_name, order_uuid) {
  var dataSend = {
    event: "getSlotsOfRoom",
    room_uuid: room_uuid,
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      var list_view = slotsListViewElementHeader(room_name);
      query_result.result.forEach(result => {
        list_view = list_view + ttuEditorSlotsListViewElement(result, order_uuid);
      });
      $(view_id).html(list_view);
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_GET_SLOTS_LIST_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function showTTUEditorRentAssistDatePicker(view_id, slot_uuid, slot_name, order_uuid) {
  $(view_id + "-view-header").html(rentAssistDatePickerViewElementHeader(slot_name));
  $(view_id + "-view-body").removeClass("hidden");
  $("#ttu-editor-ra-datepicker-input").change(() => {
    var rent_assistant_date_picker_value = $("#ttu-editor-ra-datepicker-input").val();
    try {
      showTTUSlotTimeSchedule('#ttu-editor-time-schedule', slot_uuid, slot_name, rent_assistant_date_picker_value, order_uuid);
    } catch (error) {
      console.log(error);
    }
  })
}

function showTTUSlotTimeSchedule(view_id, slot_uuid, slot_name, start_date, order_uuid) {
  var list_view = timeScheduleItemSlotViewElementHeader(slot_name);
  for (let i = 0; i < 24; i++) {
    if (i == 7 || i == 12) {
      list_view = list_view + ttuEditorTimeScheduleSlotViewElement(i, "", "", "", "", "");
    }
  }
  $(view_id).html(list_view);

  showTTUEditorTimeScheduleSlotItem(slot_uuid, view_id, start_date, slot_name, order_uuid);
}

function showTTUEditorTimeScheduleSlotItem(slot_uuid, view_id, input_date, slot_name, order_uuid) {

  for (let i = 0; i < 24; i++) {
    if (i == 7 || i == 12) {
      var item_view_id = view_id + "-view-item-" + i;
      showTTUEditorTimeScheduleSlotStatus(slot_uuid, input_date, i, item_view_id, slot_name, order_uuid);
    }
  }
}

function showTTUEditorTimeScheduleSlotStatus(slot_uuid, input_date, i, item_view_id, slot_name, order_uuid) {
  var time = new Date(input_date);
  var start_time = `${time.getFullYear()}-${convertMonthToNumber(time.getMonth())}-${time.getDate()} ${i}:00:00`;
  var end_time = `${time.getFullYear()}-${convertMonthToNumber(time.getMonth())}-${time.getDate()} ${i}:59:59`;

  var dataSend = {
    event: "getSlotStatus",
    start_time: start_time,
    end_time: end_time,
    slot_uuid: slot_uuid,
  };

  queryDataGet(dataSend, function (query_result) {
    if (query_result.status == "successful") {
      $(item_view_id).html(ttuEditorTimeScheduleSlotViewElement(i, "unavailable", start_time, slot_uuid, slot_name, order_uuid));
    } else if (query_result.status == "unsuccessful") {
      $(item_view_id).html(ttuEditorTimeScheduleSlotViewElement(i, "available", start_time, slot_uuid, slot_name, order_uuid));
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function updateNewTimeToUseforSlot(slot_uuid, start_time, end_time, order_uuid) {

  var adminDataSend = {
    event: "updateNewTimeToUseforSlot",
    slot_uuid: slot_uuid,
    start_time: start_time,
    end_time: end_time,
    order_uuid: order_uuid,
  };

  queryDataGet(adminDataSend, (query_result) => {
    if (query_result.status == "successful") {
      $("#adminPanelModal").modal('hide');
      $("#adminFunctionModal").modal('hide');
      $("#adminOrderEditorModal").modal('hide');
      $("#rentAssistantTTUModal").modal('hide');
      
      bbOrderTimeToUseEditSuccessfully(order_uuid);

    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_EDIT_USER_INFO_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

/* GENERAL FUNCTIONS */

// Tạo đơn hàng mới
function createOrder(start_date, end_date, room_uuid, user_uuid, room_name) {
  var start_time = startDateTransforming(start_date);
  var end_time = endDateTransforming(end_date);

  var dataSend = {
    event: "insertAnOrder",
    start_time: start_time,
    end_time: end_time,
    room_uuid: room_uuid,
    user_uuid: user_uuid,
    item_name: room_name,
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      var data = query_result.result;
      console.log(JSON.stringify(data));
      bbOrderMakedSuccessfullyAlert(data[0].order_uuid, data[0].item_uuid, data[0].item_name, user_uuid);
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_INSERT_ORDER_FAILED_ERROR);
      bbAlert("createOrderUnsuccessfully");
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function createSlotOrder(start_date, end_date, slot_uuid, user_uuid, slot_name, room_uuid, room_name) {
  var start_time = startDateTransforming(start_date);
  var end_time = endDateTransforming(end_date);

  var dataSend = {
    event: "insertAnSlotOrder",
    start_time: start_time,
    end_time: end_time,
    slot_uuid: slot_uuid,
    user_uuid: user_uuid,
    slot_name: slot_name,
    item_uuid: room_uuid,
    item_name: room_name,
  };

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      var data = query_result.result;
      bbOrderMakedSuccessfullyAlert(data[0].order_uuid, data[0].slot_uuid, data[0].slot_name, user_uuid);
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_INSERT_ORDER_FAILED_ERROR);
      bbAlert("createOrderUnsuccessfully");
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function checkLoggedInStatus(session) {
  if (session.session_uuid != null && session.session_uuid != "" && session.session_uuid != undefined) {
    return true;
  } else {
    return false;
  }
}

// Kiểm tra trạng thái đặt hẹn của phòng và hiển thị cửa sổ đặt nhanh
function checkingRoomStatus(room_id, check_in_time, check_out_time) {
  start_date = startDateTransforming(check_in_time);
  end_date = endDateTransforming(check_out_time);

  var dataSend = {
    event: "getRoomStatus",
    start_time: start_date,
    end_time: end_date,
    room_id: room_id,
  };

  queryDataGet(dataSend, function (query_result) {
    if (query_result.status == "successful") {
      data = query_result.result;
      console.log(JSON.stringify(data));
      bbAlert("roomHaveRented");
    } else if (query_result.status == "unsuccessful") {
      data = query_result.result;
      console.log(JSON.stringify(data));
      bbAlert("roomAvailable");
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function createUser(name, email, phone, password, birthday, address) {
  var dataSend = {
    event: "insertUser",
    user_name: name,
    user_email: email,
    user_phonenumber: phone,
    user_password: CryptoJS.SHA512(password).toString(),
    user_birthday: birthday,
    user_address: address,
    user_registered: convertToMariaDBDateFormat(new Date()),
  };

  queryDataGet(dataSend, function (query_result) {
    if (query_result.status == "successful") {
      data = query_result.result;
      console.log(JSON.stringify(data));
      bbAlert("createUserSuccessfully");
    } else if (query_result.status == "unsuccessful") {
      data = query_result.result;
      console.log(JSON.stringify(data));
      bbAlert("createUserUnsuccessfully");
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function logUserIn(credential) {
  if (credential.username == "" || credential.password == "") {
    console.log(NPACKR_LOGIN_CREDENTIAL_EMPTY_ERROR);
  } else if (credential.username.includes("@")) {
    var dataSend = {
      event: "logUserIn",
      user_email: credential.username,
      user_password: CryptoJS.SHA512(credential.password).toString(),
    };
    console.log(DEBUG_PREFIX_GENERAL + "Login with email...");

  } else {
    var dataSend = {
      event: "logUserIn",
      user_phonenumber: credential.username,
      user_password: CryptoJS.SHA512(credential.password).toString(),
    };
    console.log(DEBUG_PREFIX_GENERAL + "Login with phone numer...");
    console.log(JSON.stringify(dataSend));
  }

  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      var data = query_result.result;
      console.log(JSON.stringify(data));

      Cookies.set("session_uuid", data[0].session_uuid, { expires: 1 });
      Cookies.set("session_key", data[0].session_key, { expires: 1 });
      console.log(DEBUG_PREFIX_GENERAL + "Created session: " + data[0].session_uuid);
      console.log(DEBUG_PREFIX_GENERAL + "User logged in with session: " + data[0].session_uuid);

      var sessionSend = {
        event: "insertSession",
        session_uuid: data[0].session_uuid,
        user_uuid: data[0].user_id,
        session_key: data[0].session_key,
      };
      queryDataGet(sessionSend, (query_result) => {
        if (query_result.status == "successful") {
          var data = query_result;
          hiddenLoginModal();
          bbAlert("logInSuccessfully");
        } else if (query_result.status == "unsuccessful") {
          bbAlert("logInUnsuccessfully");
          console.log(NPACKR_INSERT_SESSION_FAILED_ERROR);
        }
      })

    } else if (query_result.status == "unsuccessful") {
      hiddenLoginModal();
      bbAlert("logInUnsuccessfully");
      console.log(NPACKR_LOG_IN_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function getLoggedInSession() {
  var result = {
    session_uuid: Cookies.get("session_uuid"),
    session_key: Cookies.get("session_key"),
  }
  return result;
}

function getLoggedInUserInfo(session) {
  if (session.session_uuid != null || session.session_key != null || session.session_uuid != undefined || session.session_key != undefined) {
    var dataSend = {
      event: "getLoggedInUserInfo",
      session_uuid: session.session_uuid,
      session_key: session.session_key,
    };

    queryDataGet(dataSend, (query_result) => {
      if (query_result.status == "successful") {
        let data = query_result.result;
        showUserMenu("#user-menu", data[0].user_name, data[0].user_type);
        showUserProfile(data[0].user_number, data[0].user_name, data[0].user_email, data[0].user_phonenumber, data[0].user_birthday, data[0].user_address);
        showBuildingList("#buildings-list", data[0].user_uuid);
      } else if (query_result.status == "unsuccessful") {
        showUserMenu("#user-menu", null);
        console.log(NPACKR_LOG_IN_FAILED_ERROR);
      } else {
        showUserMenu("#user-menu", null);
        console.log(NPACKR_REST_API_ERROR);
      }
    })

  } else {
    showUserMenu("#user-menu", null);
    console.log(NPACKR_SESSION_NOT_FOUND_ERROR);
  }
}

function logOut() {
  var session = getLoggedInSession();
  var dataSend = {
    event: "logUserOut",
    session_uuid: session.session_uuid,
    session_key: session.session_key,
  };
  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      Cookies.remove("session_uuid");
      Cookies.remove("session_key");
      showUserMenu("#user-menu", null);
      console.log(DEBUG_PREFIX_GENERAL + "Logged out successfully");
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_LOG_OUT_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function deleteOrder(order_uuid) {
  var dataSend = {
    event: "deleteOrder",
    order_uuid: order_uuid,
  };
  queryDataGet(dataSend, (query_result) => {
    if (query_result.status == "successful") {
      $("#adminPanelModal").modal('hide');
      $("#adminFunctionModal").modal('hide');
      bbAlert("deleteOrderSuccessfully");
    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_DELETE_ORDER_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

function editUserInfo() {
  var user_uuid = $("#editor-order-user-uuid-value").val();
  var user_name = $("#editor-order-user-name-value").val();
  var user_phonenumber = $("#editor-order-user-phonenumber-value").val();
  var order_uuid = $("#editor-order-uuid-value").val();

  var adminDataSend = {
    event: "editUserInfo",
    user_uuid: user_uuid,
    user_name: user_name,
    user_phonenumber: user_phonenumber,
  };

  queryDataGet(adminDataSend, (query_result) => {
    if (query_result.status == "successful") {
      $("#adminPanelModal").modal('hide');
      $("#adminFunctionModal").modal('hide');
      $("#adminOrderEditorModal").modal('hide');

      if (order_uuid != null || order_uuid != undefined || order_dateuuid != "") {
        bbOrderInfoEditSuccessfully(order_uuid);
      } else {
        console.log(DEBUG_PREFIX_GENERAL + "User info changed!");
      }

    } else if (query_result.status == "unsuccessful") {
      console.log(NPACKR_EDIT_USER_INFO_FAILED_ERROR);
    } else {
      console.log(NPACKR_REST_API_ERROR);
    }
  })
}

/* ADDITION FUNCTION */
function queryDataGet(dataSend, callback) {
  $.ajax({
    type: 'GET',
    url: "https://rest.npackr.com/mt-booking/rest.php",
    data: dataSend,
    async: true,
    dataType: 'json',
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    success: callback
  });
}

function queryDataPost(dataSend, callback) {
  $.ajax({
    type: 'POST',
    url: "https://rest.npackr.com/mt-booking/rest.php",
    data: dataSend,
    async: true,
    dataType: 'json',
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    success: callback
  });
}

function convertMonthToNumber(month) {
  switch (month) {
    case 0: return "01";
    case 1: return "02";
    case 2: return "03";
    case 3: return "04";
    case 4: return "05";
    case 5: return "06";
    case 6: return "07";
    case 7: return "08";
    case 8: return "09";
    case 9: return "10";
    case 10: return "11";
    case 11: return "12";
    default: return "-1";
  }
}

function convertRoomTypeToString(room_type) {
  var type;
  switch (room_type) {
    case "general":
      type = NPACKR_GENERAL_ROOM_TYPE;
      break;
    case "vip":
      type = NPACKR_VIP_ROOM_TYPE;
      break;

    default:
      type = NPACKR_OTHER_ROOM_TYPE;
  }
  return type;
}

function startDateTransforming(start_date) {
  let time = new Date(start_date);
  return `${time.getFullYear()}-${convertMonthToNumber(time.getMonth())}-${time.getDate()} ${time.getHours()}:00:00`;
}

function getInputAsDate(element_id) {
  return $(element_id).val();
}

function convertDateTimeToVietnameseString(date) {
  let time = new Date(date);
  if (time.getHours() < 12) {
    return `SÁNG ${createAsVietnameseDate(time)}`;
  } else {
    return `CHIỀU ${createAsVietnameseDate(time)}`;
  }
}

function endDateTransforming(end_date) {
  let time = new Date(end_date);
  return `${time.getFullYear()}-${convertMonthToNumber(time.getMonth())}-${time.getDate()} ${time.getHours()}:59:59`;
}

function endTimeByAmPmTransforming(end_date) {
  let time = new Date(end_date);
  return `${time.getFullYear()}-${convertMonthToNumber(time.getMonth())}-${time.getDate()} ${time.getHours() + 4 }:59:59`;
}

function calculateEndDate(start_date, duration) {
  return new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate() + duration);
}

function createAsDate(date) {
  return `${date.getFullYear()}-${convertMonthToNumber(date.getMonth())}-${date.getDate()}`;
}

function createAsVietnameseDate(date) {
  return `${date.getDate()}/${convertMonthToNumber(date.getMonth())}/${date.getFullYear()}`;
}

function convertToMariaDBDateFormat(date) {
  return `${date.getFullYear()}-${convertMonthToNumber(date.getMonth())}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function createDateAsUTC(date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

function convertDateToUTC(date) {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
}

