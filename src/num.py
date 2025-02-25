# import React from "react";
# import TableFilter from "react-table-filter";
# import "./styles.css";
# import sampleData from "./csvjson.json";
# import "react-table-filter/lib/styles.css";
# import {
#   Table,
#   TableBody,
#   TableCell,
#   TableContainer,
#   TableHead,
#   TableRow,
#   TablePagination,
#   Paper,
#   TextField,
#   Input,Typography,
#   Button,
#   InputAdornment,
#   Select,
#   MenuItem,
#   InputLabel
# } from "@mui/material";
# import SearchIcon from '@mui/icons-material/Search';
# export default class App extends React.Component {
#   constructor(props) {
#     super(props);
#     this.state = {
#       contacts: sampleData,
#       filteredContacts: sampleData,
#       page: 0,
#       rowsPerPage: 10,
#       startDate: "",
#       endDate: "",
#     };
#     this._filterUpdated = this._filterUpdated.bind(this);
#     this.handleChangePage = this.handleChangePage.bind(this);
#     this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
#     this.handleDateFilter = this.handleDateFilter.bind(this);
#   }

#   _filterUpdated(newData) {
#     this.setState({
#       filteredContacts: newData,
#       page: 0, // Reset to first page when filter changes
#     });
#   }

#   handleChangePage(event, newPage) {
#     this.setState({ page: newPage });
#   }

#   handleChangeRowsPerPage(event) {
#     this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
#   }

#   handleDateFilter() {
#     const { startDate, endDate } = this.state;
#     const filteredData = sampleData.filter((item) => {
#       const itemDate = new Date(item.timestamp);
#       const start = startDate ? new Date(startDate) : null;
#       const end = endDate ? new Date(endDate) : null;
#       return (
#         (!start || itemDate >= start) && (!end || itemDate <= end)
#       );
#     });
#     this.setState({ filteredContacts: filteredData, page: 0 });
#   }


#   render() {
#     const { filteredContacts, page, rowsPerPage, startDate, endDate } = this.state;
#     const displayedContacts = filteredContacts.slice(
#       page * rowsPerPage,
#       page * rowsPerPage + rowsPerPage
#     );

#     return (
#       <div>
#         <div style={{ display: "flex", justifyContent: "space-between" ,width:"87%" }}>
          
#           <div>
#           <InputLabel id="demo-simple-select-label">Age</InputLabel>
#           <Select         
#            labelId="demo-simple-select-label"
#            id="demo-simple-select"
#            value={0}
#            sx={{ width: "300px" }}
#            label="Age"
#           //onChange={handleChange}
#   >
#     <MenuItem value={10}>Ten</MenuItem>
#     <MenuItem value={20}>Twenty</MenuItem>
#     <MenuItem value={30}>Thirty</MenuItem>
#   </Select>
#           </div>
#     <div style={{marginLeft:"1000px"}} >
#     <TextField
#    placeholder="Search"
#    type="search"
#    variant="outlined"
#    size="small"
#    sx={{ width: "300px" }}
#    //onChange={handleSearchFieldOnChange}
#    InputProps={{
#        startAdornment: (
#            <InputAdornment position="start">
#               <SearchIcon />
#            </InputAdornment>
#             ),
#          }}
#  />
#     </div>
#      </div>
    
#          <TextField
#             // label="Start Date"
#             type="date"
#             value={startDate}
#             onChange={(e) => this.setState({ startDate: e.target.value }, this.handleDateFilter)}
#             size="small"
#             sx={{ width: "100px", fontSize: "10px" }}
#             InputProps={{ style: { fontSize: "9px" } }}
#           />
#           <TextField
#            // label="End Date"
#             type="date"
#             value={endDate}
#              size="small"
#             onChange={(e) => this.setState({ endDate: e.target.value }, this.handleDateFilter)}
#             sx={{ width: "100px", fontSize: "10px" }}
#             InputProps={{ style: { fontSize: "9px" } }}
#           />
#         <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          
#         </div>
  
#         <Paper sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px", width: "100%", overflow: "hidden" }}>
#           <TableContainer>
#             <Table>
#               <TableHead sx={{ backgroundColor: "#b7ffe7" }}>
#                 <TableFilter rows={filteredContacts} onFilterUpdate={this._filterUpdated}>
#                   <TableCell key="timestamp" filterkey="timestamp" className="cell">
#                     Timestamp
#                   </TableCell>
                 
#                   <TableCell key="contact_name" filterkey="contact_name" className="cell" showsearch="true">
#                     Contact Name
#                   </TableCell>
#                   <TableCell key="place_of_contact" filterkey="place_of_contact" className="cell">
#                     Place of Contact
#                   </TableCell>
#                   <TableCell key="contact_type" filterkey="contact_type" className="cell">
#                     Contact Type
#                   </TableCell>
#                 </TableFilter>
#               </TableHead>
#               <TableBody>
#                 {displayedContacts.length === 0 ? (
#                   <TableRow className="empty-state">
#                     <TableCell colSpan={4} sx={{ width: "100px", padding: "80px" }}>No data available</TableCell>
#                   </TableRow>
#                 ) : (
#                   displayedContacts.map((item, index) => (
#                     <TableRow key={index} hover>
#                       <TableCell className="cell">{item.timestamp}</TableCell>
#                       <TableCell className="cell">{item.contact_name}</TableCell>
#                       <TableCell className="cell">{item.place_of_contact}</TableCell>
#                       <TableCell className="cell">{item.contact_type}</TableCell>
#                     </TableRow>
#                   ))
#                 )}
#               </TableBody>
#             </Table>
#           </TableContainer>
#           <TablePagination
#             rowsPerPageOptions={[5, 10, 25, 50]}
#             component="div"
#             count={filteredContacts.length}
#             rowsPerPage={rowsPerPage}
#             page={page}
#             onPageChange={this.handleChangePage}
#             onRowsPerPageChange={this.handleChangeRowsPerPage}
#           />
#         </Paper>
#       </div>
#     );
#   }
# }
