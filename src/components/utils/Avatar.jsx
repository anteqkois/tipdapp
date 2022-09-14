/*
 * This file use pixel-art-neutral
 *
 * Copyright (c) 2012 Plastic Jam
 * Copyright (c) 2021 Florian Körner
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import * as AvatarPrimitive from '@radix-ui/react-avatar';

export const Avatar = ({ avatarPath, walletAddress, className }) => {
  return (
    <AvatarPrimitive.Root>
      {/* <AvatarPrimitive.Root className={`relative inline-flex h-10 w-10 ${className}`}> */}
      <AvatarPrimitive.Image
        // src={avatarPath}
        src={''}
        alt="Avatar"
        // className={` ${className}`}
        // className="h-full w-full object-cover rounded"
        // className={cx(
        //   'h-full w-full object-cover',
        //   {
        //     [Variant.Circle]: 'rounded-full',
        //     [Variant.Rounded]: 'rounded',
        //   }[variant],
        // )}
      />
      <AvatarPrimitive.Fallback delayMs={100} className={className}>
        <img
          // width={48}
          // height={48}
          className={`inline-block shadow-md rounded-md w-7 aspect-square ${className}`}
          alt="user avatar"
          src={`https://avatars.dicebear.com/api/pixel-art-neutral/${walletAddress}.svg`}
        />
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
export default Avatar;
