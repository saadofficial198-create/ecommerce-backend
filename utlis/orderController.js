const formatCustomDate = () => {
  const now = new Date();

  const year = now.getFullYear().toString().slice(-2);
  const monthIndex = now.getMonth();
  const monthNum = monthIndex + 1;
  const monthShort = now.toLocaleString("en-US", { month: "short" });
  const monthLong = now.toLocaleString("en-US", { month: "long" });

  const dayNum = now.getDate();
  const dayShort = now.toLocaleString("en-US", { weekday: "short" });
  const dayLong = now.toLocaleString("en-US", { weekday: "long" });

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  const hour12 = (now.getHours() % 12 || 12).toString();
  const ampm = now.getHours() >= 12 ? "PM" : "AM";

  return {
    year: parseInt(year),
    month: [monthNum, monthShort, monthLong],
    day: [dayNum, dayShort, dayLong],
    time: [
      `${hours}:${minutes}`,          // 24hr format e.g. "22:15"
      `${hour12}:${minutes} ${ampm}` // 12hr format e.g. "10:15 PM"
    ]
  };
};

module.exports = formatCustomDate;