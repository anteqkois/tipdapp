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
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import Image, { ImageProps } from 'next/image';
type File = any;

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
    <AvatarPrimitive.Root
      className={`relative shadow-inner-avatar rounded-md w-7 aspect-square overflow-hidden ${className}`}
    >
      <AvatarPrimitive.Image
        {...rest}
        // create utils function to build url to image
        //TODO change avatarPath to url
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${avatar?.filename}`}
        alt="Avatar"
      />
      <AvatarPrimitive.Fallback
        delayMs={100}
        className={className}
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
