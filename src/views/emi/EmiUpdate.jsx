import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EmiForm from "./EmiForm";
import { capitalizeFirstLetter } from "utils/helper";
import { emiUpdate } from "services/api/emi";
import Breadcrumb from "ui-component/Breadcrumb";
import { selectEmi } from "store/emi/emi.selector";
import SimpleCard from "ui-component/SimpleCard";

const EmiUpdate = () => {
  const title = "emi";

  const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const dispatch = useDispatch();
  const { emiId } = useParams();

  const emiState = useSelector(selectEmi);

  const currentEmi = emiState.filter((item) => item._id == emiId);

  const handleSubmit = (state) => {
    const formData = {
      date: state.date,
      amount: state.amount, 
      customer_id: state.customer_id
    };

    return emiUpdate(emiId, formData);
  };
  console.log(currentEmi);
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: capitalizeFirstLetter(title), path: "/" + title },
            { name: "Emi Update" },
          ]}
        />
      </Box>
      <SimpleCard title="Emi Form">
        <EmiForm
          handleSubmit={handleSubmit}
          tableData={{ ...currentEmi[0] }}
        />
      </SimpleCard>
    </Container>
  );
};

export default EmiUpdate;
