'use client';
import { update } from '@/api/page';
import { formTokenOptions, SelectTokens } from '@/modules/Token/components/SelectTokens';
import { useTokenFind } from '@/modules/Token/hooks/useTokenQuery';
import {
  Button,
  Card,
  CheckBox,
  Input,
  Link,
  TextArea,
  Tooltip,
} from '@/shared/ui';
import { useUser } from '@/shared/User/hooks/useUser';
import {
  isValidationError,
  PageApi,
  pageValidation,
  Token,
  ValidationError,
} from '@tipdapp/server';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
  const { user, refreshUser } = useUser();
  const { data } = useTokenFind();

  const tokensToSelect = useMemo(
    () => data?.tokens && formTokenOptions(data.tokens),
    [data?.tokens]
  );

  const initialTokens = useMemo(
    () =>
      user?.streamer.activeTokens &&
      formTokenOptions(user.streamer.activeTokens),
    [user?.streamer.activeTokens]
  );

  const formik = useFormik({
    initialValues: {
      // baner/themecolor/link to yt.../display total supply of token/link to etherscan token
      affixUrl: user?.streamer?.page?.affixUrl ?? '',
      description: user?.streamer?.page?.description ?? '',
      tokens: user?.streamer?.activeTokens.map((token) => token.symbol) || [],
      termsAndConditions: false,
    },
    onSubmit: async (values: PageApi.Update.Body) => {
      if (!Object.keys(formik.errors).length) {
        try {
          pageValidation.updateParse(values);
          const { message } = await update(values);
          refreshUser();
          toast.success(message);
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
          <TextArea
            label="Description:"
            name="description"
            id="description"
            error={formik.errors.description}
            value={formik.values.description}
            cols={30}
            rows={10}
            onChange={formik.handleChange}
          />
          {tokensToSelect && (
            <SelectTokens
              label="Select the ERC20 tokens that will be available for tipping:"
              id="tokens"
              options={tokensToSelect}
              isMulti
              name="tokens"
              defaultValue={initialTokens}
              setFieldValue={formik.setFieldValue}
              error={formik.errors.tokens as string | undefined}
            />
          )}
          <CheckBox
            label="Accept terms and conditions."
            name="termsAndConditions"
            id="termsAndConditions"
            onChange={formik.handleChange}
            checked={formik.values.termsAndConditions}
          />
          <Button
            type="submit"
            variant="success"
            className='w-full'
          >
            Save
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default Page;
