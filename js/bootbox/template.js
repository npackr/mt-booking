/*
  UI BOOTBOX FUNCTIONS by npackr
    Dependencies: BootboxJS
*/

function bbAlert(name) {
  switch (name) {
    case 'commingSoon':
      bootbox.alert({
        title: NPACKR_COMMING_SOON_BB_TITLE,
        message: NPACKR_COMMING_SOON_BB_MESSAGE,
        centerVertical: true,
      });
      break;

    case 'roomHaveRented':
      bootbox.alert({
        size: 'large',
        title: NPACKR_ROOM_HAVE_RENTED_BB_TITLE,
        message: NPACKR_ROOM_HAVE_RENTED_BB_MESSAGE,
        callback: function () { }
      });
      break;

    case 'roomAvailable':
      bootbox.alert({
        size: 'large',
        title: NPACKR_ROOM_AVAILABLE_BB_TITLE,
        message: NPACKR_ROOM_AVAILABLE_BB_MESSAGE,
        callback: function () {
          bbAlert('quickOrderDialog');
        }
      });
      break;

    case 'quickOrderDialog':
      bootbox.dialog({
        size: 'large',
        title: NPACKR_QUICK_ORDER_DIALOG_TITLE,
        message: NPACKR_QUICK_ORDER_DIALOG_MESSAGE,
        buttons: {
          true: {
            label: NPACKR_ORDER_LATER_BUTTON_LABEL,
            className: 'btn-default',
            callback: function () {

            }
          },
          false: {
            label: NPACKR_ORDER_NOW_BUTTON_LABEL,
            className: 'btn-success',
            callback: () => {
              createOrder(input_start_date, input_end_date, testing_room_uuid, testing_user_uuid);
            }
          }
        }
      });
      break;

    case "createOrderSuccessfully":
      bootbox.alert({
        size: 'large',
        title: NPACKR_ORDER_MAKED_SUCCESSFULLY_BB_TITLE,
        message: NPACKR_ORDER_MAKED_SUCCESSFULLY_BB_MESSAGE,
        callback: function () {
        }
      });
      break;

    case "createOrderUnsuccessfully":
      bootbox.alert({
        size: 'large',
        title: NPACKR_ORDER_MAKED_UNSUCCESSFULLY_BB_TITLE,
        message: NPACKR_ORDER_MAKED_UNSUCCESSFULLY_BB_MESSAGE,
        callback: function () {
        }
      });
      break;

    case "createUserSuccessfully":
      bootbox.alert({
        centerVertical: true,
        title: NPACKR_USER_CREATED_SUCCESSFULLY_BB_TITLE,
        message: NPACKR_USER_CREATED_SUCCESSFULLY_BB_MESSAGE,
        callback: function () {
        }
      });
      break;

    case "createUserUnsuccessfully":
      bootbox.alert({
        centerVertical: true,
        title: NPACKR_USER_CREATED_UNSUCCESSFULLY_BB_TITLE,
        message: NPACKR_USER_CREATED_UNSUCCESSFULLY_BB_MESSAGE,
        callback: function () {
        }
      });
      break;

    case "logInSuccessfully":
      bootbox.alert({
        title: NPACKR_LOG_IN_SUCCESSFULLY_BB_TITLE,
        message: NPACKR_LOG_IN_SUCCESSFULLY_BB_MESSAGE,
        centerVertical: true,
        callback: function () {
          location.reload();
        }
      });
      break;

    case "logInUnsuccessfully":
      bootbox.alert({
        title: NPACKR_LOG_IN_UNSUCCESSFULLY_BB_TITLE,
        message: NPACKR_LOG_IN_UNSUCCESSFULLY_BB_MESSAGE,
        centerVertical: true,
        callback: function () {
          showLoginModal();
        }
      });
      break;

    case "logOutUnsuccessfully":
      bootbox.alert({
        title: NPACKR_LOG_OUT_UNSUCCESSFULLY_BB_TITLE,
        message: NPACKR_LOG_OUT_UNSUCCESSFULLY_BB_MESSAGE,
        callback: function () {
          location.reload();
        }
      });
      break;
    
    case "deleteOrderSuccessfully":
      bootbox.alert({
        centerVertical: true,
        message: NPACKR_DELETE_ORDER_SUCCESSFULLY_BB_MESSAGE,
        callback: function () {
          showAdminOrderHistoryModal();
        }
      });
      break;

    case "doesNotHaveAnyOrder":
      bootbox.alert({
        centerVertical: true,
        message: NPACKR_DOES_NOT_HAVE_ANY_ORDER_BB_MESSAGE,
        callback: function () {
        }
      });

    default:
      console.log();
  }
}

function bbCustomAlert(title, message) {
  bootbox.alert({
    size: 'large',
    title: title,
    message: message,
    callback: function () {

    }
  });
}

function bbRadioSelector(title, message, selection) {

  for (i = 0; i < selection.length; i++) {
    selection[i] = {
      text: selection[i],
      value: selection[i]
    }
  }

  bootbox.prompt({
    title: title,
    message: message,
    inputType: 'radio',
    inputOptions: selection,
    callback: function (result) {

    }
  });
}

