/*
  GLOBAL STRINGS VARIABLE by npackr
*/

/* ERROR DESCRIPTION */
const ERR_PREFIX_GENERAL = "NPACKR_ERR: ";
const DEBUG_PREFIX_GENERAL = "NPACKR_DEBUG_INFO: ";
const NPACKR_BB_NAME_UNDEFINDED = `${ERR_PREFIX_GENERAL}: Name of this bbAlert undefinded`;
const NPACKR_REST_API_ERROR = `${ERR_PREFIX_GENERAL} An error have occured when get result from REST API`;
const NPACKR_GET_BUILDING_LIST_FAILED_ERROR = `${ERR_PREFIX_GENERAL} No buildings found`;
const NPACKR_GET_ROOMS_LIST_FAILED_ERROR = `${ERR_PREFIX_GENERAL} No rooms found for this building`;
const NPACKR_INSERT_ORDER_FAILED_ERROR = `${ERR_PREFIX_GENERAL} An error have occured when insert order`;
const NPACKR_LOGIN_CREDENTIAL_EMPTY_ERROR = `${ERR_PREFIX_GENERAL} Username or password is empty`;
const NPACKR_LOG_IN_FAILED_ERROR = `${ERR_PREFIX_GENERAL} Login failed`;
const NPACKR_LOG_OUT_FAILED_ERROR = `${ERR_PREFIX_GENERAL} Log out unsuccessful`;
const NPACKR_SESSION_NOT_FOUND_ERROR = `${ERR_PREFIX_GENERAL} Session not found`;
const NPACKR_INSERT_SESSION_FAILED_ERROR = `${ERR_PREFIX_GENERAL} An error have occured when insert session`;
const NPACKR_GET_ALL_USERS_ORDER_HISTORY_FAILED_ERROR = `${ERR_PREFIX_GENERAL} An error have occured when get all users order history`;
const NPACKR_DELETE_ORDER_FAILED_ERROR = `${ERR_PREFIX_GENERAL} An error have occured when delete order`;
const NPACKR_EDIT_USER_INFO_FAILED_ERROR = `${ERR_PREFIX_GENERAL} An error have occured when edit user info`;

/* LABEL */
const NPACKR_ORDER_NOW_BUTTON_LABEL = 'Đặt phòng ngay';
const NPACKR_ORDER_LATER_BUTTON_LABEL = 'Suy nghĩ lại';
const NPACKR_ROOM_AVAILABLE_LABEL = '(có sẵn)';
const NPACKR_ROOM_UNAVAILABLE_LABEL = '(đã thuê)';
const NPACKR_RENT_ASSISTANT_LABEL = 'Trợ lý đặt hẹn';
const NPACKR_LOGIN_LABEL = 'Đăng nhập';
const NPACKR_LOGOUT_LABEL = 'Đăng xuất';
const NPACKR_USER_ORDER_HISTORY_LABEL = 'Lịch sử đặt phòng';
const NPACKR_USER_PROFILE_LABEL = 'Thông tin cá nhân';
const NPACKR_USER_ORDER_HISTORY_TITLE = 'Lịch sử đặt phòng';
const NPACKR_BB_CONFIRM_BUTTON_LABEL = 'Xác nhận';
const NPACKR_BB_CANCEL_BUTTON_LABEL = 'Quay lại';

/* ADMIN PANEL */
const NPACKR_ADMIN_PANEL_LABEL = 'Menu quản trị viên';
const NPACKR_ADMIN_ORDER_HISTORY = 'Quản lý đơn hàng';


/* ORDER STATUS */
const NPACKR_UNKNOWN_ORDER_STATUS = 'Không xác định';
const NPACKR_PENDING_ORDER_STATUS = 'Chờ xử lý';
const NPACKR_CONFIRMED_ORDER_STATUS = 'Đã xác nhận';
const NPACKR_CANCELLED_ORDER_STATUS = 'Đã hủy';
const NPACKR_FINISHED_ORDER_STATUS = 'Đã hoàn thành';

