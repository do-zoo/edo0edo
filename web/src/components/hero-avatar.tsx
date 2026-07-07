'use client';

import GlareHover from '@/components/GlareHover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

type HeroAvatarProps = {
  name: string;
  src: string;
};

export function HeroAvatar({ name, src }: HeroAvatarProps) {
  const reducedMotion = useReducedMotion();

  const avatar = (
    <Avatar className="relative h-48 w-48 shadow-[0_0_48px_-8px] shadow-primary/40 ring-2 ring-primary/50 ring-offset-4 ring-offset-background after:hidden md:h-60 md:w-60 xl:h-72 xl:w-72">
      <AvatarImage src={src} alt={name} className="object-cover" />
      <AvatarFallback className="text-4xl font-display">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <div className="relative flex justify-center lg:justify-end">
      <div className="absolute -inset-8 rounded-full bg-primary/20 blur-3xl" />
      {reducedMotion ? (
        avatar
      ) : (
        <GlareHover
          width="auto"
          height="auto"
          background="transparent"
          borderRadius="9999px"
          borderColor="transparent"
          glareColor="#f59e0b"
          glareOpacity={0.35}
          glareSize={200}
          className="!h-auto !w-auto !cursor-default !border-0 !bg-transparent"
          style={{ width: 'auto', height: 'auto' }}
        >
          {avatar}
        </GlareHover>
      )}
    </div>
  );
}
