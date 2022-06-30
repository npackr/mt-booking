/* 
  INDEX UI COMPONENTS by npackr
*/

function buildingsListViewElementHeader() {
  return `<div class="buildings-list-view-header">${NPACKR_RENT_ASSIST_SELECT_BUILDING}</div>`;
}

function roomsListViewElementHeader(building_name) {
  return `<div class="rooms-list-view-header">${NPACKR_RENT_ASSIST_SELECT_ROOM} ${building_name}?</div>`;
}

function timeScheduleItemViewElementHeader(room_name) {
  return `<div class="time-schedule-view-header">${NPACKR_RENT_ASSIST_SELECT_TIME} ${room_name}</div>`;
}

function timeScheduleItemSlotViewElementHeader(slot_name) {
  return `<div class="time-schedule-slot-view-header">${NPACKR_RENT_ASSIST_SELECT_TIME} ${slot_name}</div>`;
}

function rentAssistDatePickerViewElementHeader(room_name) {
  return `${NPACKR_RENT_ASSIST_SELECT_DATE} ${room_name}`;
}

function slotsListViewElementHeader(room_name) {
  return `<div class="slots-list-view-header">${NPACKR_RENT_ASSIST_SELECT_SLOT} ${room_name}</div>`;
}

function buildingsListViewElement(building_uuid, building_name, user_uuid) {
  return `<input type="button" title="${building_uuid}" class="btn btn-default room-list-view-item" onclick="showRoomsOfBuilding('${building_name}', '#rooms-list', '${user_uuid}')" value="${building_name}"/>`;
}

function roomsListViewElement(room_uuid, room_name, user_uuid) {
  return `<input type="button" title="${room_uuid}" onclick="showSlotsOfRoom('#slots-list', '${room_uuid}', ' ${room_name}', '${user_uuid}')" class="btn btn-default room-list-view-item" value="${room_name}"/>`;
}

function slotsListViewElement(result, user_uuid) {
  return `<input type="button" title="${result.slot_uuid}" onclick="showRentAssistDatePicker('#ra-datepicker', '${result.slot_uuid}', '${result.slot_name}', '${user_uuid}')" class="btn btn-default slot-list-view-item" value="${result.slot_name}"/>`;
}

function timeScheduleItemViewElement(hour, status, start_date, room_id, room_name, user_uuid) {
  switch (status) {
    case "available":
      return `<div class="time-schedule-item" onclick="bbRentAssistentConfirmOrder('${start_date}', '${room_id}', '${room_name}', '${user_uuid}')">${hour}:00 <span class="time-schedule-view-item-available">${NPACKR_ROOM_AVAILABLE_LABEL}</span></div>`;
    case "unavailable":
      return `<div class="time-schedule-item">${hour}:00 <span class="time-schedule-view-item-unavailable">${NPACKR_ROOM_UNAVAILABLE_LABEL}</span></div>`;
    default:
      return `<div class="time-schedule-view-item" id="time-schedule-view-item-${hour}">${hour}:00</div>`;
  }
}

function timeScheduleSlotViewElement(hour, status, start_date, slot_uuid, slot_name, user_uuid) {
  var ampm;

  switch (hour) {
    case 7:
      ampm = "BUỔI SÁNG";
      break;
    case 12:
      ampm = "BUỔI CHIỀU";
      break;

    default:
      ampm = "LIÊN HỆ";
  }

  switch (status) {
    case "available":
      return `<div class="time-schedule-item" onclick="bbRentAssistentConfirmSlotOrder('${start_date}', '${slot_uuid}', '${slot_name}', '${user_uuid}')">${ampm} ${hour}:00 <span class="time-schedule-view-item-available">${NPACKR_ROOM_AVAILABLE_LABEL}</span></div>`;
    case "unavailable":
      return `<div class="time-schedule-item">${ampm} ${hour}:00 <span class="time-schedule-view-item-unavailable">${NPACKR_ROOM_UNAVAILABLE_LABEL}</span></div>`;
    default:
      return `<div class="time-schedule-view-item" id="time-schedule-view-item-${hour}">${hour}:00</div>`;
  }
}

