import React from "react";
import { Formik } from "formik";
import { Grid, TextField, Container } from "@material-ui/core";

const FormAdd = () => {
  return (
    <React.Fragment>
      <Container>
        <Formik
          initialValues={{ case_name: "", password: "" }}
          validate={(values) => {
            const errors = {};

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid item md={6} lg={6} xs={12}>
                  Case Name
                  <TextField
                    type="text"
                    name="case_name"
                    variant="outlined"
                    size="small"
                    placeholder="Input Case Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.case_name}
                    fullWidth
                  />
                  Case Name
                  <TextField
                    type="text"
                    name="case_name"
                    variant="outlined"
                    size="small"
                    placeholder="Input Case Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.case_name}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                  Case Name
                  <TextField
                    type="text"
                    name="case_name"
                    variant="outlined"
                    size="small"
                    placeholder="Input Case Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.case_name}
                    fullWidth
                  />
                  Case Name
                  <TextField
                    type="text"
                    name="case_name"
                    variant="outlined"
                    size="small"
                    placeholder="Input Case Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.case_name}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
};

export default FormAdd;
