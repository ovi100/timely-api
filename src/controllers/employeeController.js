import Employee from "../models/Employee.js";

const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date);

/** GET /api/employees */
export const getEmployees = async (req, res) => {
  try {

    const { from, to, id, order } = req.query;
    const query = {}, sort = {};
    const errorObject = { status: false, message: "Date must be YYYY-MM-DD format" };

    if (id) query.staff_id = id;

    if (order) sort.date = order.toLowerCase() === "asc" ? 1 : -1;

    if (from || to) {
      query.date = {};
      if (from) {
        if (!isValidDate(from)) {
          return res.status(400).json(errorObject);
        }
        query.date.$gte = new Date(from).toISOString();
      }
      if (to) {
        if (!isValidDate(to)) {
          return res.status(400).json(errorObject);
        }
        query.date.$lte = new Date(to).toISOString();
      }
    }

    console.log(query) //{ date: { '$gte': '2023-06-10', '$lte': '2023-06-20' } }

    const employees = await Employee.find(query).sort(sort).lean();
    res.json({ employees, status: employees.length > 0 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

/** POST /api/employees */
export const createEmployee = async (req, res) => {
  try {
    await Employee.create(req.body);
    return res.json({ status: true, message: "Employee added successfully" });
  } catch (e) {
    return res.status(400).json({ status: false, message: e.message });
  }
};

/** GET /api/employees/:id
 *  Returns today's record if exists, else latest by date (desc).
 */
export const getEmployeeById = async (req, res) => {
  const { id } = req.params;
  const presentDate = new Date().toISOString().split("T")[0];

  const exists = await Employee.exists({ staff_id: id });
  if (!exists) {
    return res.status(401).json({ status: false, message: "Unauthorized employee" });
  }

  let employee = await Employee.findOne({ staff_id: id, date: presentDate }).lean();
  if (!employee) {
    employee = await Employee.findOne({ staff_id: id }).sort({ date: -1 }).lean();
  }

  return res.json({ employee: employee || null, status: Boolean(employee) });
};

/** PATCH /api/employees/:id
 *  Update today's record for this staff_id using $set body
 */
export const updateEmployeeToday = async (req, res) => {
  const { id } = req.params;
  const date = new Date();
  const from = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
  const to = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));

  const exists = await Employee.exists({ staff_id: id });
  if (!exists) {
    return res.status(401).json({ status: false, message: "Unauthorized employee" });
  }

  const result = await Employee.updateOne(
    {
      staff_id: id,
      date: { $gte: from, $lte: to }
    },
    { $set: req.body }
  );

  if (result.modifiedCount || result.matchedCount) {
    return res.json({ status: true, message: "Employee is updated successfully" });
  }

  return res.json({ status: false, message: "Employee isn't updated successfully" });
};



/** DELETE /api/employees/:id */
export const deleteEmployeeById = async (req, res) => {
  const { id } = req.params;

  const exists = await Employee.exists({ staff_id: id });
  if (!exists) {
    return res.status(404).json({ status: false, message: "Employee not found" });
  }

  const result = await Employee.deleteMany({ staff_id: id }); // delete all records for given staff_id
  if (result.deletedCount > 0) {
    return res.json({ status: true, message: "Employee is deleted successfully" });
  }
  return res.json({ status: false, message: "Employee isn't deleted successfully" });
};