function userMenuViewElement(user_name, user_type) {
  var list_view_header = `
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownUserMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
      <span class="material-symbols-outlined">account_circle</span> ${user_name}</button>
      <ul class="dropdown-menu" aria-labelledby="dropdownUserMenuButton">`;
  var admin_panel_view = `
    <li><a class="dropdown-item" href="#" onclick="showAdminPanelModal()">${NPACKR_ADMIN_PANEL_LABEL}</a></li>
    <li><hr class="dropdown-divider"></li>`;
  var upcomming_function_view = `
    <li><a class="dropdown-item" href="#" onclick="showUserProfileModal()">${NPACKR_USER_PROFILE_LABEL}</a></li>
    <li><a class="dropdown-item" href="#" onclick="showUserOrderHistoryModal()">${NPACKR_USER_ORDER_HISTORY_LABEL}</a></li>
    <li><hr class="dropdown-divider"></li>`;
  var list_view = `
    <li><a class="dropdown-item" href="#" onclick="logOutConfirm('${user_name}')">${NPACKR_LOGOUT_LABEL}</a></li>`;

  var footer = `</ul>`;

  var ra_button_view = `<button style="margin-left: 12px" class="btn btn-primary" type="button" onclick="showRentAssistantModal()">${NPACKR_RENT_ASSISTANT_LABEL}</button>`;
  
  if (user_name != null || user_name != undefined) {
    if (user_type == 0) {
      return list_view_header + admin_panel_view + upcomming_function_view + list_view + footer + ra_button_view;
    } else {
      return list_view_header + upcomming_function_view + list_view + footer;
    }
  } else {
    return `<div onclick="showLoginModal('#loginModal')">
              ${NPACKR_LOGIN_LABEL}
            </div>`;
  }
}

function adminPanelItemViewElement() {
  var html = `<div class="row">
                <div class="col-4">
                  <input type="button" class="btn btn-secondary" onclick="showAdminOrderHistoryModal()" value="${NPACKR_ADMIN_ORDER_HISTORY}"/>
                </div>
              </div>`;
  return html;
}

function userOrderHistoryViewElementHeader() {
  return `<thead>
            <tr>
              <th scope="col">Mã đơn</th>
              <th scope="col">Đặt lúc</th>
              <th scope="col">Tên phòng</th>
              <th scope="col">Loại phòng</th>
              <th scope="col">Tên giường</th>
              <th scope="col">Thời gian dùng</th>
            </tr>
          </thead>
          <tbody>`;
}

function userOrderHistoryViewElement(result) {
  var status;
  switch (result.order_status) {
    case "pending":
      status = NPACKR_PENDING_ORDER_STATUS;
    case "confirmed":
      status = NPACKR_CONFIRMED_ORDER_STATUS;
    case "cancelled":
      status = NPACKR_CANCELLED_ORDER_STATUS;
    case "finished":
      status = NPACKR_FINISHED_ORDER_STATUS;
    default:
      status = NPACKR_PENDING_ORDER_STATUS;
  }

  var time = convertDateTimeToVietnameseString(result.ttu_end_time);

  var type = convertRoomTypeToString(result.room_type);
  return `<tr>
            <th scope="row">${result.order_number}</th>
            <td>${result.order_time}</td>
            <td><span title="Mã phòng: ${result.room_number} (${result.room_description})">${result.room_name}</span></td>
            <td>${type}</td>
            <td><span title="Mã giường: ${result.slot_number} (${result.slot_description})">${result.slot_name}</span></td>
            <td title="Dùng trong buổi ${time} từ ${result.ttu_start_time} đến ${result.ttu_end_time}">${time}</td>
          </tr>`;
}

