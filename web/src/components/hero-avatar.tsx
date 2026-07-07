'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type HeroAvatarProps = {
  name: string;
  src: string;
};

const avatarSizes =
  'h-48 w-48 md:h-60 md:w-60 xl:h-72 xl:w-72';

export function HeroAvatar({ name, src }: HeroAvatarProps) {
  return (
    <div className="relative mx-auto flex w-fit items-center justify-center">
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl ${avatarSizes}`}
        aria-hidden
      />
      <Avatar
        className={`relative ${avatarSizes} overflow-hidden bg-secondary shadow-[0_0_48px_-8px] shadow-primary/40 ring-2 ring-primary/50 ring-offset-2 ring-offset-background after:hidden`}
      >
        <AvatarImage
          src={src}
          alt={name}
          className="object-cover object-[center_22%] brightness-95 contrast-105"
        />
        <AvatarFallback className="bg-secondary text-4xl font-display">
          {name[0]}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
