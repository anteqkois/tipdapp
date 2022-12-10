import { ErrorMessage } from '@/components/utils';

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex-center">
      <ErrorMessage>404 - Page Not Found</ErrorMessage>;
    </div>
  );
}
