import { Compass } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2 text-xl font-bold text-primary">
      <Compass className="h-6 w-6" />
      <h1 className="font-headline">CareerCompass</h1>
    </div>
  );
}
