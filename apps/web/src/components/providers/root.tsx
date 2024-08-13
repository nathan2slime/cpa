import { AppChildren } from '@/types';

export const RootProvider = ({ children }: Readonly<AppChildren>) => {
  return (
    <div className="bg-background w-screen h-screen overflow-hidden">
      {children}
    </div>
  );
};
