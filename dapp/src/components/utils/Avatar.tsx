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

type AvatarProps = {
  avatarPath: string;
  address: string;
  className: string;
};

//TODO change avatarPath to url

export const Avatar = ({ avatarPath, address, className }: AvatarProps) => {
  return (
    <AvatarPrimitive.Root>
      <AvatarPrimitive.Image
        // src={avatarPath}
        src={''}
        alt="Avatar"
      />
      <AvatarPrimitive.Fallback
        delayMs={100}
        className={className}
      >
        <img
          // width={48}
          // height={48}
          className={`inline-block shadow-md rounded-md w-7 aspect-square ${className}`}
          alt="user avatar"
          src={`https://avatars.dicebear.com/api/pixel-art-neutral/${address}.svg`}
        />
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
export default Avatar;
