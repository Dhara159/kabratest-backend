// Basic error handler to generalize try/catch block
const handleError = async ({ tryFunc, res }) => {
  try {
    await tryFunc();
  } catch (error) {
    res.status(400).json({
      data: error.stack,
      message: "The server threw an unxpected errror"
    });
  }
}

export default handleError;