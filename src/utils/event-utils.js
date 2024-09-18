function createEventId() {
  const timestamp = Date.now(); // Lấy timestamp hiện tại
  const randomNum = Math.floor(Math.random() * 10000); // Số ngẫu nhiên từ 0 đến 9999
  const uniqueId = `${timestamp}-${randomNum}`; // Kết hợp timestamp và số ngẫu nhiên
  return uniqueId;
}

const createTextColor = (bgColor) => {
  if (bgColor === "#E4F6ED" || bgColor === "#FFE4C8") {
    return "#000000";
  } else {
    return "#FFFFFF";
  }
};

export function createEvent(
  title,
  start,
  end,
  allDay,
  color,
  avatarSrc,
  clientName,
  clientEmail
) {
  if (!clientName) {
    return {
      id: createEventId(),
      backgroundColor: color,
      textColor: createTextColor(color),
      title,
      start: start,
      end: end,
      allDay: allDay,
    };
  } else {
    return {
      id: createEventId(),
      backgroundColor: color,
      textColor: createTextColor(color),
      title,
      start: start,
      end: end,
      allDay: allDay,
      client: {
        name: clientName,
        email: clientEmail,
        avatar: avatarSrc,
      },
    };
  }
}
