import React, { useState } from "react";
import TableFilter from "react-table-filter";
import "./styles.css";
import sampleData from "./csvjson.json";
import "react-table-filter/lib/styles.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Typography from '@mui/material/Typography';
import DateRangeIcon from '@mui/icons-material/DateRange';
const App = () => {
  const [contacts, setContacts] = useState(sampleData);
  const [filteredContacts, setFilteredContacts] = useState(sampleData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterUpdate = (newData) => {
    setFilteredContacts(newData);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDateFilter = () => {
    const filteredData = sampleData.filter((item) => {
      const itemDate = new Date(item.timestamp);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (!start || itemDate >= start) && (!end || itemDate <= end);
    });
    setFilteredContacts(filteredData);
    setPage(0);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const searchedData = sampleData.filter((item) =>
      item.contact_name.toLowerCase().includes(value) ||
      item.place_of_contact.toLowerCase().includes(value) ||
      item.contact_type.toLowerCase().includes(value)
    );
    setFilteredContacts(searchedData);
    setPage(0);
  };

  const displayedContacts = filteredContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ padding:"20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <InputLabel id="demo-simple-select-label">Level</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={0} sx={{ width: "400px" }}>
            <MenuItem value={10}>L1</MenuItem>
            <MenuItem value={20}>L2</MenuItem>
            <MenuItem value={30}>L3</MenuItem>
          </Select>
        </div>
        <div>
          <Typography variant="h3" gutterBottom>
            Vendor Management
          </Typography>
        </div>
        <div style={{ paddingRight: "30px" }}>
          <TextField
            placeholder="Search"
            type="search"
            variant="outlined"
            size="medium"
            value={searchTerm}
            onChange={handleSearch}
            sx={{ width: "450px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <br />
      <div style={{display:"flex"}}>
      <InputLabel style={{paddingRight:"10px"}}  >From</InputLabel>
      <TextField type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); handleDateFilter(); }} size="medium" sx={{ width: "150px", paddingRight: "20px" }} />
      <InputLabel  style={{paddingRight:"10px"}} >To</InputLabel>
      <TextField type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); handleDateFilter(); }} size="medium" sx={{ width: "150px" }} />
      </div>
      <br/>
      <Paper sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px", width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#b7ffe7" }}>
              <TableFilter rows={filteredContacts} onFilterUpdate={handleFilterUpdate}>
                <TableCell key="timestamp" filterkey="timestamp" className="cell">Timestamp
                
                </TableCell>
                <TableCell key="contact_name" filterkey="contact_name" className="cell" showsearch="true">Contact Name</TableCell>
                <TableCell key="place_of_contact" filterkey="place_of_contact" className="cell">Place of Contact</TableCell>
                <TableCell key="contact_type" filterkey="contact_type" className="cell">Contact Type</TableCell>
              </TableFilter>
            </TableHead>
            <TableBody>
            {displayedContacts.length === 0 ? (
  <TableRow>
    <TableCell colSpan={4} sx={{ width: "100px", padding: "110px", textAlign: "center" }}>No data available</TableCell>
  </TableRow>
) : displayedContacts.length === 1 ? (
  displayedContacts.map((item, index) => (
    <TableRow key={index} hover>
      <TableCell sx={{ width: "100px", padding: "110px", textAlign: "center" }} >{item.timestamp}</TableCell>
      <TableCell className="cell">{item.contact_name}</TableCell>
      <TableCell className="cell">{item.place_of_contact}</TableCell>
      <TableCell className="cell">{item.contact_type}</TableCell>
    </TableRow>
  ))
) : displayedContacts.length === 2 ? (
  displayedContacts.map((item, index) => (
    <TableRow key={index} hover>
      <TableCell sx={{ width: "100px", padding: "80px", textAlign: "center" }}>{item.timestamp}</TableCell>
      <TableCell className="cell">{item.contact_name}</TableCell>
      <TableCell className="cell">{item.place_of_contact}</TableCell>
      <TableCell className="cell">{item.contact_type}</TableCell>
    </TableRow>
  ))
) : displayedContacts.length === 3 ? (
  displayedContacts.map((item, index) => (
    <TableRow key={index} hover>
      <TableCell sx={{ width: "100px", padding: "60px", textAlign: "center" }}>{item.timestamp}</TableCell>
      <TableCell >{item.contact_name}</TableCell>
      <TableCell >{item.place_of_contact}</TableCell>
      <TableCell >{item.contact_type}</TableCell>
    </TableRow>
  ))
) : (
  displayedContacts.map((item, index) => (
    <TableRow key={index} hover>
      <TableCell >{item.timestamp}</TableCell>
      <TableCell >{item.contact_name}</TableCell>
      <TableCell >{item.place_of_contact}</TableCell>
      <TableCell >{item.contact_type}</TableCell>
    </TableRow>
  ))
)}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredContacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default App;
