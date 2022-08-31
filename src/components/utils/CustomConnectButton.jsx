import useUser from '@/hooks/useUser';
import { ArrowRightOnRectangleIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Avatar from './Avatar';
import Button from './Button';
import Tooltip from './Tooltip';

export const CustomConnectButton = () => {
  const { logout, user } = useUser();

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div className={!ready ? 'opacity-0 pointer-events-none select-none' : ''} aria-hidden={!ready}>
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                );
              }
              return (
                <div className="flex flex-col gap-3 ">
                  <Tooltip content="Switch network">
                    <Button
                      onClick={openChainModal}
                      className="flex items-center justify-between gap-2"
                      type="button"
                      option="overlay"
                    >
                      {chain.hasIcon && (
                        <div
                          className="w-6 h-6 rounded-full overflow-hidden"
                          style={{
                            background: chain.iconBackground,
                          }}
                        >
                          {chain.iconUrl && <img alt={chain.name ?? 'Chain icon'} src={chain.iconUrl} className="w-6 h-6" />}
                        </div>
                      )}
                      {chain.name}
                      <ChevronDownIcon className="w-6 h-6 mt-0.5" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Disconnect / Copy">
                    <Button
                      onClick={openAccountModal}
                      //TODO handle logout 
                      // onClick={logout}
                      className="flex items-center justify-between gap-2"
                      type="button"
                      option="overlay"
                    >
                      <Avatar avatarPath={user} walletAddress={user.walletAddress} className="w-6 h-6" />
                      {account.displayName}
                      <ArrowRightOnRectangleIcon className="w-6 h-6" />
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
};
