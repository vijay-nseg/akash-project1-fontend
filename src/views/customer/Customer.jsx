import {
  Button,
  FormGroup,
  FormLabel,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import useAlert from "hooks/useAlert";
import useSnackbar from "hooks/useSnackbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  customerList,
  customerUpdate,
  customersDelete,
  customersUpdateStatus,
} from "services/api/customer";
import { setCustomerList } from "store/customer/customer.action";
import { selectCustomer } from "store/customer/customer.selector";
import SimpleSwitch from "ui-component/SimpleSwitch";
import Datatable from "ui-component/tables/Datatable";
import { isObjectEmpty } from "utils/helper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
const Customer = () => {
  const title = "customers";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { updateState } = useAlert();

  const { openSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      customerList().then((res) => {
        // console.log(res.data.data);
        dispatch(setCustomerList(res.data.data));
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const deleteHandler = (id) => {
    try {
      customersDelete(id)
        .then((res) => {
          customerList().then((res) => {
            dispatch(setCustomerList(res.data.data));
          });
          openSnackbar("success", res.data.message);
        })
        .catch((error) => {
          openSnackbar("error", error.data.message);
        });
    } catch (e) {
      // console.log(e)
    }
  };

  const handleEdit = (event, row) => {
    // console.log(row.rowData);
    const url = "/customers/edit/" + row.rowData[0];
    navigate(url);
  };
  const addEmi = (event, row) => {
    // console.log(row.rowData);
    const url = "/emis/create/" + row.rowData[0];
    navigate(url);
  };

  const handleUpdate = (id, value) => {
    // console.log(id);
    // console.log(value);
    const formData = {
      is_completed: value ? 0 : 1,
    };

    customerUpdate(id, formData)
      .then((res) => {
        customerList().then((res) => {
          dispatch(setCustomerList(res.data.data));
        });
        openSnackbar("success", res.data.message);
      })
      .catch((error) => {
        openSnackbar("error", error.data.message);
      });
  };

  const handleStatusUpdate = (id, value) => {
    console.log(id, value);
    updateState("Customer Complete", () => handleUpdate(id, value));
  };
  const handleDelete = (event, row) => {
    updateState("Customer Delete", () => deleteHandler(row["rowData"][0]));
  };

  const customers = useSelector(selectCustomer);

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        display: false,
        download: false,
        filter: false,
        sort: true,
      },
    },
    {
      name: "sr_no.",
      label: "Sr no.",
      options: {
        display: true,
        download: true,
        filter: false,
        sort: true,
      },
    },
    {
      name: "data",
      label: "Date",
      options: {
        display: true,
        download: true,
        sort: true,
        filter: true,
        filterType: "custom",
        customFilterListOptions: {
          render: (v) => {
            console.log(v);
            if (v[0] && v[1])
              return [`Start Date: ${v[0]}`, `End Date: ${v[1]}`];
            else if (v[0]) return `Start Date: ${v[0]}`;
            else if (v[1]) return `End Date: ${v[1]}`;
            return [];
          },
          update(filterList, filterPos, index) {
            // console.log(filterList, filterPos, index);
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          name: [],
          logic(date, filters) {
            console.log(date, filters);
            if (filters[0] && filters[1]) {
              return date < filters[0] || date > filters[1];
            } else if (filters[0]) {
              return date < filters[0];
            } else if (filters[1]) {
              return date > filters[1];
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Date</FormLabel>
              <FormGroup row>
                <TextField
                  type="date"
                  value={filterList[index][0] || ""}
                  onChange={(event) => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  label="Start Date"
                  style={{ width: "45%" }}
                  InputLabelProps={{
                    shrink: true,
                    style: { position: "relative", top: 20, marginRight: 8 },
                  }}
                />
                <TextField
                  type="date"
                  value={filterList[index][1] || ""}
                  onChange={(event) => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  label="End Date"
                  style={{ width: "45%" }}
                  InputLabelProps={{
                    shrink: true,
                    style: { position: "relative", top: 20, marginRight: 8 },
                  }}
                />
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.ageFilterChecked}
                      onChange={(event) =>
                        setState({
                          ageFilterChecked: event.target.checked,
                        })
                      }
                    />
                  }
                  label="Separate Values"
                  style={{ marginLeft: "0px" }}
                /> */}
              </FormGroup>
            </div>
          ),
        },
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filterType: "textField",
        display: true,
        download: true,
        filter: true,
        sort: true,
      },
    },
    {
      name: "number",
      label: "Number",
      options: {
        filterType: "textField",
        display: true,
        download: true,
        filter: true,
        sort: true,
      },
    },
    {
      name: "mudi",
      label: "Mudi",
      options: {
        display: true,
        download: true,
        sort: true,
        filter: true,
        filterType: "custom",
        customFilterListOptions: {
          render: (v) => {
            if (v[0] && v[1]) return [`Min Mudi: ${v[0]}`, `Max Mudi: ${v[1]}`];
            else if (v[0]) return `Min Mudi: ${v[0]}`;
            else if (v[1]) return `Max Mudi: ${v[1]}`;
            return [];
          },
          update(filterList, filterPos, index) {
            console.log(filterList, filterPos, index);
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          name: [],
          logic(mudi, filters) {
            if (filters[0] && filters[1]) {
              return mudi < filters[0] || mudi > filters[1];
            } else if (filters[0]) {
              return mudi < filters[0];
            } else if (filters[1]) {
              return mudi > filters[1];
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Mudi</FormLabel>
              <FormGroup row>
                <TextField
                  label="min"
                  value={filterList[index][0] || ""}
                  onChange={(event) => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%", marginRight: "5%" }}
                />
                <TextField
                  label="max"
                  value={filterList[index][1] || ""}
                  onChange={(event) => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%" }}
                />
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.ageFilterChecked}
                      onChange={(event) =>
                        setState({
                          ageFilterChecked: event.target.checked,
                        })
                      }
                    />
                  }
                  label="Separate Values"
                  style={{ marginLeft: "0px" }}
                /> */}
              </FormGroup>
            </div>
          ),
        },
      },
    },
    {
      name: "intrest",
      label: "Intrest Emi",
      options: {
        display: true,
        download: true,
        sort: true,
        filter: true,
        filterType: "custom",
        customFilterListOptions: {
          render: (v) => {
            if (v[0] && v[1])
              return [`Min Intrest: ${v[0]}`, `Max Intrest: ${v[1]}`];
            else if (v[0]) return `Min Intrest: ${v[0]}`;
            else if (v[1]) return `Max Intrest: ${v[1]}`;
            return [];
          },
          update(filterList, filterPos, index) {
            console.log(filterList, filterPos, index);
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          name: [],
          logic(intrest, filters) {
            if (filters[0] && filters[1]) {
              return intrest < filters[0] || intrest > filters[1];
            } else if (filters[0]) {
              return intrest < filters[0];
            } else if (filters[1]) {
              return intrest > filters[1];
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Intrest</FormLabel>
              <FormGroup row>
                <TextField
                  label="min"
                  value={filterList[index][0] || ""}
                  onChange={(event) => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%", marginRight: "5%" }}
                />
                <TextField
                  label="max"
                  value={filterList[index][1] || ""}
                  onChange={(event) => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%" }}
                />
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.ageFilterChecked}
                      onChange={(event) =>
                        setState({
                          ageFilterChecked: event.target.checked,
                        })
                      }
                    />
                  }
                  label="Separate Values"
                  style={{ marginLeft: "0px" }}
                /> */}
              </FormGroup>
            </div>
          ),
        },
      },
    },
    {
      name: "sum_intrest",
      label: "Sum of Intrest",
      options: {
        display: true,
        download: true,
        sort: true,
        filter: true,
        filterType: "custom",
        customFilterListOptions: {
          render: (v) => {
            if (v[0] && v[1])
              return [
                `Min Sum of Intrest: ${v[0]}`,
                `Max Sum of Intrest: ${v[1]}`,
              ];
            else if (v[0]) return `Min Sum of Intrest: ${v[0]}`;
            else if (v[1]) return `Max Sum of Intrest: ${v[1]}`;
            return [];
          },
          update(filterList, filterPos, index) {
            console.log(filterList, filterPos, index);
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          name: [],
          logic(sum_intrest, filters) {
            if (filters[0] && filters[1]) {
              return sum_intrest < filters[0] || sum_intrest > filters[1];
            } else if (filters[0]) {
              return sum_intrest < filters[0];
            } else if (filters[1]) {
              return sum_intrest > filters[1];
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Sum of Intrest</FormLabel>
              <FormGroup row>
                <TextField
                  label="min"
                  value={filterList[index][0] || ""}
                  onChange={(event) => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%", marginRight: "5%" }}
                />
                <TextField
                  label="max"
                  value={filterList[index][1] || ""}
                  onChange={(event) => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%" }}
                />
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.ageFilterChecked}
                      onChange={(event) =>
                        setState({
                          ageFilterChecked: event.target.checked,
                        })
                      }
                    />
                  }
                  label="Separate Values"
                  style={{ marginLeft: "0px" }}
                /> */}
              </FormGroup>
            </div>
          ),
        },
      },
    },
    {
      name: "total",
      label: "total",
      options: {
        display: true,
        download: true,
        sort: true,
        filter: true,
        filterType: "custom",
        customFilterListOptions: {
          render: (v) => {
            if (v[0] && v[1])
              return [`Min Total: ${v[0]}`, `Max Total: ${v[1]}`];
            else if (v[0]) return `Min Total: ${v[0]}`;
            else if (v[1]) return `Max Total: ${v[1]}`;
            return [];
          },
          update(filterList, filterPos, index) {
            console.log(filterList, filterPos, index);
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          name: [],
          logic(total, filters) {
            if (filters[0] && filters[1]) {
              return total < filters[0] || total > filters[1];
            } else if (filters[0]) {
              return total < filters[0];
            } else if (filters[1]) {
              return total > filters[1];
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Total</FormLabel>
              <FormGroup row>
                <TextField
                  label="min"
                  value={filterList[index][0] || ""}
                  onChange={(event) => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%", marginRight: "5%" }}
                />
                <TextField
                  label="max"
                  value={filterList[index][1] || ""}
                  onChange={(event) => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%" }}
                />
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.ageFilterChecked}
                      onChange={(event) =>
                        setState({
                          ageFilterChecked: event.target.checked,
                        })
                      }
                    />
                  }
                  label="Separate Values"
                  style={{ marginLeft: "0px" }}
                /> */}
              </FormGroup>
            </div>
          ),
        },
      },
    },
    {
      name: "jama_credit",
      label: "Jama (EMI)",
      options: {
        display: true,
        download: true,
        sort: true,
        filter: true,
        filterType: "custom",
        customFilterListOptions: {
          render: (v) => {
            // console.log(v);
            if (v[0] && v[1])
              return [`Min Jama (Emi): ${v[0]}`, `Max Jama (Emi): ${v[1]}`];
            else if (v[0]) return `Min Jama (Emi): ${v[0]}`;
            else if (v[1]) return `Max Jama (Emi): ${v[1]}`;
            return [];
          },
          update(filterList, filterPos, index) {
            // console.log(filterList, filterPos, index);
            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          name: [],
          logic(jama_credit, filters) {
            console.log(jama_credit, filters);
            if (filters[0] && filters[1]) {
              return jama_credit < filters[0] || jama_credit > filters[1];
            } else if (filters[0]) {
              return jama_credit < filters[0];
            } else if (filters[1]) {
              return jama_credit > filters[1];
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <div>
              <FormLabel>Jama (EMI)</FormLabel>
              <FormGroup row>
                <TextField
                  label="min"
                  value={filterList[index][0] || ""}
                  onChange={(event) => {
                    filterList[index][0] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%", marginRight: "5%" }}
                />
                <TextField
                  label="max"
                  value={filterList[index][1] || ""}
                  onChange={(event) => {
                    filterList[index][1] = event.target.value;
                    onChange(filterList[index], index, column);
                  }}
                  style={{ width: "45%" }}
                />
                {/* <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.ageFilterChecked}
                      onChange={(event) =>
                        setState({
                          ageFilterChecked: event.target.checked,
                        })
                      }
                    />
                  }
                  label="Separate Values"
                  style={{ marginLeft: "0px" }}
                /> */}
              </FormGroup>
            </div>
          ),
        },
      },
    },
    {
      name: "remain",
      label: "Remain",
      options: {
        filterType: "textField",
        display: true,
        download: true,
        filter: true,
        sort: true,
      },
    },
    {
      name: "is_completed",
      label: "Is Completed",
      options: {
        customBodyRender: (value, tableMeta) => {
          // console.log(tableMeta["rowData"][0]);
          // console.log(value);
          return (
            <SimpleSwitch
              key={tableMeta["rowData"][0]}
              id={tableMeta["rowData"][0]}
              value={value}
              changeHandler={(id, value) => handleStatusUpdate(id, value)}
            />
          );
        },
        filterType: "dropdown",
        filterOptions: {
          renderValue: (v) => (v == 1 ? "Completed" : "Not Complete"),
        },
        customFilterListOptions: {
          render: (v) => (v == 1 ? "Completed" : "Complete"),
        },
        display: true,
        filter: true,
        download: true,
        sort: true,
      },
      // options: {
      //   display: true,
      //   download: false,
      //   filter: false,
      //   sort: false,
      // },
    },
    {
      label: "Create Date",
      options: {
        filter: true,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <IconButton
                onClick={(e) => {
                  handleEdit(e, tableMeta);
                }}
              >
                <EditIcon color="primary" />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  handleDelete(e, tableMeta);
                }}
              >
                <DeleteIcon color="secondary" />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  addEmi(e, tableMeta);
                }}
              >
                <CurrencyExchangeIcon color="secondary" />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  // console.log(customers);
  const data = isObjectEmpty(customers)
    ? []
    : customers.map((item, index) => {
        // console.log(item);
        return [
          item._id,
          (index += 1),
          item?.date ?? "-",
          item?.name ?? "-",
          item?.number ?? "-",
          item?.mudi ?? "-",
          item?.intreset ?? "-",
          item?.sum_of_intrest ?? "-",
          item?.mudi + (item?.sum_of_intrest ?? 0) ?? "-",
          item?.jama_credit ?? "-",
          (item?.mudi ?? 0) +
            (item?.sum_of_intrest ?? 0) -
            (item?.jama_credit ?? 0) ?? "-",
          item?.is_completed ?? "-",
          item?.created_at ?? "-",
        ];
      });

  const options = {
    filterType: "textField",
    fixedHeader: true,
    tableBodyHeight: "100%",
    filterType: "dropdown",
    responsive: "standard",
    rowsPerPageOptions: [10, 20, 50, 100],
    sortOrder: {
      name: "Sr No.",
      direction: "asc",
    },
  };
  console.log(data);
  return (
    <Datatable
      title={title}
      data={data}
      columns={columns}
      options={options}
      isLoading={loading}
      addHandler={() => navigate("/customers/create")}
    />
  );
};

export default Customer;
