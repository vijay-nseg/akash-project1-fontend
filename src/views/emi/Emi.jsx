import { Button, Icon, IconButton } from "@mui/material";
import useAlert from "hooks/useAlert";
import useSnackbar from "hooks/useSnackbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { emiList, emisDelete, emisUpdateStatus } from "services/api/emi";
import { setEmiList } from "store/emi/emi.action";
import { selectEmi } from "store/emi/emi.selector";
import SimpleSwitch from "ui-component/SimpleSwitch";
import Datatable from "ui-component/tables/Datatable";
import { isObjectEmpty } from "utils/helper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
const Emi = () => {
  const title = "emi";

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { updateState } = useAlert();

  const { openSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      emiList().then((res) => {
        // console.log(res.data.data);
        dispatch(setEmiList(res.data.data));
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  const deleteHandler = (id) => {
    try {
      emisDelete(id)
        .then((res) => {
          emiList().then((res) => {
            dispatch(setEmiList(res.data.data));
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
    const url = "/emis/edit/" + row.rowData[0];
    navigate(url);
  };
  const addEmi = (event, row) => {
    // console.log(row.rowData);
    const url = "/emis/addemi/" + row.rowData[0];
    navigate(url);
  };

  // const handleStatusUpdate = (id, value) => {
  //     emisUpdateStatus(id).then((res) => {
  //         emiList().then((res) => {
  //             dispatch(setEmiList(res.data.result.data));
  //         });
  //         openSnackbar("success", res.data.message)
  //     }).catch((error) => {
  //         openSnackbar("error", error.data.message)
  //     });
  // }

  const handleDelete = (event, row) => {
    updateState("Emi Delete", () => deleteHandler(row["rowData"][0]));
  };

  const emis = useSelector(selectEmi);

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
      name: "amount",
      label: "Amount",
    },
    {
      name: "customer_id",
      label: "Customer Id",
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
            </>
          );
        },
      },
    },
  ];

  const data = isObjectEmpty(emis)
    ? []
    : emis.map((item, index) => {
        return [
          item._id,
          (index += 1),
          item?.date ?? "-",
          item?.amount ?? "-",
          item?.customer?.name+"( "+item?.customer?.number+" )" ?? "-",
          item?.is_completed == 1 ? "YES" : ("NO" ?? "-"),
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
  };

  return (
    <Datatable
      title={title}
      data={data}
      columns={columns}
      options={options}
      isLoading={loading}
      addHandler={() => navigate("/emis/create")}
    />
  );
};

export default Emi;
