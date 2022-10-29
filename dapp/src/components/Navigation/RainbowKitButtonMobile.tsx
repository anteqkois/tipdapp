'use client';
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { Button } from '../utils';

type Props = {
  classNameButton: string;
};

export const RainbowKitButtonMobile = ({ classNameButton }: Props) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            className={
              !ready ? 'opacity-0 pointer-events-none select-none' : ''
            }
            aria-hidden={!ready}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div className="w-full">
                  <button
                    onClick={openChainModal}
                    className={`${classNameButton} justify-between w-full`}
                    type="button"
                  >
                    <div className="flex gap-3 items-center">
                      {chain.hasIcon && (
                        <div
                          className="rounded-full overflow-hidden"
                          style={{
                            background: chain.iconBackground,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              height="24"
                              width="24"
                            />
                          )}
                        </div>
                      )}
                      switch network ({chain.name})
                    </div>
                    <ChevronDownIcon className="w-6 h-6 mt-0.5" />
                  </button>
                  <button
                    onClick={openAccountModal}
                    className={`${classNameButton} w-full`}
                    type="button"
                  >
                    {/* <Avatar avatarPath={user} address={user.address} className="w-6 h-6" /> */}
                    <ArrowRightOnRectangleIcon className="w-6 h-6" />
                    {/* {account.displayName} */}
                    logout / address
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
