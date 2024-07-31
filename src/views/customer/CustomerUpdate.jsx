import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomerForm from "./CustomerForm";
import { capitalizeFirstLetter } from "utils/helper";
import { customerUpdate } from "services/api/customer";
import Breadcrumb from "ui-component/Breadcrumb";
import { selectCustomer } from "store/customer/customer.selector";
import SimpleCard from "ui-component/SimpleCard";

const CustomerUpdate = () => {
  const title = "customer";

  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const dispatch = useDispatch();
  const { customerId } = useParams();

  const customerState = useSelector(selectCustomer);

  const currentCustomer = customerState.filter((item) => item._id == customerId);

  const handleSubmit = (state) => {
    const formData = {
      name: state.name,
      email: state.email,
      password: state.password,
    };

    return customerUpdate(customerId, formData);
  };
  console.log(currentCustomer);
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: capitalizeFirstLetter(title), path: "/" + title },
            { name: "Customer Update" },
          ]}
        />
      </Box>
      <SimpleCard title="Customer Form">
        <CustomerForm
          handleSubmit={handleSubmit}
          tableData={{ ...currentCustomer[0] }}
        />
      </SimpleCard>
    </Container>
  );
};

export default CustomerUpdate;
