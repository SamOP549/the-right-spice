import { Carousel } from '@mantine/carousel';
import Link from 'next/link';

export default function Demo({ items }) {
    return (
        <Carousel
            slideSize="33.333333%"
            slideGap="md"
            breakpoints={[
                { maxWidth: 'md', slideSize: '50%' },
                { maxWidth: 'sm', slideSize: '50%' },
                { maxWidth: 'xs', slideSize: '100%' }
            ]}
            loop
            align="start"
            slidesToScroll={1}
        >
            {
                Object.keys(items).map((item) => {
                    return (
                        <Link passHref={true} href={`/product/${items[item].slug}`} key={items[item]._id}>
                            <Carousel.Slide>
                                <div className='py-8 px-4 rounded'>
                                    <img
                                        alt={items[item].title}
                                        src={items[item].img[0]["data_url"]}
                                        class="h-96 w-full object-cover"
                                    />

                                    <h3 class="mt-4 font-medium">{items[item].title}</h3>

                                    <p class="mt-2 text-sm text-gray-700">
                                        ₹{items[item].price}
                                    </p>
                                </div>
                            </Carousel.Slide>
                        </Link>
                    )
                })
            }
        </Carousel>
    );
}