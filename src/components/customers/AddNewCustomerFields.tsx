import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  FormControl,
  FormHelperText,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Colors from '../../constants/Colors';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers';
import { useSelectRegion } from '../../hooks/useSelectRegion';
import { useSelectProvince } from '../../hooks/useSelectProvince';
import { useSelectCity } from '../../hooks/useSelectCity';
import { useSelectBarangay } from '../../hooks/useSelectBarangay';

const AddNewCustomerFields = () => {
  const navigate = useNavigate();
  const regions = useSelectRegion();
  const [provinces, setRegionCode] = useSelectProvince();
  const [cities, setProvinceCode] = useSelectCity();
  const [barangays, setCityCode] = useSelectBarangay();

  const initialValues = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    gender: '',
    birthDate: null,
    region: '',
    province: '',
    city: '',
    barangay: '',
  };

  function findChangedProperties(
    oldObj,
    newObj,
    id: number | undefined,
    userId: number | undefined
  ) {
    const changedProperties = {};

    // Iterate through the keys of newObj
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key)) {
        // Check if the key exists in oldObj and the values are different
        if (oldObj[key] !== newObj[key]) {
          changedProperties[key] = newObj[key];
        }
      }
    }

    changedProperties.id = id;
    changedProperties.user_id = userId;

    return changedProperties;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required('First Name is required'),
          middleName: Yup.string().notRequired(),
          lastName: Yup.string().required('Last Name is required'),
          email: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email Address is required'),
          contactNumber: Yup.string()
            .matches(/^(09\d{9})?$/, 'Invalid Contact Number')
            .required('Contact Number is required'),
          gender: Yup.string()
            .oneOf(['Male', 'Female'], 'Invalid gender')
            .required('Gender is required'),
          birthDate: Yup.date()
            .required('Birth Date is required')
            .max(new Date(), 'Birth Date cannot be in the future'),
          region: Yup.string().required('Region is required'),
          province: Yup.string().required('Province is required'),
          city: Yup.string().required('City is required'),
          barangay: Yup.string().required('Barangay is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          console.log(values);
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader='Please fill in the input fields to add a customer.'
                title='Customer Information'
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.firstName && errors.firstName)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.firstName && errors.firstName)}
                          label='First Name'
                          name='firstName'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.firstName}
                        />
                        {touched.firstName && errors.firstName && (
                          <FormHelperText error id='text-first-name'>
                            {errors.firstName}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.middleName && errors.middleName)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.middleName && errors.middleName
                          )}
                          label='Middle Name (Optional)'
                          name='middleName'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.middleName}
                        />
                        {touched.middleName && errors.middleName && (
                          <FormHelperText error id='text-middle-name'>
                            {errors.middleName}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={4}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.lastName && errors.lastName)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.lastName && errors.lastName)}
                          label='Last Name'
                          name='lastName'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.lastName}
                        />
                        {touched.lastName && errors.lastName && (
                          <FormHelperText error id='text-last-name'>
                            {errors.lastName}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.gender && errors.gender)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.gender && errors.gender)}
                          label='Select Gender'
                          name='gender'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.gender}
                        >
                          <option value='' disabled hidden></option>
                          <option value='Male'>Male</option>
                          <option value='Female'>Female</option>
                        </TextField>
                        {touched.gender && errors.gender && (
                          <FormHelperText error id='text-gender'>
                            {errors.gender}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.birthDate && errors.birthDate)}
                      >
                        <DatePicker
                          disableFuture
                          label='Select a Birth Date'
                          name='birthDate'
                          onBlur={handleBlur}
                          onChange={(value) =>
                            setFieldValue('birthDate', value, true)
                          }
                          required
                          value={values.birthDate}
                          slotProps={{
                            textField: {
                              error: Boolean(
                                touched.birthDate && errors.birthDate
                              ),
                            },
                          }}
                        />
                        {touched.birthDate && errors.birthDate && (
                          <FormHelperText error id='text-birth-date'>
                            {errors.birthDate}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          label='Email Address'
                          name='email'
                          type='email'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.email}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id='text-email-address'>
                            {errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(
                          touched.contactNumber && errors.contactNumber
                        )}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(
                            touched.contactNumber && errors.contactNumber
                          )}
                          label='Contact Number'
                          name='contactNumber'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          value={values.contactNumber}
                        />
                        {touched.contactNumber && errors.contactNumber && (
                          <FormHelperText error id='text-contact-number'>
                            {errors.contactNumber}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.region && errors.region)}
                      >
                        <TextField
                          fullWidth
                          error={Boolean(touched.region && errors.region)}
                          label='Select Region'
                          name='region'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const selectedRegion = regions?.find(
                              (el) => el.region_name === e.target.value
                            );

                            setRegionCode(selectedRegion.region_code);

                            setFieldValue('region', e.target.value);
                            setFieldValue('province', '');
                            setFieldValue('city', '');
                            setFieldValue('barangay', '');
                            console.log(values);
                          }}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.region}
                        >
                          <option value='' disabled hidden></option>
                          {regions?.map((el) => {
                            return (
                              <option key={el.id} value={el.region_name}>
                                {el.region_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.region && errors.region && (
                          <FormHelperText error id='text-region'>
                            {errors.region}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.province && errors.province)}
                      >
                        <TextField
                          disabled={Boolean(provinces?.length === 0)}
                          fullWidth
                          error={Boolean(touched.province && errors.province)}
                          label='Select Province'
                          name='province'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const selectedProvince = provinces?.find(
                              (el) => el.province_name === e.target.value
                            );

                            setProvinceCode(selectedProvince.province_code);
                            setFieldValue('province', e.target.value);
                            setFieldValue('city', '');
                            setFieldValue('barangay', '');
                          }}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.province}
                        >
                          <option value='' disabled hidden></option>
                          {provinces?.map((el) => {
                            return (
                              <option key={el.id} value={el.province_name}>
                                {el.province_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.province && errors.province && (
                          <FormHelperText error id='text-province'>
                            {errors.province}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.city && errors.city)}
                      >
                        <TextField
                          disabled={
                            Boolean(cities?.length === 0) ||
                            Boolean(!values.province)
                          }
                          fullWidth
                          error={Boolean(touched.city && errors.city)}
                          label='Select City'
                          name='city'
                          onBlur={handleBlur}
                          onChange={(e) => {
                            const selectedCity = cities?.find(
                              (el) => el.city_name === e.target.value
                            );

                            setCityCode(selectedCity.city_code);
                            setFieldValue('city', e.target.value);
                            setFieldValue('barangay', '');
                          }}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.city}
                        >
                          <option value='' disabled hidden></option>
                          {cities?.map((el) => {
                            return (
                              <option key={el.id} value={el.city_name}>
                                {el.city_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.city && errors.city && (
                          <FormHelperText error id='text-city'>
                            {errors.city}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid xs={12} md={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(touched.barangay && errors.barangay)}
                      >
                        <TextField
                          disabled={
                            Boolean(barangays?.length === 0) ||
                            Boolean(!values.city)
                          }
                          fullWidth
                          error={Boolean(touched.barangay && errors.barangay)}
                          label='Select Barangay'
                          name='barangay'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.barangay}
                        >
                          <option value='' disabled hidden></option>
                          {barangays?.map((el) => {
                            return (
                              <option key={el.id} value={el.brgy_name}>
                                {el.brgy_name}
                              </option>
                            );
                          })}
                        </TextField>
                        {touched.barangay && errors.barangay && (
                          <FormHelperText error id='text-barangay'>
                            {errors.barangay}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <LoadingButton
                  disableElevation
                  disabled={isSubmitting}
                  type='submit'
                  variant='contained'
                  sx={{ backgroundColor: Colors.primaryColor }}
                >
                  Save details
                </LoadingButton>
              </CardActions>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddNewCustomerFields;
