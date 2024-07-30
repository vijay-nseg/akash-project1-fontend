import { styled } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdminForm from "./AdminForm";
import { capitalizeFirstLetter } from "utils/helper";
import { adminUpdate } from "services/api/admin";
import Breadcrumb from "ui-component/Breadcrumb";
import { selectAdmin } from "store/admin/admin.selector";
import SimpleCard from "ui-component/SimpleCard";

const AdminUpdate = () => {
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
  const { adminId } = useParams();

  const adminState = useSelector(selectAdmin);

  const currentAdmin = adminState.filter((item) => item._id == adminId);

  const handleSubmit = (state) => {
    const formData = {
      name: state.name,
      email: state.email,
      password: state.password,
    };

    return adminUpdate(adminId, formData);
  };
  console.log(currentAdmin);
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: capitalizeFirstLetter(title), path: "/" + title },
            { name: "Admin Update" },
          ]}
        />
      </Box>
      <SimpleCard title="Admin Form">
        <AdminForm
          handleSubmit={handleSubmit}
          tableData={{ ...currentAdmin[0] }}
        />
      </SimpleCard>
    </Container>
  );
};

export default AdminUpdate;
