import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { DiamondIcon } from '@/components/DiamondIcon'
import { Logo } from '@/components/Logo'

export function Header() {
  return (
    <header className="relative z-50 flex-none lg:pt-11">
      <Container className="flex flex-wrap items-center justify-center lg:flex-nowrap">
        <div className="mt-12 lg:mt-0 lg:grow lg:basis-0">
          <Logo/>
        </div>
        <div className="order-first -mx-4 flex justify-center lg:justify-end basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
          <div className="flex items-center justify-center gap-4 px-4 text-aws-yellow sm:justify-end">
            <p>
              <time dateTime="2023-11-11">11 de Noviembre, 2023</time>
            </p>
            <DiamondIcon className="h-1.5 w-1.5 overflow-visible fill-current stroke-current" />
            <p>Monterrey, NL</p>
          </div>
        </div>
      </Container>
    </header>
  )
}
