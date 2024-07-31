import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'; // Import MUI components
import { Delete } from '@mui/icons-material'; // Import MUI Delete icon
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { RadioGroup, FormLabel, Radio, FormControlLabel, FormGroup } from '@mui/material';

export default function AddDriver() {

  const [users, setUsers] = useState([]);
  const [openSignupDialog, setOpenSignupDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    role: 'driver',
  });

  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    role: '',
  });

  const handleUpdateUser = (row) => {
    setOpenUpdateDialog(true);
    setUpdateFormData({
      _id: row._id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      mobile: row.mobile,
      role: row.role,

    });
  };

  // Function to handle opening dialog for signup
  const handleSignupDialogOpen = () => {
    setOpenSignupDialog(true);
  };

  const handleCreateUser = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Use this function to handle changes in checkboxes
  const handleCheckboxChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Function to handle closing dialogs
  const handleDialogClose = () => {
    setOpenSignupDialog(false);
    setOpenUpdateDialog(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobile: '',
      role:'',
    });
  };

  const handleSubmit = async () => {
    try {
      const result = await authAxios.post(`${apiUrl}/register`, formData);
      if (result) {
        toast.success('Driver Account created successfully!');
      }
      getUsers();
      setOpenSignupDialog(false);
    } catch (error) {
      // console.log(result);
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/one/${updateFormData._id}`, updateFormData);
      if (result) {
        getUsers();
        toast.success('Driver Account Updated Successfully!');
        handleDialogClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/one/${id}`);

      if (result) {
        getUsers();
        toast.warning('Driver Account Deleted Successfully!');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  const getUsers = async (nameFilter) => {
    try {
      const res = await authAxios.get(`${apiUrl}/all`);
      if (nameFilter) {
        const lowercaseFilter = nameFilter.toLowerCase(); // Convert filter to lowercase
        setUsers(res.data.filter(user => user.firstName.toLowerCase() === lowercaseFilter));
      } else {
        setUsers(res.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Driver Accounts not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred while getting Driver Accounts!');
      }
    }
  };
  

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl text-center my-4">Manage Drivers</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" style={{ marginBottom: '20px' }} onClick={handleSignupDialogOpen}>Add Driver</Button>
        <TextField id="search" label="Search by Name" variant="outlined" size="small" onChange={(e) => getUsers(e.target.value)} />
      </div>
      {
        !isLoading ? <>
          <TableContainer component={Paper} style={{ maxWidth: '800px', margin: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact No</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.filter(user => user.role == 'driver').map(user => (
                  <TableRow key={user._id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button size='small' variant="outlined" color="primary" className="mr-2" onClick={() => handleUpdateUser(user)}>Update</Button>
                      <Button size='small' variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDeleteUser(user._id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </> : <Loader />}
      {/* Signup Dialog */}
      <Dialog open={openSignupDialog} onClose={handleDialogClose}>
        <DialogTitle>Add New Driver</DialogTitle>
        <DialogContent>
          <form>
            <TextField required label="First Name" margin="normal" name="firstName" value={formData.firstName} onChange={(e) => handleCreateUser('firstName', e.target.value)} fullWidth />
            <TextField required label="Last Name" margin="normal" name="lastName" value={formData.lastName} onChange={(e) => handleCreateUser('lastName', e.target.value)} fullWidth />
            <TextField required label="Contact No" margin="normal" name="mobile" value={formData.mobile} onChange={(e) => handleCreateUser('mobile', e.target.value)} fullWidth />
            <TextField required label="Email" margin="normal" name="email" value={formData.email} onChange={(e) => handleCreateUser('email', e.target.value)} fullWidth />
            <TextField required label="Password" margin="normal" name="password" value={formData.password} onChange={(e) => handleCreateUser('password', e.target.value)} fullWidth />
            <TextField required label="role" margin="normal" name="role" value={formData.role} defaultValue="driver" disabled onChange={(e) => handleCreateUser('role', e.target.value)} fullWidth />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
      {/* Update Dialog */}
      <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Driver</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="outlined-read-only-input"
            label="First Name"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, firstName: e.target.value })}
            value={updateFormData.firstName}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Last Name"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, lastName: e.target.value })}
            value={updateFormData.lastName}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Contact No"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, mobile: e.target.value })}
            value={updateFormData.mobile}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, email: e.target.value })}
            value={updateFormData.email}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Role"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, role: e.target.value })}
            value={updateFormData.role}
            defaultValue="driver"
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary">Submit</Button>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
