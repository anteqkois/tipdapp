import { createAuthenticationAdapter, RainbowKitAuthenticationProvider } from '@rainbow-me/rainbowkit';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { SiweMessage } from 'siwe';

const RainbowKitAuthAdapter = ({ children, enabled }) => {
  const { status } = useSession();
  const router = useRouter();

  const authAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const response = await getCsrfToken();
      return response ?? '';
    },
    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });
    },
    getMessageBody: ({ message }) => {
      return message.prepareMessage();
    },
    verify: ({ message, signature }) => {
      signIn('credentials', {
        message: JSON.stringify(message),
        signature, // <-- comment this out to throw an error & reach the error page ./pages/auth/signin.tsx
        redirect: true,
        callbackUrl: `${window.location.origin}/${router.query?.callback ?? '/dashboard'}`,
      });
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    },
    signOut: async () => {
      signOut({ callbackUrl: `${window.location.origin}/login` });
    },
  });

  return (
    <RainbowKitAuthenticationProvider adapter={authAdapter} enabled={enabled} status={status}>
      {children}
    </RainbowKitAuthenticationProvider>
  );
};
export default RainbowKitAuthAdapter;
