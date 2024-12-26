const dashboardServices = require("../../services/dashboard/dashboard.service");


class dashboardController {
    getFullNameController = async(req,res) => {
        const { username } = req.params;
        try {
            const fullName = await dashboardServices.getFullName(username);
            console.log(fullName);

            if (!fullName || fullName.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }
            res.status(200).json({
                fullName
            });
        }catch (error) 
        {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    countBookingController = async(req,res) => {
        try {
            const count = await dashboardServices.countBooking();
            console.log(count);

            if (!count || count.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }
            res.status(200).json({
                count
            });
        }catch (error) 
        {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    countStaffController = async(req,res) => {
        try {
            const count = await dashboardServices.countStaff();
            console.log(count);

            if (!count || count.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }
            res.status(200).json({
                count
            });
        }catch (error) 
        {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    countServiceController = async(req,res) => {
        try {
            const count = await dashboardServices.countService();
            console.log(count);

            if (!count || count.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }
            res.status(200).json({
                count
            });
        }catch (error) 
        {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };
    sumTotalController = async(req,res) => {
        try {
            const sumTotal = await dashboardServices.sumTotal();
            console.log(sumTotal);

            if (!sumTotal || sumTotal.length === 0) {
                return res.status(404).json({ message: "No data found." });
            }
            res.status(200).json({
                sumTotal
            });
        }catch (error) 
        {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    };

}

module.exports= new dashboardController();