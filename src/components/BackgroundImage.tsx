import Image from 'next/image'
import clsx from 'clsx'

import backgroundImage from '@/images/background.jpg'

export function BackgroundImage({
  className,
  position = 'left',
}: {
  className?: string
  position?: 'left' | 'right'
}) {
  return (
    <div
      className={clsx(
        // 'absolute inset-2.5 bg-indigo-50',
        className,
      )}
    >
    </div>
  )
}
