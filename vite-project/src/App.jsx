import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  ClientSideRowModelModule,
  DateFilterModule,
  ExternalFilterModule,
  ModuleRegistry,
  NumberFilterModule,
  ValidationModule,
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  SetFilterModule,
} from "ag-grid-enterprise";

ModuleRegistry.registerModules([
  ExternalFilterModule,
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  SetFilterModule,
  NumberFilterModule,
  DateFilterModule,
  ValidationModule,
]);

const dateFilterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    const cellDate = asDate(cellValue);
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) return 0;
    return cellDate < filterLocalDateAtMidnight ? -1 : 1;
  },
};

let ageType = "everyone";

const asDate = (dateAsString) => {
  const splitFields = dateAsString.split("/");
  return new Date(
    Number.parseInt(splitFields[2]),
    Number.parseInt(splitFields[1]) - 1,
    Number.parseInt(splitFields[0])
  );
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "athlete", minWidth: 180 },
    { field: "age", filter: "agNumberColumnFilter", maxWidth: 80 },
    { field: "country" },
    { field: "year", maxWidth: 90 },
    { field: "date", filter: "agDateColumnFilter", filterParams: dateFilterParams },
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
  ]);

  const defaultColDef = useMemo(() => ({ flex: 1, minWidth: 120, filter: true }), []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        document.querySelector("#filterDropdown").value = "everyone";
        setRowData(data);
      });
  }, []);

  const externalFilterChanged = useCallback((event) => {
    ageType = event.target.value;
    gridRef.current.api.onFilterChanged();
  }, []);

  const isExternalFilterPresent = useCallback(() => ageType !== "everyone", []);

  const doesExternalFilterPass = useCallback((node) => {
    if (!node.data) return true;
    switch (ageType) {
      case "below25":
        return node.data.age < 25;
      case "between25and50":
        return node.data.age >= 25 && node.data.age <= 50;
      case "above50":
        return node.data.age > 50;
      case "dateAfter2008":
        return asDate(node.data.date) > new Date(2008, 1, 1);
      default:
        return true;
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div className="ag-theme-alpine" style={{ height: "90%" }}>
        <div className="filters">
          <label>
            Filter:
            <select id="filterDropdown" onChange={externalFilterChanged}>
              <option value="everyone">Everyone</option>
              <option value="below25">Below 25</option>
              <option value="between25and50">Between 25 and 50</option>
              <option value="above50">Above 50</option>
              <option value="dateAfter2008">After 01/01/2008</option>
            </select>
          </label>
        </div>

        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <StrictMode>
      <GridExample />
    </StrictMode>
  );
}