export function CheckTime(appointmentTime, startHours, endHours) {
  const appTime = appointmentTime.toISOString().slice(11, 16);
  const startTime = startHours.toISOString().slice(11, 16);
  const endTime = endHours.toISOString().slice(11, 16);

  return appTime >= startTime && appTime <= endTime;
}
