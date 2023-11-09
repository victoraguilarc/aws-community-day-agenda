import Image from 'next/image'
import logoImage from '@/images/logos/aws_community.png'

export function Logo() {
  return (
      <Image
          className="h-8 w-auto"
          src={logoImage}
          alt=""
      />
  );
}
