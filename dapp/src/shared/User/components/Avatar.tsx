/*
 * This file use pixel-art-neutral
 *
 * Copyright (c) 2012 Plastic Jam
 * Copyright (c) 2021 Florian Körner
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
// import { File } from '@prisma/client';
import { Spinner } from '@/shared/ui';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { File } from '@tipdapp/server';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type AvatarProps = {
  avatar?: File | null;
  address: string | undefined;
} & Pick<ImageProps, 'onClick' | 'className'>;

export const Avatar = ({
  avatar,
  address,
  className,
  ...rest
}: AvatarProps) => {
  const [loading, setloading] = useState(true);
  return (
    <AvatarPrimitive.Root
      className={`absolute block bg-neutral-150 shadow-inner-avatar rounded-md w-7 aspect-square overflow-hidden ${className}`}
    >
      {loading ? (
        <Spinner className='w-10'/>
      ) : (
        <AvatarPrimitive.Image
          {...rest}
          // create utils function to build url to image
          //TODO change avatarPath to url
          onLoadingStatusChange={(status) => {
            status !== 'loading' && setloading(false);
            console.log(status);
          }}
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${avatar?.filename}`}
          alt="Avatar"
        />
      )}
      <AvatarPrimitive.Fallback
        // delayMs={100}
        // className={` ${className}`}
      >
        <Image
          fill={true}
          {...rest}
          alt="user avatar"
          src={`https://avatars.dicebear.com/api/pixel-art-neutral/${address}.svg`}
        />
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
export default Avatar;
