'use client';
import { update } from '@/api/page';
import { Button, Card, Input, Tooltip } from '@/components/utils';
import { useUser } from '@/hooks';
import { mapValidationErrors } from '@/utils/error';
import { PageValidation, pageValidation } from '@tipdapp/server';
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
      affixUrl: user?.streamer?.page?.affixUrl ?? '',
      description: user?.streamer?.page?.description ?? '',
    },
    onSubmit: async (values: PageValidation.Update) => {
      if (!Object.keys(formik.errors).length) {
        try {
          pageValidation.updateParse(values);
          await update(values);
        } catch (error: any) {
          if (error[0].type === 'ValidationError') {
            formik.setErrors(mapValidationErrors(error));
          } else {
            console.log(error);
            toast.error(
              'Something went wrong, can not update your page details.'
            );
          }
        }
      }
    },
  });

  return (
    <section>
      <Card className="grid">
        <form onSubmit={formik.handleSubmit}>
          <Link href={`streamer/${user?.streamer?.page?.affixUrl}`}>
            <Button variant="link">See your page</Button>
          </Link>
          <Tooltip content="Disabled option now">
            <div className="relative">
              <Input
                id="affixUrl"
                name="affixUrl"
                label="URL of your side"
                type="text"
                className="pl-52"
                disabled={true}
                onChange={formik.handleChange}
                value={formik.values.affixUrl}
                error={formik.errors.affixUrl}
              ></Input>
              <span className="absolute text-neutral-light top-[29px] left-[1px] p-2 bg-neutral-200 rounded  rounded-tr-none rounded-br-none">
                https://cryptotip/streamer/
              </span>
              <span className="absolute text-neutral-light top-[29px] right-[1px] p-2 bg-neutral-200 rounded  rounded-tl-none rounded-bl-none">
                {user?.streamer?.page?.affixUrl.length}/20
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
