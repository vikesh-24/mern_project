import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { toast } from 'react-toastify';
import { stringAvatar } from './Dashboard';
import Loader from '../../components/Loader/Loader';
import { useAuth } from '../common/AuthContext';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

// Use Tailwind CSS classes
const CenteredContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '65vh',
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

// React functional component
const UserProfile = () => {
  const { logout, userRole } = useAuth();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    role: '',
  });
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    mobile: '',
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

  const handleDialogClose = () => {
    setOpenUpdateDialog(false);
    // Reset validation errors
    setValidationErrors({
      email: '',
      mobile: '',
    });
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/one/${updateFormData._id}`, updateFormData);
      if (result) {
        getUserDetails();
        toast.success('User Updated Successfully');
        handleDialogClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/loggedInUser`);
      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('user profile not found.');
      } else {
        // toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/one/${id}`);

      if (result) {
        toast.warning('User Deleted Successfully');
        logout();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      refreshPage();
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateMobile = (mobile) => {
    // Basic phone number validation regex
    const regex = /^\d{10}$/;
    return regex.test(mobile);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({
      ...updateFormData,
      [name]: value,
    });

    // Perform validation on each change
    if (name === 'email') {
      if (!validateEmail(value)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Invalid email address',
        }));
      } else {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          email: '',
        }));
      }
    } else if (name === 'mobile') {
      if (!validateMobile(value)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          mobile: 'Invalid mobile number',
        }));
      } else {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          mobile: '',
        }));
      }
    }
  };

  return (
    <CenteredContainer container>
      {!isLoading ? (
        <>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <ProfilePaper elevation={3}>
              {/* Avatar */}
              <Avatar
                {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                sx={{ width: 100, height: 100, margin: '0 auto' }}
              />

              <Typography variant="h5" sx={{ marginTop: 1 }}>
                {user.firstName} {user.lastName}
              </Typography>

              <Typography variant="caption" display="block" sx={{ marginBottom: 1 }}>
                {user.role}
              </Typography>

              <Divider sx={{ marginBottom: 2 }} />

              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <span style={{ fontWeight: 'bold', color: '#444' }}>Email:</span> {user.email}
              </Typography>

              {/* Phone Number */}
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                <span style={{ fontWeight: 'bold', color: '#444' }}>Phone:</span> {user.mobile}
              </Typography>

              {/* Created Date */}
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <span style={{ fontWeight: 'bold', color: '#444' }}>Create Date:</span>{' '}
                {new Date(user.createdAt).toLocaleString()}
              </Typography>

              <div>
                <Button onClick={() => handleUpdateUser(user)}>Edit</Button>
                <Button color="error" onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </Button>
              </div>
            </ProfilePaper>
          </Grid>
        </>
      ) : (
        <Loader />
      )}
      <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Details</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="outlined-read-only-input"
            label="First Name"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleFormChange}
            name="firstName"
            value={updateFormData.firstName}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Last Name"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleFormChange}
            name="lastName"
            value={updateFormData.lastName}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Contact No"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleFormChange}
            name="mobile"
            value={updateFormData.mobile}
            error={!!validationErrors.mobile}
            helperText={validationErrors.mobile}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleFormChange}
            name="email"
            value={updateFormData.email}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary">
            Submit
          </Button>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </CenteredContainer>
  );
};

export default UserProfile;
