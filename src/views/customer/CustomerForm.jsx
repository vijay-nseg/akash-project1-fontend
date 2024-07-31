import { LoadingButton } from "@mui/lab";
import {
    Grid,
    TextField,
} from "@mui/material";
import { Formik } from "formik";
import useSnackbar from "hooks/useSnackbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CustomerForm = ({ handleSubmit, tableData }) => {
    const [state, setState] = useState({...tableData, password: ''});

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { openSnackbar } = useSnackbar();

    const handleChange = (event) => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
        // console.log(state);
    };


    const handleFormSubmit = async (values, { setFieldError }) => {
        setLoading(true);
        await handleSubmit(values).then((res) => {
            openSnackbar("success", res.data.message)
            setLoading(false);
            navigate("/customers");
        }).catch((e) => {
            if (e.response.status == 422) {
                console.log(e.response.data.message);
                setFieldError('name', e.response.data.message)
                // Object.entries(e.response.data.result).forEach(
                //     ([key, value]) => setFieldError(key, value)

                // );

            }
            setLoading(false);
        });
    };

    return (
        <div>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={state}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
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
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    helperText={touched.name && errors.name}
                                    error={Boolean(touched.name && errors.name)}
                                    label="Name"
                                    fullWidth
                                />
                            </Grid>


                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                                <TextField
                                    type="number"
                                    name="number"
                                    id="number"
                                    value={values.number}
                                    onChange={handleChange}
                                    label="Number"
                                    helperText={touched.number && errors.number}
                                    error={Boolean(touched.number && errors.number)}
                                    fullWidth

                                />

                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                                <TextField
                                    type="number"
                                    name="mudi"
                                    id="mudi"
                                    value={values.mudi}
                                    onChange={handleChange}
                                    label="Mudi"
                                    helperText={touched.mudi && errors.mudi}
                                    error={Boolean(touched.mudi && errors.mudi)}
                                    fullWidth

                                />

                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                                <TextField
                                    type="number"
                                    name="intreset"
                                    id="intreset"
                                    value={values.intreset}
                                    onChange={handleChange}
                                    label="Intreset"
                                    helperText={touched.intreset && errors.intreset}
                                    error={Boolean(touched.intreset && errors.intreset)}
                                    fullWidth

                                />

                            </Grid>
                            {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                                <TextField
                                    type="number"
                                    name="sum_of_intreset"
                                    id="sum_of_intreset"
                                    value={values.sum_of_intreset}
                                    onChange={handleChange}
                                    label="Sum of Intrest"
                                    helperText={touched.sum_of_intreset && errors.sum_of_intreset}
                                    error={Boolean(touched.sum_of_intreset && errors.sum_of_intreset)}
                                    fullWidth

                                />

                            </Grid> */}

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

export default CustomerForm;
