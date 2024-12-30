const sequelize = require("../sequelize");
const { QueryTypes } = require("sequelize");

const getLatestServices = async (req, res) => {
  try {
    console.log("Executing query to fetch latest services...");

    const serviceQuery = `
      SELECT 
        ServiceID, 
        CategoryID, 
        Name, 
        Price, 
        DescriptionShort, 
        Description1, 
        ImageDescription
      FROM Services
      WHERE ServiceID <= 1000
      ORDER BY ServiceID DESC
      LIMIT 10;
    `;

    const services = await sequelize.query(serviceQuery, {
      type: QueryTypes.SELECT,
    });

    console.log("Query executed successfully. Results:", services);

    if (!services.length) {
      console.log("No services found in the database.");
      return res.status(404).json({ message: "No services found" });
    }

    res.status(200).json({
      message: "Latest services retrieved successfully",
      data: services,
    });
  } catch (error) {
    console.error("Error in getLatestServices:", error);
    res.status(500).json({
      message: "Something went wrong, please try again later.",
      details: error.message,
    });
  }
};

module.exports = { getLatestServices };
