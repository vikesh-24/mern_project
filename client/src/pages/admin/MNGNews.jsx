import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const NewsMNG = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle closing dialogs
  const handleDialogClose = () => {
    setOpenUpdateDialog(false);
  };


  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    title: '',
    description: '',
    img: '',
  });

  const handleUpdateUser = (row) => {
    setOpenUpdateDialog(true);
    setUpdateFormData({
      _id: row._id,
      title: row.title,
      description: row.description,
      img: row.img,
    });
  };

  const handleDelete = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/news/${id}`);

      if (result) {
        getItems();
        toast.warning('Deleted Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/news/${updateFormData._id}`, updateFormData);
      if (result) {
        getItems();
        toast.success('Item Updated Successfully');
        handleDialogClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getItems = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/news`);
      setItems(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Products not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  // Filter items based on searchQuery
  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    const totalPagesExp = '{total_pages_count_string}';
    let pageHeight = doc.internal.pageSize.height;
    let y = 20; // Initial y position
  
    // Add heading
    doc.setFontSize(20);
    doc.text('Current Discount Posts & News (without the image)', 105, y, { align: 'center' });

    y += 10;
  
    // Generate table
    doc.autoTable({
      head: [['Title','Description', 'Posted Date']],
      body: filteredItems.map(row => [row.title, row.description, new Date(row.createdAt).toLocaleDateString()]),
      startY: y + 10,
      theme: 'grid', // Add table styling
      didDrawPage: function(data) {
        // Footer
        let pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(190, pageHeight - 10, 'Page ' + doc.internal.getCurrentPageInfo().pageNumber + ' of ' + totalPagesExp);
      }
    });
  
    // Save the PDF
    doc.save('current_news.pdf');
  };

  return (
    <Container maxWidth={'800px'}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: 2,
        }}
      >
        <InputBase
          placeholder="  Search…"
          sx={{ ml: 1, width: 200, border: '1px solid #ccc', borderRadius: 3 }}
          onChange={handleSearchChange}
        />
        <IconButton sx={{ p: '10px', marginRight: 2 }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" color="success" component={Link} to="/admin/addNews">
          Add News
        </Button>
      </Box>
      <Button variant="outlined" color="primary" onClick={handleGeneratePdf}>
  Generate Pdf
</Button>
      <Paper sx={{ width: '100%', marginTop: 2 }}>
        {
          !isLoading ? <>
            <TableContainer sx={{ maxHeight: '100%' }}>
  <Table stickyHeader aria-label="sticky table">
    <TableHead>
      <TableRow>
        <TableCell colSpan={5} align="center">
          <Typography variant="h6">Manage News and Posters</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center">Title</TableCell>
        <TableCell align="center">Description</TableCell>
        <TableCell align="center">Image</TableCell>
        <TableCell align="center">Date</TableCell>
        <TableCell align="center">Action</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredItems.map((row) => (
        <TableRow
          key={row.title}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell align="center" component="th" scope="row">
            {row.title}
          </TableCell>
          <TableCell align="center">{(row.description)}</TableCell>
          <TableCell align="center">
            <img
              src={row.img}
              alt={row.title}
              style={{ width: '35px', height: '35px', margin: 'auto' }}
            />
          </TableCell>
          <TableCell align="center">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
          <TableCell align="center">
            <Button variant="outlined" sx={{ marginRight: 2 }} color="success" onClick={() => handleUpdateUser(row)}>
              Update
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(row._id)}>
              Delete
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

            
          </> : <Loader />}
      </Paper>

      <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
        <DialogTitle>Update News & Posters</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="outlined-read-only-input"
            label="Title"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })}
            value={updateFormData.title}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, description: e.target.value })}
            value={updateFormData.description}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="Image"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, img: e.target.value })}
            value={updateFormData.img}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} color="primary">Save</Button>
          <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default NewsMNG;
