import { convertTo24hour } from "../../helpers/convertTime.js";
import businessModel from "../../models/business.model.js";

// const createbusiness = async (req, res) => {
//   const { name, email, startHour, endHour } = req.body;

//   const date = new Date();
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1;
//   const day = date.getDay();

//   const startTime24hr = convertTo24hour(startHour);
//   const endTime24hr = convertTo24hour(endHour);
//   const fullStartTime = `${year}-${"0" + month}-${"0" + day}T${startTime24hr}:00`;
//   const fullEndTime = `${year}-${"0" + month}-${"0" + day}T${endTime24hr}:00`;

//   try {
//     const business = await businessModel.create({
//       name,
//       email,
//       ownerId: req.user.userId,
//       startHour: fullStartTime,
//       endHour: fullEndTime,
//     });

//     if (!business) {
//       return res.status(404).json({
//         message: "Business not created",
//       });
//     }
//     res.status(201).json({
//       message: "Business created successfully",
//       business,
//     });
//   } catch (error) {
//     if (error === 11000) {
//       res.status(400).json({
//         message: "can't create business with same name and ownerId",
//         business,
//       });
//     }
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


const createBusiness = async (req, res) => {
  const { name, email, startHour, endHour } = req.body;

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); 
  const day = String(date.getDate()).padStart(2, "0");        

  const startTime24hr = convertTo24hour(startHour);
  const endTime24hr = convertTo24hour(endHour);

  const fullStartTime = `${year}-${month}-${day}T${startTime24hr}:00.000Z`; 
  const fullEndTime = `${year}-${month}-${day}T${endTime24hr}:00.000Z`;     

  try {
    const business = await businessModel.create({
      name,
      email,
      ownerId: req.user.userId,
      startHour: fullStartTime,
      endHour: fullEndTime,
    });

    return res.status(201).json({
      message: "Business created successfully",
      business,
    });

  } catch (error) {
    if (error.code === 11000) {                        
      return res.status(400).json({                     
        message: "Can't create business with same name and ownerId",
      });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export default createBusiness;
