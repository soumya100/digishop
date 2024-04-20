import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pathName } from "@/utils/routes";
import { ArrowDownToLine, CheckCircle, Leaf, LucideIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

interface perksInterface{
  name: string,
  icon: LucideIcon,
  desc: string
}
export default function Home() {

  //perks array
  const perks: perksInterface[]=[
    {
      name: 'Instant Delivery',
      icon: ArrowDownToLine,
      desc: 'Get your assets delivered to your email in seconds and download them right away'
    },
    {
      name: 'Guaranteed Quality',
      icon: CheckCircle,
      desc: 'Every asset on our teams is tested by our team to assure high quality standards. Not happy? We offer a 30-day refund guarantee.'
    },
    {
      name: 'For the planet',
      icon: Leaf,
      desc:`we've pledged 1% of sales to the preservation and restoration of the natural resources.`
    }
  ]

  return (
    <Fragment>
      <MaxWidthWrapper>
        <div className={cn('py-20 mx-auto text-center flex flex-col items-center max-w-3xl')}>
          <h1 className={cn('text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl')}>Your marketplace for high-quality
            <span className={cn('text-violet-600')}> digital assets</span>.</h1>
          <p className={cn('mt-6 text-lg max-w-prose text-muted-foreground')}>Welcome DigiShop.
            Every asset on out platform is verified by our team to ensure highest quality standards.</p>
          <div className={cn("flex flex-col sm:flex-row gap-4 mt-6 ")}>
            <Link href={pathName.products} className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant={'outline'} className={cn('border border-violet-400 capitalize')}>
              Our quality promise &rarr;
            </Button>
          </div>
        </div>
        {/* To do list products */}
      </MaxWidthWrapper>
      <section className={cn('border-t border-gray-200 bg-gray-50')}>
        <MaxWidthWrapper className={'py-20'}>
          <div className={cn('grid grid-cols-1 gap-y-12 ms:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0')}>
            {
              perks.map((perk: perksInterface)=>(
                <div key={perk.name} className={cn('text-center md:flex md:items-start md:text-left lg:block lg:text-center')}>
                  <div className={cn('md:flex-shrink-0 flex justify-center')}>
                    <div className={cn('h-16 w-16 flex items-center justify-center rounded-full bg-violet-100 text-violet-900')}>
                      {<perk.icon className="w-1/3 h-1/3"/>}
                    </div>
                  </div>
                  <div className={cn('mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6')}>
                    <h3 className={cn('text-base font-medium text-gray-900')}>
                      {perk.name}
                    </h3>
                    <p className={cn('mt-3 text-sm text-muted-foreground')}>
                      {perk.desc}
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </MaxWidthWrapper>
      </section>
    </Fragment>
  );
}
