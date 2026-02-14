import queueModel from "../models/queue.model.js";

export function generateQueue(queue) {
  if (queue.length == 0) {
    return "Dont have any appointments in this business";
  }

  const newArr = [];

  queue.map((element, index) => {
    newArr.push({
      appointmentId: element._id,
      businessId: element.businessId,
      queueNumber: index + 1,
    });
  });

  return newArr;
}

// queueModel.insertMany()
