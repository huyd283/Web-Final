import { ErrorMessage, Field, Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import React from 'react';
import * as Yup from 'yup';

import UserLayout from '@/layouts/UserLayout';
import { useAppSelector } from '@/stores';

const GiftSchema = Yup.object().shape({
  username: Yup.string()
    .max(50, 'Giftcode không được vượt quá 50 ký tự')
    .required('Giftcode là bắt buộc')
});

// interface FormData {
//   code: string;
// }

export default function GiftCode() {
  // const dispatch = useAppDispatch();
  // const router = useRouter();

  const { loading } = useAppSelector((state) => state.authen);
  const initialValues = {
    code: ''
  };

  // const handleSubmit = async (values: FormData, formikHelpers: FormikHelpers<FormData>) => {
  //   // const result: any = await dispatch(loginAction(values)).unwrap();
  //   // if (result) {
  //   //     router.push('/home');
  //   // }
  //   formikHelpers.setSubmitting(false);
  // };
  const handleSubmit = () => {};

  return (
    <UserLayout>
      <div className="mx-auto ml-64 mt-20 items-center justify-center bg-gray-200">
        <div className="mt-12 flex w-full flex-row items-center justify-center">
          <span className="pt-4 text-center text-4xl">
            <strong className="uppercase">GiftCode</strong>
          </span>
        </div>
        <div className="flex w-full items-center justify-center">
          <Formik
            initialValues={initialValues}
            validationSchema={GiftSchema}
            onSubmit={handleSubmit}
          >
            <Form className=" mx-auto my-12 flex w-1/2 flex-col items-center justify-center bg-white p-4">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-1/2"
              >
                <div className="my-2 block">
                  <span className="text-xl font-bold text-yellow">Gifcode</span>
                </div>
                <Field
                  className="h-14 w-full rounded text-xl"
                  type="text"
                  id="code"
                  name="code"
                  placeholder="Nhập Gifcode"
                  required
                />
                <ErrorMessage name="code" component="div" className="text-xl text-red-500" />
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9 }}
                  className="flex w-full items-center justify-center pt-8"
                >
                  <button
                    className="flex  h-14 w-60 items-center justify-center rounded bg-[#3bd09c] "
                    disabled={loading}
                    type="submit"
                  >
                    <span className="text-center text-xl uppercase text-white shadow-2xl">
                      Kích hoạt
                    </span>
                  </button>
                </motion.div>
              </motion.div>
            </Form>
          </Formik>
        </div>
      </div>
    </UserLayout>
  );
}
