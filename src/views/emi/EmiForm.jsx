import { LoadingButton } from "@mui/lab";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { Formik } from "formik";
import useSnackbar from "hooks/useSnackbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customerList } from "services/api/customer";
import { selectCustomer } from "store/customer/customer.selector";

const EmiForm = ({ handleSubmit, tableData }) => {
  const [state, setState] = useState({ ...tableData });
  console.log(state,state.customer);

  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
    // console.log(state);
  };
  useEffect(() => {
    setLoading(true);

    try {
      customerList().then((res) => {
        // console.log(res.data.data);
        setCustomers(res.data.data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
    }
  }, []);
  //   const customers = useSelector(selectCustomer);
  const handleFormSubmit = async (values, { setFieldError }) => {
    setLoading(true);
    await handleSubmit(values)
      .then((res) => {
        openSnackbar("success", res.data.message);
        setLoading(false);
        navigate("/emis");
      })
      .catch((e) => {
        if (e.response.status == 422) {
          console.log(e.response.data.message);
          setFieldError("date", e.response.data.message);
          // Object.entries(e.response.data.result).forEach(
          //     ([key, value]) => setFieldError(key, value)

          // );
        }
        setLoading(false);
      });
  };
  return (
    <div>
      <Formik onSubmit={handleFormSubmit} initialValues={state}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="date"
                  name="date"
                  id="date"
                  value={values.date || ""}
                  onChange={handleChange}
                  // label="Date"
                  helperText={touched.date && errors.date}
                  error={Boolean(touched.date && errors.date)}
                  fullWidth
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <TextField
                  type="number"
                  name="amount"
                  id="amount"
                  value={values.amount}
                  onChange={handleChange}
                  helperText={touched.amount && errors.amount}
                  error={Boolean(touched.amount && errors.amount)}
                  label="Amount"
                  fullWidth
                />
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                <Autocomplete
                  options={customers}
                  disableClearable
                  defaultValue={state.customer}
                  getOptionLabel={(option) =>
                    option.name + " (" + option.number + ")"
                  }
                  onChange={(event, newValue) => {
                    // console.log(newValue._id);
                    setFieldValue("customer_id", newValue._id);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value._id
                  }
                  id="controllable-category-state"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Customer Name"
                      name="category"
                      value={state?.customer?.name ?? ""}
                      variant="outlined"
                      onChange={handleChange}
                      helperText={touched.customer_id && errors.customer_id}
                      error={Boolean(touched.customer_id && errors.customer_id)}
                      fullWidth
                    />
                  )}
                />
              </Grid>
            </Grid>

            <LoadingButton
              type="submit"
              color="primary"
              loading={loading}
              variant="contained"
              sx={{ my: 4 }}
            >
              Submit
            </LoadingButton>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EmiForm;
