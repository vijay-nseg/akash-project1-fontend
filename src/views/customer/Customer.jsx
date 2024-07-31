import { Button, Icon, IconButton } from "@mui/material";
import useAlert from "hooks/useAlert";
import useSnackbar from "hooks/useSnackbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  customerList,
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

  // const handleStatusUpdate = (id, value) => {
  //     customersUpdateStatus(id).then((res) => {
  //         customerList().then((res) => {
  //             dispatch(setCustomerList(res.data.result.data));
  //         });
  //         openSnackbar("success", res.data.message)
  //     }).catch((error) => {
  //         openSnackbar("error", error.data.message)
  //     });
  // }

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
        sort: false,
      },
    },
    {
      name: "Sr.no.",
      options: {
        display: true,
        download: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: "data",
      label: "Date",
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "number",
      label: "Number",
    },
    {
      name: "mudi",
      label: "Mudi",
    },
    {
      name: "intrest",
      label: "Intrest Emi",
    },
    {
      name: "sum_intrest",
      label: "Sum of Intrest",
    },
    {
      name: "total",
      label: "total",
    },
    {
      name: "jama_credit",
      label: "Jama Credit",
    },
    {
      name: "remain",
      label: "Remain",
    },
    {
      name: "is_completed",
      label: "Is Completed",
      options: {
        display: false,
        download: false,
        filter: false,
        sort: false,
      },
    },
    {
      label: "Create Date",
      options: {
        filter: false,
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

  const data = isObjectEmpty(customers)
    ? []
    : customers.map((item, index) => {
        return [
          item._id,
          (index += 1),
          item?.date ?? "-",
          item?.name ?? "-",
          item?.number ?? "-",
          item?.mudi ?? "-",
          item?.intreset ?? "-",
          item?.sum_of_intreset ?? "-",
          item?.mudi + (item?.sum_of_intreset ?? 0) ?? "-",
          item?.jama_credit ?? "-",
          (item?.mudi ?? 0) +
            (item?.sum_of_intreset ?? 0) -
            (item?.jama_credit ?? 0) ?? "-",
          item?.is_completed ?? "-",
          item?.created_at ?? "-",
        ];
      });

  const options = {
    filterType: "textField",
    fixedHeader: true,
    tableBodyHeight: "400px",
  };

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