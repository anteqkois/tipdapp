import { ErrorMessage } from '@/shared/ui';

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex-center">
      <ErrorMessage>404 - Page Not Found</ErrorMessage>;
    </div>
  );
}