/* BOOTBOX TITLE */
const NPACKR_ROOM_HAVE_RENTED_BB_TITLE = '<span style="color: #f90;">Phòng này đã được cho thuê!</style>';
const NPACKR_ROOM_AVAILABLE_BB_TITLE = '<span style="color: green;">Phòng này đang có sẵn</style>';
const NPACKR_QUICK_ORDER_DIALOG_TITLE = '<span style="color: green;">Bạn có muốn đặt ngay?</style>';
const NPACKR_ORDER_MAKED_SUCCESSFULLY_BB_TITLE = '<span style="color: green;">Đặt phòng thành công!</style>';
const NPACKR_ORDER_MAKED_UNSUCCESSFULLY_BB_TITLE = '<span style="color: red;">Đặt phòng thất bại!</style>';
const NPACKR_LOG_IN_SUCCESSFULLY_BB_TITLE = '<span style="color: green;">Đăng nhập thành công!</style>';
const NPACKR_LOG_IN_UNSUCCESSFULLY_BB_TITLE = '<span style="color: red;">Đăng nhập thất bại!</style>';
const NPACKR_LOG_OUT_SUCCESSFULLY_BB_TITLE = '<span style="color: green;">Đăng xuất thành công!</style>';
const NPACKR_LOG_OUT_UNSUCCESSFULLY_BB_TITLE = '<span style="color: red;">Đăng xuất thất bại!</style>';
const NPACKR_COMMING_SOON_BB_TITLE = '<span style="color: green;">Tính năng vẫn đang phát triển</style>';
const NPACKR_ORDER_HISTORY_DELETE_CONFIRM_BB_TITLE = '<span style="color: red;">Xóa đơn đặt hẹn</span>';
const NPACKR_USER_CREATED_SUCCESSFULLY_BB_TITLE = '<span style="color: green;">Tạo tài khoản thành công!</span>';
const NPACKR_USER_CREATED_UNSUCCESSFULLY_BB_TITLE = '<span style="color: red;">Tạo tài khoản thất bại!</span>';
const NPACKR_RENT_ASSISTENT_CONFIRM_EDITING_ORDER_TIME_TO_USE_BB_TITLE = '<span style="color: orange;">Bạn đang thực hiện thay đổi lịch đặt</span>';

/* BOOTBOX MESSAGE */
const NPACKR_ROOM_HAVE_RENTED_BB_MESSAGE = 'Thời điểm mà bạn chọn đã được thuê bởi người khác, hãy chọn những thời điểm khác thứ xem';
const NPACKR_ROOM_AVAILABLE_BB_MESSAGE = 'Vui lòng thực hiện các bước kế tiếp theo hướng dẫn để đặt phòng';
const NPACKR_QUICK_ORDER_DIALOG_MESSAGE = 'Đừng để căn phòng còn trống bạn vừa tìm được vụt mất vào tay người khác, xác nhận đặt ngay căn phòng bạn vừa chọn?';
const NPACKR_ORDER_MAKED_SUCCESSFULLY_BB_MESSAGE = 'Bạn đã đặt thành công với mã đơn hàng:';
const NPACKR_ORDER_MAKED_UNSUCCESSFULLY_BB_MESSAGE = 'Vui lòng thử lại hoặc liên hệ với bộ phận chăm sóc khách hàng của chúng tôi để được hỗ trợ';
const NPACKR_LOG_IN_SUCCESSFULLY_BB_MESSAGE = 'Bạn đã đăng nhập thành công!';
const NPACKR_LOG_IN_UNSUCCESSFULLY_BB_MESSAGE = 'Đăng nhập thất bại, thông tin đăng nhập chưa chính xác, vui lòng kiểm tra lại hoặc liên hệ với bộ phận chăm sóc khách hàng của chúng tôi để được hỗ trợ';
const NPACKR_LOG_OUT_UNSUCCESSFULLY_BB_MESSAGE = 'Đăng xuất thất bại, vui lòng thử xóa cookies trình duyệt hoặc liên hệ với bộ phận chăm sóc khách hàng của chúng tôi để được hỗ trợ';
const NPACKR_LOG_OUT_CONFIRM_BB_TITLE = '<span style="color: green;">Bạn có muốn đăng xuất?</style>';
const NPACKR_LOG_OUT_CONFIRM_BB_MESSAGE = 'Bạn có muốn đăng xuất khỏi tài khoản?';
const NPACKR_COMMING_SOON_BB_MESSAGE = 'Tính năng này sẽ sớm được ra mắt, cùng chờ đợi nhé';
const NPACKR_ORDER_HISTORY_DELETE_CONFIRM_BB_MESSAGE = 'Bạn có chắc chắn muốn xóa đơn đặt hẹn này?';
const NPACKR_DELETE_ORDER_SUCCESSFULLY_BB_MESSAGE = 'Đã xóa đơn đặt hẹn thành công';
const NPACKR_EDIT_USER_INFO_SUCCESSFULLY_BB_MESSAGE = 'Đã cập nhật thông tin thành công';
const NPACKR_USER_CREATED_SUCCESSFULLY_BB_MESSAGE = 'Bạn đã tạo tài khoản thành công!';
const NPACKR_USER_CREATED_UNSUCCESSFULLY_BB_MESSAGE = 'Tạo tài khoản thất bại, vui lòng kiểm tra lại hoặc liên hệ bộ phận Hỗ trợ!';
const NPACKR_DOES_NOT_HAVE_ANY_ORDER_BB_MESSAGE = "Bạn chưa có đơn đặt hẹn nào";
const NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_EDITING_ORDER_TIME_TO_USE_BB_MESSAGE = 'Bạn có chắc chắn muốn sửa thông tin đặt phòng này trở thành';

