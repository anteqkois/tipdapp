import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { Button } from './Button';
import { Tooltip } from './Tooltip';

export const CustomConnectButton = () => (
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
          className={!ready ? 'pointer-events-none select-none opacity-0' : ''}
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
              <div className="flex flex-col gap-3 ">
                <Tooltip content="Switch network">
                  <Button
                    onClick={openChainModal}
                    className="flex max-h-8 items-center justify-between gap-2"
                    type="button"
                    variant="overlay"
                  >
                    {chain.hasIcon && (
                      <div
                        className="h-5 w-5 overflow-hidden rounded-full"
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            height="20"
                            width="20"
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                    <ChevronDownIcon className="mt-0.5 h-6 w-6" />
                  </Button>
                </Tooltip>
                <Tooltip content="Disconnect / Copy">
                  <Button
                    onClick={openAccountModal}
                    className="flex max-h-8 items-center justify-center gap-2"
                    type="button"
                    variant="overlay"
                  >
                    {/* <Avatar aaddress=alletAddress} className="w-6 h-6" /> */}
                    {account.displayName}
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                  </Button>
                </Tooltip>
              </div>
            );
          })()}
        </div>
      );
    }}
  </ConnectButton.Custom>
);
