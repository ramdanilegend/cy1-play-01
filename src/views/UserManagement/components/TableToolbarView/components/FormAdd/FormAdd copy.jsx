// import React from "react";
// import { Formik } from "formik";
// import {
//   Grid,
//   TextField,
//   Container,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   DialogActions,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import AlertContext from "context/AlertContext";
// import UserContext from "context/AlertContext";
// import Service from "services/UserService";

// const useStyles = makeStyles((theme) => ({
//   btnCancel: {
//     backgroundColor: "#4420D8",
//     color: "#FFFFFF",
//     minWidth: "110px",
//   },
//   btnSave: {
//     backgroundColor: "#D82058",
//     color: "#FFFFFF",
//     minWidth: "110px",
//   },
// }));

// const FormAdd = (props) => {
//   const { handleClose } = props;
//   const classes = useStyles();
//   const alertContext = React.useContext(AlertContext);
//   const userContext = React.useContext(UserContext);
//   const updateState = () => {
//     userContext.updateState();
//   };

//   const handleSubmit = () => {};
//   return (
//     <React.Fragment>
//       <Container maxWidth="lg" fixed>
//         {/* <Formik
//           initialValues={{
//             name: "",
//             role: 1,
//             email: "",
//             PIN: "",
//             phone_number: "",
//             password: "",
//           }}
//           validate={(values) => {
//             const errors = {};

//             return errors;
//           }}
//           onSubmit={async (values, { setSubmitting }) => {
//             console.log(values);
//             // e.preventDefault();
//             try {
//               alertContext.updateState(true, false, "success", "");
//               await Service.postData(values);
//               alertContext.updateState(
//                 false,
//                 true,
//                 "success",
//                 "Membuat Data berhasil"
//               );
//             } catch (ex) {
//               if (!ex.response) {
//                 alertContext.updateState(false, true, "error", "Error 404");
//                 return true;
//               }
//               alertContext.updateState(false, true, "error", ex.response.data);
//             }
//             updateState();
//             handleClose();
//             setSubmitting(false);
//           }}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleChange,
//             handleBlur,
//             handleSubmit,
//             isSubmitting,
//             /* and other goodies */}
//         {/* ) => (  */}
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={1}>
//             <Grid item md={6} lg={6} xs={12}>
//               Name
//               <TextField
//                 type="text"
//                 name="name"
//                 variant="outlined"
//                 size="small"
//                 placeholder="Input User Name"
//                 onChange={handleChange}
//                 // onBlur={handleBlur}
//                 value={values.name}
//                 fullWidth
//               />
//               User Role
//               <TextField
//                 type="text"
//                 name="role"
//                 variant="outlined"
//                 size="small"
//                 select
//                 // placeholder="Input User Name"
//                 onChange={handleChange}
//                 // onBlur={handleBlur}
//                 value={values.role}
//                 fullWidth
//               >
//                 <MenuItem key={1} value={1}>
//                   {"Admin"}
//                 </MenuItem>
//                 <MenuItem key={2} value={2}>
//                   {"Guest"}
//                 </MenuItem>
//                 <MenuItem key={3} value={3}>
//                   {"Data Manager"}
//                 </MenuItem>
//                 <MenuItem key={4} value={4}>
//                   {"Analyst"}
//                 </MenuItem>
//               </TextField>
//               Email
//               <TextField
//                 type="text"
//                 name="email"
//                 variant="outlined"
//                 size="small"
//                 placeholder="Input User Email"
//                 onChange={handleChange}
//                 // onBlur={handleBlur}
//                 value={values.email}
//                 fullWidth
//               />
//             </Grid>
//             <Grid item md={6} lg={6} xs={12}>
//               Police Identify Number
//               <TextField
//                 type="text"
//                 name="PIN"
//                 variant="outlined"
//                 size="small"
//                 placeholder="Input Police Identify Number"
//                 onChange={handleChange}
//                 // onBlur={handleBlur}
//                 value={values.PIN}
//                 fullWidth
//               />
//               Phone Number
//               <TextField
//                 type="text"
//                 name="phone_number"
//                 variant="outlined"
//                 size="small"
//                 placeholder="Input Phone Number"
//                 onChange={handleChange}
//                 // onBlur={handleBlur}
//                 value={values.phone_number}
//                 fullWidth
//               />
//               Password
//               <TextField
//                 type="password"
//                 name="password"
//                 variant="outlined"
//                 size="small"
//                 placeholder="Input Password"
//                 onChange={handleChange}
//                 // onBlur={handleBlur}
//                 value={values.password}
//                 fullWidth
//               />
//             </Grid>
//           </Grid>

//           <Box
//             display="flex"
//             justifyContent="space-between"
//             width="100%"
//             padding="10px 0"
//           >
//             <Box display="flex">
//               <Button
//                 autoFocus
//                 onClick={handleClose}
//                 className={classes.btnSave}
//               >
//                 Back
//               </Button>
//             </Box>
//             <Box display="flex">
//               <Button
//                 type="submit"
//                 autoFocus
//                 className={classes.btnCancel}
//                 disabled={isSubmitting}
//               >
//                 Submit
//               </Button>
//             </Box>
//           </Box>
//         </form>
//         // )}
//         {/* </Formik> */}
//       </Container>
//     </React.Fragment>
//   );
// };

// export default FormAdd;
