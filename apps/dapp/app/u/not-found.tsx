import { ErrorMessage } from '@/shared/ui';

export default function NotFound() {
  return (
    <div className="flex-center h-screen w-screen">
      <ErrorMessage>404 - Page Not Found</ErrorMessage>;
    </div>
  );
}
