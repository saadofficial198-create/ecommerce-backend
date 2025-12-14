const home = () => {
  try {
    res.send("Home");
  } catch (error) {
    console.error(error);
  }
};
module.exports = home;