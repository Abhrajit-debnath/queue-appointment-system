export function CheckAndDelete(queue) {
   return queue.filter((item)=>item.status !== "completed")
}