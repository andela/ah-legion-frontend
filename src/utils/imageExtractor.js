import validator from 'validator';

const extractImageFromBody = (bodyField) => {
  try {
    let body = bodyField;
    body = validator.unescape(body);
    const quotationSymbol = body.indexOf('<img src="') !== -1 ? '"' : "'";
    const start = `<img src=${quotationSymbol}`;
    const startIndex = body.indexOf(start) + start.length;
    const endIndex = body.indexOf(`${quotationSymbol}`, startIndex);
    const imageUrlFormatted = body.substr(startIndex, endIndex - startIndex);
    return imageUrlFormatted;
  } catch (err) {
    return '';
  }
};
export default extractImageFromBody;
