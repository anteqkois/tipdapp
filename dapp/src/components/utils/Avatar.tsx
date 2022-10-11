/*
 * This file use pixel-art-neutral
 *
 * Copyright (c) 2012 Plastic Jam
 * Copyright (c) 2021 Florian Körner
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { File } from '@prisma/client';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import Image, { ImageProps } from 'next/image';

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
  return (
    <AvatarPrimitive.Root>
      <AvatarPrimitive.Image
        {...rest}
        // create utils function to build url to image
        //TODO change avatarPath to url
        src={`${avatar?.filename}`}
        alt="Avatar"
      />
      <AvatarPrimitive.Fallback
        delayMs={100}
        className={className}
      >
        <div
          className={`inline-block shadow-md rounded-md w-7 aspect-square overflow-hidden ${className}`}
        >
          <Image
            height={24}
            width={24}
            layout="responsive"
            {...rest}
            alt="user avatar"
            src={`https://avatars.dicebear.com/api/pixel-art-neutral/${address}.svg`}
          />
        </div>
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};
export default Avatar;
