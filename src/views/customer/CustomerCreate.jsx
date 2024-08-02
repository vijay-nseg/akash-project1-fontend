import { styled } from "@mui/material";
import { Box } from "@mui/system";
import CustomerForm from "./CustomerForm";
import Breadcrumb from "ui-component/Breadcrumb";
import { capitalizeFirstLetter } from "utils/helper";
import { customerCreate } from "services/api/customer";
import SimpleCard from "ui-component/SimpleCard";

const CustomerCreate = () => {
    const title = 'customers';

    const Container = styled("div")(({ theme }) => ({
        margin: "30px",
        [theme.breakpoints.down("sm")]: { margin: "16px" },
        "& .breadcrumb": {
            marginBottom: "30px",
            [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
        },
    }));

    const currentCustomer = { date: "", name: "", number: "",mudi: "", intreset: "",sum_of_intreset:"" }

    const handleSubmit = (state) => {
        // const formData = new FormData();
        // formData.append("date", state.date)
        // formData.append("name", state.name)
        // formData.append("number", state.number)
        // formData.append("mudi", state.mudi)
        // formData.append("intreset", state.intreset)
        const formData = {
            date: state.date,
            name: state.name,
            number: state.number,
            mudi: state.mudi,
            intreset: state.intreset,
            remark: state.remark,
            // sum_of_intreset: state.sum_of_intreset,
          };
        
        return customerCreate(formData);
    };


    return (
        // <h1>asdasd</h1>
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: capitalizeFirstLetter(title), path: "/" + title }, { name: "Customer Create" }]} />
            </Box>
             <SimpleCard title="Customer Form">
                 <CustomerForm handleSubmit={handleSubmit} tableData={currentCustomer} />
             </SimpleCard>
         </Container>
    );
};

export default CustomerCreate;