/* ADMIN UI COMPONENT */
function allUserOrderHistoryViewElement(result) {
  var header = `<div class="table-responsive"><table class="table table-striped">`;
  var table_header = `<thead>
                        <tr>
                          <th scope="col">${ALL_USER_ORDER_HISTORY_NUMBER_TITLE}</th>
                          <th scope="col">${ALL_USER_ORDER_HISTORY_PERSON_TITLE}</th>
                          <th scope="col">${ALL_USER_ORDER_HISTORY_PHONE_NUMBER_TITLE}</th>
                          <th scope="col">${ALL_USER_ORDER_HISTORY_ROOM_TITLE}</th>
                          <th scope="col">${ALL_USER_ORDER_HISTORY_ROOM_TYPE}</th>
                          <th scope="col">${ALL_USER_ORDER_HISTORY_SLOT_TITLE}</th>
                          <th scope="col">${ALL_USER_ORDER_HISTORY_TIME_USING_TITLE}</th>
                          <th scope="col">${ALL_USER_ORDER_HISTORY_ACTION_TITLE}</th>
                        </tr>
                      </thead>
                      <tbody>`;
  var table_body = "";
  var table_footer = `</tbody>`;
  var footer = `</table></div>`;

  result.forEach(result => {
    table_body = table_body + allUserOrderHistoryItemViewElement(result);
  });

  return header + table_header + table_body + table_footer + footer;
}

function allUserOrderHistoryItemViewElement(result) {
  var status;
  switch (result.order_status) {
    case "pending":
      status = NPACKR_PENDING_ORDER_STATUS;
    case "confirmed":
      status = NPACKR_CONFIRMED_ORDER_STATUS;
    case "cancelled":
      status = NPACKR_CANCELLED_ORDER_STATUS;
    case "finished":
      status = NPACKR_FINISHED_ORDER_STATUS;
    default:
      status = NPACKR_PENDING_ORDER_STATUS;
  }

  var time = convertDateTimeToVietnameseString(result.ttu_start_time);

  var type = convertRoomTypeToString(result.room_type);

  var table_body = `<tr>
                      <th title="Thời gian đặt: ${result.order_time}" scope="row">${result.order_number}</th>
                      <td>${result.user_name}</td>
                      <td><span title="Email: ${result.user_email}">${result.user_phonenumber}</span></td>
                      <td><span title="Mã phòng: ${result.room_number} (${result.room_description})">${result.room_name}</span></td>
                      <td><span title="Loại phòng: Phòng ${type}">${type}</span></td>
                      <td><span title="Mã giường: ${result.slot_number} (${result.slot_description})">${result.slot_name}</span></td>
                      <td title="Dùng trong khoảng thời gian từ ${result.ttu_start_time} đến ${result.ttu_end_time}">${time}</td>
                      <td class="action-icon-group">
                        <span title="Chỉnh sửa đơn đặt hẹn ${result.order_uuid}" onclick="showAdminOrderEditorModal('${result.order_uuid}')" class="material-symbols-outlined action-icon">tune</span> 
                        <span title="Xóa đơn đặt hẹn" onclick="deleteOrderConfirm('${result.order_uuid}')" class="action-icon material-symbols-outlined">delete</span>
                        <span title="Chọn lại giờ khác" onclick="showRentAssistantTTUModal('${result.order_uuid}')" class="action-icon material-symbols-outlined">history</span>
                      </td>
                    </tr>`;
  return table_body;
}

