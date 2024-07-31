import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../../utils/Constants";
import authAxios from "../../utils/authAxios";
import { toast } from "react-toastify";
import { Box, Container, Typography, Paper, TextField } from '@mui/material';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Delete, Money, Report, ShoppingBasket, Visibility } from "@material-ui/icons";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const OrderSchedule = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // eslint-disable-next-line no-unused-vars
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [open2, setOpen2] = useState(false);
  const [orders, setOrders] = useState([]);
  const [payment, setPayment] = useState({
    email: '',
    name: '',
    cardNo: '',
  });

  const handleClickOpen = (row) => {
    setPayment({
      email: row.paymentId.email,
      name: row.paymentId.name,
      cardNo: row.paymentId.cardNo,
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getOrders = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/order/all`);
      setOrders(res.data);
      console.log(orders) // Directly set favorites to the array of favorites
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Orders is Empty');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const removeOrder = async (itemId) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/order/${itemId}`);
      if (result) {
        toast.success("Removed");
        getOrders();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




  const handleStatusChange = async (id, newStatus) => {
    try {
      const result = await authAxios.put(`${apiUrl}/order/${id}`, { status: newStatus });
      if (result) {
        getOrders();
        toast.success('Updated Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [regUsers] = useState(100); // Example value
  const [staff] = useState(20); // Example value
  const currentDate = format(new Date(), 'MMMM dd, yyyy');

  return (
    <>
      

      <div className="flex justify-center">
        <Typography style={{ margin: '20px 0', fontSize: '32px', fontWeight: 'bold', fontFamily: 'Times New Roman' }}>
          Order dashboard
        </Typography>
      </div>

      <Container maxWidth={'800px'}>
        <Paper sx={{ width: '100%', marginTop: 2 }}>
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Order ID</TableCell>
                  <TableCell align="center">Customer Name</TableCell>
                  <TableCell align="center">Placed Date</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center">Payment Details</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.userId.firstName} {row.userId.lastName}</TableCell>
                    <TableCell align="center">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center" onClick={() => { handleClickOpen(row) }} className="cursor-pointer"><Visibility /></TableCell>
                    <TableCell align="center">
                      <ToggleButtonGroup
                        value={row.status}
                        exclusive
                        onChange={(event, newStatus) => handleStatusChange(row._id, newStatus)}
                        aria-label="status"
                        size="small"
                      >
                        <ToggleButton value="pending" color="error">Pending</ToggleButton>
                        <ToggleButton value="active" color="success">Active</ToggleButton>
                      </ToggleButtonGroup>
                    </TableCell>
                    <TableCell align="center" onClick={() => {removeOrder(row._id)}} className="cursor-pointer"> <Delete color="error" /></TableCell>


                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                      PaperProps={{
                        style: {
                          width: '33%',
                          minWidth: '200px',
                          maxWidth: '500px',
                        },
                      }}
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"View Payment Details"}
                      </DialogTitle>
                      <DialogContent>

                        <Typography component="legend">Email</Typography>
                        <TextField fullWidth value={payment.email} id="email" disabled />

                        <Typography component="legend">Name</Typography>
                        <TextField fullWidth value={payment.name} id="name" disabled />

                        <Typography component="legend">Card Number</Typography>
                        <TextField fullWidth value={payment.cardNo} id="cardNo" disabled />

                      </DialogContent>

                      <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 25, 100]} // Include 3 as an option
            component="div"
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </>
  );
};

export default OrderSchedule;