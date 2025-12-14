const contactModle = require("../modles/contact-modle");

const contact = async (req, res, next) => {
  try {
    const data = req.body;
    const contactData = await contactModle.create(data);
    if (!contactData) {
      const err = {
        status: 500,
        message: "Some Thing Rong Please Try Again",
      };
      next(err);
    }
    const mes = {
      status: 200,
      message: "Data send successfully",
    };
    next(mes);
  } catch (error) {
    const err = {
      status: 500,
      message: "Interal Server Error",
    };
    next(err);
  }
};

module.exports = contact;
