export function generateQueue(queue) {
  if (queue.length === 0) {
    return []; 
  }

  return queue.map((element, index) => ({ 
    appointmentId: element._id,
    businessId: element.businessId,
    queueNumber: index + 1,
    status: "pending",
  }));
}