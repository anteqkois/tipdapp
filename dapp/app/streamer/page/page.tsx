'use client';
import { update } from '@/api/page';
import { SelectTokens } from '@/modules/Token/components/SelectTokens';
import { useTokenFind } from '@/modules/Token/hooks/useTokenQuery';
import { Button, Card, Input, Link, Tooltip } from '@/shared/ui';
import { useUser } from '@/shared/User/hooks/useUser';
import {
  isValidationError,
  PageValidation,
  pageValidation,
  ValidationError,
} from '@tipdapp/server';
import classNames from 'classnames';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

//TODO? use page to be ability in future to change this element by user(for example can change to show default top tiper)
const Page = () => {
  const { user } = useUser();
  const { data } = useTokenFind();

  const formik = useFormik({
    initialValues: {
      // baner/themecolor/link to yt.../display total supply of token/link to etherscan token
      affixUrl: user?.streamer?.page?.affixUrl ?? '',
      description: user?.streamer?.page?.description ?? '',
      tokens: null,
    },
    // onSubmit: async (values: PageValidation.Update) => {
    onSubmit: async (values:any) => {
      console.log(values);
      if (!Object.keys(formik.errors).length) {
        try {
          pageValidation.updateParse(values);
          await update(values);
        } catch (error: any) {
          if (isValidationError(error[0])) {
            formik.setErrors(ValidationError.mapArrayByField(error));
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
            <h6 className="p-1"> See your page</h6>
          </Link>
          <Tooltip content="Disabled option now">
            <div className="relative">
              <Input
                id="affixUrl"
                name="affixUrl"
                label="URL of your side (Url editing isn't avaible now.)"
                type="text"
                className="pl-52"
                disabled={true}
                onChange={formik.handleChange}
                value={formik.values.affixUrl}
                error={formik.errors.affixUrl}
              ></Input>
              <span className="absolute text-neutral-light top-[29px] left-[1px] p-2 bg-neutral-200 rounded  rounded-tr-none rounded-br-none">
                {`https://tipdapp/u/${user?.activeRole}/${user?.nick}`}
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
          {data?.tokens && (
            <SelectTokens
              label="Select the ERC20 tokens that will be available for tipping:"
              id="tokens"
              tokens={data?.tokens}
              isMulti
              name="tokens"
              onChange={formik.handleChange}
              value={formik.values.tokens}
              error={formik.errors.tokens}
            />
          )}
          <label
            className="Label"
            htmlFor="c1"
          >
            Accept terms and conditions.
          </label>
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
