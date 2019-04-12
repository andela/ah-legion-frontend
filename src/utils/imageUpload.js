import axios from 'axios';

const uploadImageCallBack = (file) => {
  try {
    const url = 'https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/duqtwq297/image/upload';
    const formData = new FormData();
    const headers = { 'Content-Type': 'application/x-wwww-form-urlencoded' };
    formData.append('file', file);
    formData.append('upload_preset', 'rachelle');
    return axios.post(url, formData, { headers });
  } catch (err) {
    return err;
  }
};
export default uploadImageCallBack;
