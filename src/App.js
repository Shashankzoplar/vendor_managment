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

const App = () => {
  const [contacts, setContacts] = useState(sampleData);
  const [filteredContacts, setFilteredContacts] = useState(sampleData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  const displayedContacts = filteredContacts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "87%" }}>
        <div>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={0} sx={{ width: "300px" }}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        <div>
        <p>Vendor managment</p>
        </div>
        <div style={{ marginLeft: "1000px" }}>
          <TextField
            placeholder="Search"
            type="search"
            variant="outlined"
            size="small"
            sx={{ width: "300px" }}
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
      <TextField type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); handleDateFilter(); }} size="small" sx={{ width: "100px" }} />
      <TextField type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); handleDateFilter(); }} size="small" sx={{ width: "100px" }} />

      <Paper sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px", width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: "#b7ffe7" }}>
              <TableFilter rows={filteredContacts} onFilterUpdate={handleFilterUpdate}>
                <TableCell key="timestamp" filterkey="timestamp" className="cell">Timestamp</TableCell>
                <TableCell key="contact_name" filterkey="contact_name" className="cell" showsearch="true">Contact Name</TableCell>
                <TableCell key="place_of_contact" filterkey="place_of_contact" className="cell">Place of Contact</TableCell>
                <TableCell key="contact_type" filterkey="contact_type" className="cell">Contact Type</TableCell>
              </TableFilter>
            </TableHead>
            <TableBody>
              {displayedContacts.length === 0 ? (
                <TableRow className="empty-state">
                  <TableCell colSpan={4} sx={{ width: "100px", padding: "80px" }}>No data available</TableCell>
                </TableRow>
              ) : (
                displayedContacts.map((item, index) => (
                  <TableRow key={index} hover>
                    <TableCell className="cell">{item.timestamp}</TableCell>
                    <TableCell className="cell">{item.contact_name}</TableCell>
                    <TableCell className="cell">{item.place_of_contact}</TableCell>
                    <TableCell className="cell">{item.contact_type}</TableCell>
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
