import { ShortUniqueId } from "short-unique-id";


export function getUniqueId() {
  return Math.floor(Math.random() * 10000);
}

// for future use
function uniqueId() {
  const uid = new ShortUniqueId({ length: 10 });
  
  return uid.rnd()
}