function showAdminOrderEditor(result) {
  if (result.order_updated == null || result.order_updated == "" || result.order_updated == undefined) {
    var order_updated = "Chưa từng được sửa chữa";
  } else {
    var order_updated = result.order_updated;
  }

  $("#editor-order-uuid-label").html(`${NPACKR_ADMIN_ORDER_EDITOR_ORDER_ID}`);
  $("#editor-order-uuid-value").val(result.order_uuid);

  $("#editor-order-user-uuid-label").html(`${NPACKR_ADMIN_ORDER_EDITOR_USER_ID}`);
  $("#editor-order-user-uuid-value").val(result.order_user_uuid);

  $("#editor-order-created-label").html(`${NPACKR_ADMIN_ORDER_EDITOR_ORDER_TIME}`);
  $("#editor-order-created-value").val(result.order_created);

  $("#editor-order-updated-label").html(`${NPACKR_ADMIN_ORDER_EDITOR_ORDER_UPDATED}`);
  $("#editor-order-updated-value").val(order_updated);

  $("#editor-order-user-name-label").html(`${NPACKR_ADMIN_ORDER_EDITOR_ORDER_USER_NAME}`);
  $("#editor-order-user-name-value").val(result.order_user_name);

  $("#editor-order-user-phonenumber-label").html(`${NPACKR_ADMIN_ORDER_EDITOR_ORDER_USER_PHONENUMBER}`);
  $("#editor-order-user-phonenumber-value").val(result.order_user_phonenumber);
}

/* RENT ASSISTANT TIME TO USE EDITOR */

function ttuEditorHeaderViewElement(order_uuid) {
  return `<h5 class="modal-title" id="rent-assistant-modal-title">Thay đổi thời gian</h5>
          <button type="button" class="close" onclick="hiddenRentAssistantTTUModal('${order_uuid}')" aria-label="Đóng">
            <span title="Hủy bỏ chỉnh sửa đơn hàng: ${order_uuid}" aria-hidden="true">&times;</span>
          </button>`;
}

function ttuEditorBuildingsListViewElement(building_uuid, building_name, order_uuid) {
  return `<input type="button" title="${building_uuid}" class="btn btn-default room-list-view-item"
          onclick="showTTUEditorRoomsOfBuilding('${building_uuid}', '${building_name}', '#ttu-editor-rooms-list', '${order_uuid}')"
          value="${building_name}"/>`;
}

function ttuEditorRoomsListViewElement(room_uuid, room_name, order_uuid) {
  return `<input type="button" title="${room_uuid}"
          onclick="showTTUEditorSlotsOfRoom('#ttu-editor-slots-list', '${room_uuid}', ' ${room_name}', '${order_uuid}')"
          class="btn btn-default room-list-view-item" value="${room_name}"/>`;
        }

function ttuEditorSlotsListViewElement(result, order_uuid) {
  return `<input type="button" title="${result.slot_uuid}"
          onclick="showTTUEditorRentAssistDatePicker('#ttu-editor-ra-datepicker', '${result.slot_uuid}', '${result.slot_name}', '${order_uuid}')"
          class="btn btn-default slot-list-view-item" value="${result.slot_name}"/>`;
}

function ttuEditorTimeScheduleSlotViewElement(hour, status, start_date, slot_uuid, slot_name, order_uuid) {
  var ampm;

  switch (hour) {
    case 7:
      ampm = "BUỔI SÁNG";
      break;
    case 12:
      ampm = "BUỔI CHIỀU";
      break;

    default:
      ampm = "LIÊN HỆ";
  }

  switch (status) {
    case "available":
      return `<div class="time-schedule-item" onclick="bbRentAssistentTTUEditorConfirmSlotOrder('${start_date}', '${slot_uuid}', '${slot_name}', '${order_uuid}')">${ampm} ${hour}:00 <span class="time-schedule-view-item-available">${NPACKR_ROOM_AVAILABLE_LABEL}</span></div>`;
    case "unavailable":
      return `<div class="time-schedule-item">${ampm} ${hour}:00 <span class="time-schedule-view-item-unavailable">${NPACKR_ROOM_UNAVAILABLE_LABEL}</span></div>`;
    default:
      return `<div class="time-schedule-view-item" id="ttu-editor-time-schedule-view-item-${hour}">${hour}:00</div>`;
  }
}