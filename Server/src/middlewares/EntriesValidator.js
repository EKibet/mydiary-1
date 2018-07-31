import Validator from './validators/Validator';
/**
 * @exports EntriesValidator
 * @class EntriesValidator
 * @description Handles all entries validation
 * Status code tip gotten from https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 * */
class EntriesValidator {

  /**
   * Validates values for create entry rout
   * @param  {req} req - Request object
   * @param {res} res - Request object
   * @param {next} next - calls next middleware
   * @return {res} Returns the user token
   * @static
   */
  static validateCreateEntry(req, res, next) {
    const {
      title,
      story,
    } = req.body;
    if (!title || !story) {
      return res.status(400).json({
        status: 'error',
        message: 'Bad request, all filed must be filled',
      })
    }
    console.log(Validator.isEmpty(title))
    if (Validator.isEmpty(title) || Validator.isEmpty(story)) {
      return res.status(400).json({
        status: 'error',
        message: 'please ensure you provide a Title and a Story'
      })
    }
    if (!Validator.isMaxLen(title) || !Validator.isMaxLen(story)) {
      return res.status(400).json({
        status: 'error',
        message: 'Fields length must not be less than five',
      })
    }

    req.body = {
      title: title.trim(),
      story: story.trim(),
    }

    return next();
  }


}

export default EntriesValidator;