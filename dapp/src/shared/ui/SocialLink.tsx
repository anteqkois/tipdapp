import { ReactNode } from 'react';
import { Link } from './Link';

type Props = {
  // children: ReactNode;
  href: string;
  socialMedium: 'youtube' | 'twitch';
};

const socialMediaIcons: Record<Props['socialMedium'], ReactNode> = {
  youtube: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="fill-[#FF0000]"
    >
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
  ),
  twitch: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="fill-[#6441A5]"
    >
      <path
        d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  ),
};

const labels: Record<Props['socialMedium'], string> = {
  twitch: 'Twitch',
  youtube: 'YouTube',
};

export const SocialLink = ({ href, socialMedium }: Props) => {
  return (
    <Link
      href={href}
      className="flex gap-2"
    >
      {socialMediaIcons[socialMedium]}
      {labels[socialMedium]}
    </Link>
  );
};
