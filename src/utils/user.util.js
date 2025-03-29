import axios from 'axios';

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:4000/users')
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

export const getUser = async (id) => {
  const response = await axios.get(`http://localhost:4000/users/${id}`);
  return response.data;
}

export const createUser = async (data) => {
  await axios.post(`http://localhost:4000/users`, data)
}

export const updateUser = async (id, data) => {
  await axios.patch(`http://localhost:4000/users/${id}`, data)
}

export const deleteUser = async (id) => {
  await axios.delete(`http://localhost:4000/users/${id}`)
}

export const checkLogin = async (email, password) => {
  const response = await axios.get(`http://localhost:4000/users/?email=${email}&password=${password}`);
  if (response.data.length === 0) {
    return null;
  }
  return response.data[0];
}

export const updateAttendance = async (id, data) => {
    try {
        await axios.patch(`http://localhost:4000/users/${id}`, { attendance: data.attendance });
        console.log("✅ Data updated successfully!");
    } catch (error) {
        console.error("❌ Error updating attendance:", error);
    }
};

export const fetchUser = async (userId) => {
  const response = await fetch(`http://localhost:4000/users/${userId}`);
  if (!response.ok) {
      throw new Error('Failed to fetch user data');
  }
  return await response.json();
};