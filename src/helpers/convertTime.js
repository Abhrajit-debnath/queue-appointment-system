export function convertTo24hour(time12hr) {
  let [time, modifierRaw] = time12hr.trim().split(" ");

  const modifier = modifierRaw.toLowerCase();

  let [hours, minutes] = time.split(":");

  hours = parseInt(hours, 10);

if (modifier === "am" && hours === 12) {
    hours = 0;
  }

  if (modifier === "pm" && hours !== 12) {
    hours += 12;
  }

  return `${String(hours).padStart(2, 0)}:${minutes}`;
}

