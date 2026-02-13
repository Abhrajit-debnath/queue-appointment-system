    import staffModel from "../../models/staff.model.js";

    const createStaff = async (req, res) => {
    const { name,businessId } = req.body;

    try {
        const staff = await staffModel.create({
        name,
        businessId,
        });

        if (!staff) {
        res.status(500).json({
            message: "Staff not created",
        });
        }

        res.status(201).json({
        message: "Staff created successfully",
        staff,
        });
    } catch (error) {

        if (error.code == 11000) {
                res.status(500).json({ message: "Can't create staff with same name and businessId" });
        }
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    };

    export default createStaff;