function bbOrderMakedSuccessfullyAlert(order_id, item_uuid, item_name, user_uuid) {
  bootbox.alert({
    size: 'large',
    title: NPACKR_ORDER_MAKED_SUCCESSFULLY_BB_TITLE,
    message: NPACKR_ORDER_MAKED_SUCCESSFULLY_BB_MESSAGE + `<br>${order_id}`,
    centerVertical: true,
    callback: function () {
      var input_date = $("#ra-datepicker-input").val();
      if (input_date != "") {
        showSlotTimeSchedule('#time-schedule', item_uuid, item_name, createAsDate(new Date(input_date)), user_uuid);
      } else {
        showTimeSchedule('#time-schedule', item_uuid, item_name, createAsDate(new Date(input_date)), user_uuid);
      }
    }
  });
}

function bbRentAssistentConfirmOrder(start_date, slot_uuid, slot_name, user_uuid) {
  var start_time = startDateTransforming(start_date);
  var end_time = endTimeByAmPmTransforming(start_date);

  bootbox.dialog({
    title: NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_TITLE + slot_name,
    message: `${NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_MESSAGE}
              <b>${start_time}</b> -> <b>${end_time}</b>`,
    centerVertical: true,
    buttons: {
      true: {
        label: NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_CONFIRM_BUTTON_LABEL,
        className: 'btn-success',
        callback: function () {
          createSlotOrder(start_time, end_time, slot_uuid, user_uuid, slot_name, "", "");
        }
      },
      false: {
        label: NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_CANCEL_BUTTON_LABEL,
        className: 'btn-default',
        callback: function () {

        }
      }
    }
  })
}

function bbRentAssistentConfirmSlotOrder(start_date, slot_uuid, slot_name, user_uuid) {
  var start_time = startDateTransforming(start_date);
  var end_time = endTimeByAmPmTransforming(start_date);

  bootbox.dialog({
    title: NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_TITLE + slot_name,
    message: `${NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_MESSAGE}
              <b>${start_time}</b> -> <b>${end_time}</b>`,
    centerVertical: true,
    buttons: {
      true: {
        label: NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_CONFIRM_BUTTON_LABEL,
        className: 'btn-success',
        callback: function () {
          createSlotOrder(start_time, end_time, slot_uuid, user_uuid, slot_name, "", "");
        }
      },
      false: {
        label: NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_CANCEL_BUTTON_LABEL,
        className: 'btn-default',
        callback: function () {

        }
      }
    }
  })
}

function bbRentAssistentTTUEditorConfirmSlotOrder(start_date, slot_uuid, slot_name, order_uuid) {
  var start_time = startDateTransforming(start_date);
  var end_time = endTimeByAmPmTransforming(start_date);

  bootbox.dialog({
    title: NPACKR_RENT_ASSISTENT_CONFIRM_EDITING_ORDER_TIME_TO_USE_BB_TITLE,
    message: `${NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_EDITING_ORDER_TIME_TO_USE_BB_MESSAGE}<br/>
              Giường mới: <b>${slot_name}</b><br/>
              Thời gian mới: <b>${start_time}</b> -> <b>${end_time}</b>`,
    centerVertical: true,
    buttons: {
      true: {
        label: NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_CONFIRM_BUTTON_LABEL,
        className: 'btn-success',
        callback: function () {
          updateNewTimeToUseforSlot(slot_uuid, start_time, end_time, order_uuid);
        }
      },
      false: {
        label: NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_CANCEL_BUTTON_LABEL,
        className: 'btn-default',
        callback: function () {

        }
      }
    }
  })
}

function logOutConfirm(user_name) {
  bootbox.confirm({
    title: NPACKR_LOG_OUT_CONFIRM_BB_TITLE,
    message: `${user_name}, ${NPACKR_LOG_OUT_CONFIRM_BB_MESSAGE}`,
    centerVertical: true,
    buttons: {
      confirm: {
        label: NPACKR_BB_CONFIRM_BUTTON_LABEL,
        className: 'btn-success'
      },
      cancel: {
        label: NPACKR_BB_CANCEL_BUTTON_LABEL,
        className: 'btn-default'
      }
    },
    callback: function (result) {
      if (result) {
        logOut();
      }
    }
  });
}

function deleteOrderConfirm(order_uuid) {
  bootbox.confirm({
    title: NPACKR_ORDER_HISTORY_DELETE_CONFIRM_BB_TITLE,
    message: NPACKR_ORDER_HISTORY_DELETE_CONFIRM_BB_MESSAGE,
    centerVertical: true,
    buttons: {
      confirm: {
        label: NPACKR_BB_CONFIRM_BUTTON_LABEL,
        className: 'btn-danger'
      },
      cancel: {
        label: NPACKR_BB_CANCEL_BUTTON_LABEL,
        className: 'btn-default'
      }
    },
    callback: function (result) {
      if (result) {
        deleteOrder(order_uuid);
      }
    }
  });
}

function bbOrderInfoEditSuccessfully(order_uuid) {
  bootbox.alert({
    message: NPACKR_EDIT_USER_INFO_SUCCESSFULLY_BB_MESSAGE + `<br>${order_uuid}`,
    centerVertical: true,
    callback: function () {
      showAdminOrderEditorModal(order_uuid);
    }
  });
}

function bbOrderTimeToUseEditSuccessfully(order_uuid) {
  bootbox.alert({
    message: NPACKR_EDIT_USER_INFO_SUCCESSFULLY_BB_MESSAGE + `<br>${order_uuid}`,
    centerVertical: true,
    callback: function () {
      showAdminOrderHistoryModal();
    }
  });
}