/* RENT ASSISTANT */
const NPACKR_RENT_ASSIST_SELECT_BUILDING = "Bạn muốn thuê phòng ở địa điểm nào?";
const NPACKR_RENT_ASSIST_SELECT_ROOM = "Bạn muốn thuê phòng nào của ";
const NPACKR_RENT_ASSIST_SELECT_SLOT = "Hãy chọn một giường dưới đây để chọn thuê phòng";
const NPACKR_RENT_ASSIST_SELECT_DATE = "Hãy chọn một ngày mà bạn muốn thuê giường ";
const NPACKR_RENT_ASSIST_SELECT_TIME = "Hãy chọn một thời gian có sẵn dưới đây để chọn thuê giường";
const NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_TITLE = "Xác nhận đặt giường ";
const NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_MESSAGE = "Bạn có chắc chắn muốn đặt giường tại phòng này vào khoảng thời gian ";
const NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_CONFIRM_BUTTON_LABEL = "Đặt giường";
const NPACKR_RENT_ASSISTENT_CONFIRM_ORDER_BB_CANCEL_BUTTON_LABEL = "Khoan đã";


/* ALL USER ORDER HISTORY */
const ALL_USER_ORDER_HISTORY_NUMBER_TITLE = 'Mã đơn';
const ALL_USER_ORDER_HISTORY_PERSON_TITLE = 'Người đặt';
const ALL_USER_ORDER_HISTORY_ACTION_TITLE = 'Thao tác';
const ALL_USER_ORDER_HISTORY_TIME_USING_TITLE = 'Thời gian dùng';
const ALL_USER_ORDER_HISTORY_PHONE_NUMBER_TITLE = 'Số điện thoại';
const ALL_USER_ORDER_HISTORY_SLOT_TITLE = 'Giường';
const ALL_USER_ORDER_HISTORY_ROOM_TITLE = 'Phòng';
const ALL_USER_ORDER_HISTORY_ROOM_TYPE = 'Loại';
const NPACKR_GENERAL_ROOM_TYPE = 'Thường';
const NPACKR_VIP_ROOM_TYPE = 'VIP';
const NPACKR_OTHER_ROOM_TYPE = 'Khác';

/* ALL USER ORDER EDITOR */
const NPACKR_ADMIN_ORDER_EDITOR_TITLE = 'Chỉnh sửa đơn đặt hẹn';
const NPACKR_ADMIN_ORDER_EDITOR_ORDER_ID = 'Mã đơn hàng';
const NPACKR_ADMIN_ORDER_EDITOR_ORDER_TIME = 'Thời gian đặt';
const NPACKR_ADMIN_ORDER_EDITOR_ORDER_UPDATED = 'Thời gian cập nhật';
const NPACKR_ADMIN_ORDER_EDITOR_ORDER_USER_NAME = 'Tên người đặt';
const NPACKR_ADMIN_ORDER_EDITOR_ORDER_USER_PHONENUMBER = 'Số điện thoại';
const NPACKR_ADMIN_ORDER_EDITOR_USER_ID = 'Mã người đặt';