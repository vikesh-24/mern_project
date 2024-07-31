import React, { useEffect, useState } from 'react'; React
import { Box, Container, Typography, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, InputBase} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { apiUrl } from '../../utils/Constants';
import authAxios from '../../utils/authAxios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SocialMediaMNG = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [socialMedia, setSocialMedia] = useState([]);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    platform: '',
    url: '',
  });
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

  const handleDialogClose = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdateSocialMedia = (row) => {
    setOpenUpdateDialog(true);
    setUpdateFormData({
      _id: row._id,
      platform: row.platform,
      url: row.url,
    });
  };

  const handleDeleteSocialMedia = async (id) => {
    try {
      const result = await authAxios.delete(`${apiUrl}/social/${id}`);
      if (result) {
        getSocialMedia();
        toast.warning('Deleted Successfully');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`${apiUrl}/social/${updateFormData._id}`, updateFormData);
      if (result) {
        getSocialMedia();
        toast.success('Social Media Updated Successfully');
        handleDialogClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getSocialMedia = async () => {
    try {
      const res = await authAxios.get(`${apiUrl}/social`);
      setSocialMedia(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Social Media not found');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getSocialMedia();
  }, []);

  const filteredSocialMedia = socialMedia.filter(social =>
    social.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    const totalPagesExp = '{total_pages_count_string}';
    let pageHeight = doc.internal.pageSize.height;
    let y = 20; // Initial y position
    doc.setFontSize(20);
    doc.text('Current Social Medias', 105, y, { align: 'center' });
    y += 10;
    doc.autoTable({
      head: [['Platform', 'URL']],
      body: filteredSocialMedia.map(row => [row.platform, row.url]),
      startY: y + 10,
      theme: 'grid',
      didDrawPage: function(data) {
        let pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(190, pageHeight - 10, 'Page ' + doc.internal.getCurrentPageInfo().pageNumber + ' of ' + totalPagesExp);
      }
    });
    doc.save('social_media.pdf');
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
          placeholder="Search..."
          sx={{ ml: 1, width: 200, border: '1px solid #ccc', borderRadius: 3 }}
          onChange={handleSearchChange}
        />
        <IconButton sx={{ p: '10px', marginRight: 2 }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" color="success" component={Link} to="/admin/addsocial">
          Add Social Media
        </Button>
      </Box>
      <Button variant="outlined" color="primary" onClick={handleGeneratePdf}>
        Generate Pdf
      </Button>
      <Paper sx={{ width: '100%', marginTop: 2 }}>
        {!isLoading ? (
          <>
            <TableContainer sx={{ maxHeight: '100%' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="h6">Manage Social Media</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Platform</TableCell>
                    <TableCell align="center">URL</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSocialMedia.map((row) => (
                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="center">{row.platform}</TableCell>
                      <TableCell align="center">{row.url}</TableCell>
                      <TableCell align="center">
                        <Button variant="outlined" sx={{ marginRight: 2 }} color="success" onClick={() => handleUpdateSocialMedia(row)}>
                          Update
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleDeleteSocialMedia(row._id)}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Loader />
        )}
      </Paper>
      <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
        <DialogTitle>Update Social Media</DialogTitle>
        <DialogContent>
          <TextField
            required
            id="outlined-read-only-input"
            label="Platform"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, platform: e.target.value })}
            value={updateFormData.platform}
          />
          <TextField
            required
            id="outlined-read-only-input"
            label="URL"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={(e) => setUpdateFormData({ ...updateFormData, url: e.target.value })}
            value={updateFormData.url}
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

export default SocialMediaMNG;
