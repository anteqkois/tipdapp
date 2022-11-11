'use client';
import { update } from '@/api/page';
import { Button, Card, Input, Tooltip } from '@/components/utils';
import { useUser } from '@/hooks';
import {
  UserPageFormObject,
  userPageFormParse,
} from '@/validation/userPageValidation';
import classNames from 'classnames';
import { useFormik } from 'formik';
import Link from 'next/link';
import toast from 'react-hot-toast';

//TODO? use page to be ability in future to change this element by user(for example can change to show default top tiper)
const Page = () => {
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      // baner/themecolor/link to yt.../display total supply of token/link to etherscan token
      url: user?.page?.url ?? '',
      description: user?.page?.description ?? '',
    },
    validate: userPageFormParse,
    // validate: userPageValidation,
    onSubmit: async (values: UserPageFormObject) => {
      if (!Object.keys(formik.errors).length) {
        try {
          // console.log(values);
          await update(values);
        } catch (error) {
          toast.error(
            'Something went wrong, can not update your page details.'
          );
        }
      }
    },
  });

  return (
    <section>
      <Card className="grid">
        <form onSubmit={formik.handleSubmit}>
          <Link href={`user/${user.page?.url}`}>
            <Button option="link">See your page</Button>
          </Link>
          <Tooltip content="Disabled option now">
            <div className="relative">
              <Input
                id="url"
                name="url"
                label="URL of your side"
                type="text"
                className="pl-52"
                disabled={true}
                onChange={formik.handleChange}
                value={formik.values.url}
                error={formik.errors.url}
              ></Input>
              <span className="absolute text-neutral-light top-[29px] left-[1px] p-2 bg-neutral-200 rounded  rounded-tr-none rounded-br-none">
                https://cryptotip/user/
              </span>
              <span className="absolute text-neutral-light top-[29px] right-[1px] p-2 bg-neutral-200 rounded  rounded-tl-none rounded-bl-none">
                {user.page?.url.length}/20
              </span>
            </div>
          </Tooltip>
          <div className="my-3">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-neutral-800 first-letter:uppercase"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              cols={30}
              rows={10}
              onChange={formik.handleChange}
              className={classNames(
                'block p-2 w-full resize-none bg-gray-50 rounded border',
                [
                  formik.errors.description
                    ? 'border-danger-600'
                    : 'border-neutral-300',
                ],
                'shadow-sm focus:outline-none focus:border-primary focus:ring focus:ring-primary-light focus:ring-opacity-50'
              )}
            ></textarea>
            <p className="text-danger-600 min-h-[24px]">
              {formik.errors.description && `* ${formik.errors.description}`}
            </p>
          </div>
          <Button
            className="mt-3"
            type="submit"
          >
            Save
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default Page;
