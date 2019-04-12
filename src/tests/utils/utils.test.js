import extractImageFromBody from '../../utils/imageExtractor';
import unixTimeToDate from '../../utils/dateFormatter';
import uploadImageCallBack from '../../utils/imageUpload';

test('Should extract an image url from the body', () => {
  const body = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do </p><img src="https://res.cloudinary.com/dzqvfes/image/upload/v1552053108/pokeball.jpg" alt="ball" /><p>Duis aute irure dolor in reprehenderit in voluptate velit</p>';
  expect(extractImageFromBody(body)).toEqual(
    'https://res.cloudinary.com/dzqvfes/image/upload/v1552053108/pokeball.jpg',
  );
});
test('Should return empty when there is no image url from the body', () => {
  const body = '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <p>Duis aute irure dolor in reprehenderit in voluptate velit</p>';
  expect(extractImageFromBody(body)).toEqual(
    '',
  );
});
test('Should format unix timestamp to date', () => {
  const dbField = '2019-04-09T21:00:50.075276+03:00';
  expect(unixTimeToDate(dbField)).toEqual('Tue Apr 09 2019');
});

test('expect image to be defined', () => {
  const props = {
    image: 'images/pokeball',
  };
  expect(uploadImageCallBack(props)).toBeDefined();
});
