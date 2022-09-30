import Button from '@/components/utils/Button';
import Card from '@/components/utils/Card';
import Input from '@/components/utils/Input';
import useUser from '@/hooks/useUser';
import { useFormik } from 'formik';
import Link from 'next/link';

const validate = (values) => {
  const errors = {};

  // if (!emailRegex.test(values.email)) errors.email = 'Invalid e-mail';
  // if (values.firstName.length === 0) errors.firstName = 'Type your name';
  // if (values.lastName.length === 0) errors.lastName = 'Type your last name';
  // if (values.nick.length === 0) errors.nick = 'Type your nick';

  errors.url = 'URL is to long';
  errors.description = 'URL is to long';

  return errors;
};

const Page = () => {
  const { user } = useUser();

  console.log(user);

  // useEffect(() => {
  //   if (error) {
  //     const errors = {};

  //     error.forEach((error) => {
  //       errors[error.field] = error.userMessage;
  //     });

  //     formik.setErrors(errors);
  //   }
  // }, [error]);

  const formik = useFormik({
    initialValues: {
      // avatar/baner/themecolor/link to yt.../display total supply of token/link to etherscan token
      url: '',
      description: '',
      // email: '',
      // nick: '',
    },
    validate,
    onSubmit: async (values) => {
      // if (!Object.keys(formik.errors).length) {
      //   await signIn(values);
      // }
    },
  });

  return (
    <section>
      <Card className="grid">
        <form onSubmit={formik.handleSubmit}>
          <Link href={``}>
            <Button option="link">See your page</Button>
          </Link>
          <div className="relative">
            <Input
              id="url"
              name="url"
              label="URL of your side"
              type="text"
              className="pl-52"
              onChange={formik.handleChange}
              value={formik.values.url}
              error={formik.errors.url}
            ></Input>
            <span className="absolute text-neutral-light top-[29px] left-[1px] p-2 bg-neutral-200 rounded  rounded-tr-none rounded-br-none">
              https://cryptotip/user/
            </span>
            <span className="absolute text-neutral-light top-[29px] right-[1px] p-2 bg-neutral-200 rounded  rounded-tl-none rounded-bl-none">
              6/100
            </span>
          </div>
          <div className="my-3">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-neutral-800 first-letter:uppercase">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              className={`block p-2 w-full resize-none bg-gray-50 rounded border ${
                formik.errors.description ? 'border-alert-600' : 'border-neutral-300'
              } shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50`}
            ></textarea>
            <p className="text-alert-600 min-h-[24px]">{formik.errors.description && `* ${formik.errors.description}`}</p>
          </div>
          <Button className="mt-3" type="submit">
            Save
          </Button>
        </form>
      </Card>
    </section>
  );
};

Page.isProtected = true;

export default Page;
