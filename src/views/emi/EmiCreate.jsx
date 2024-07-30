import { styled } from "@mui/material";
import { Box } from "@mui/system";
import EmiForm from "./EmiForm";
import Breadcrumb from "ui-component/Breadcrumb";
import { capitalizeFirstLetter } from "utils/helper";
import { emiCreate } from "services/api/emi";
import SimpleCard from "ui-component/SimpleCard";
import { useSelector } from "react-redux";
import { selectAdmin } from "store/admin/admin.selector";
import { useParams } from "react-router";

const EmiCreate = () => {
  const title = "emi";

  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  const { customerId } = useParams();
  let customer = "";
  const customerState = useSelector(selectAdmin);
  if (customerId) {
    customer = customerState.filter((item) => item._id == customerId);
    customer=customer[0];
  }

  const currentEmi = {
    date: "",
    amount: "",
    customer_id: customerId ?? "",
    customer,
  };

  //   console.log(customerId);
  const handleSubmit = (state) => {
    const formData = {
      date: state.date,
      amount: state.amount,
      customer_id: state.customer_id,
    };

    return emiCreate(formData);
  };

  return (
    // <h1>asdasd</h1>
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: capitalizeFirstLetter(title), path: "/" + title },
            { name: "Emi Create" },
          ]}
        />
      </Box>
      <SimpleCard title="Emi Form">
        <EmiForm handleSubmit={handleSubmit} tableData={currentEmi} />
      </SimpleCard>
    </Container>
  );
};

export default EmiCreate;
