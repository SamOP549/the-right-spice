import { Carousel } from '@mantine/carousel';
import Link from 'next/link';

export default function Demo({ items, category }) {
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
                        <Link passHref={true} href={`/${category}/${items[item].slug}`} key={items[item]._id}>
                            <Carousel.Slide>
                                <div className='p-3 rounded-lg shadow-lg cursor-pointer hover:shadow-xl border'>
                                    <img
                                        alt={items[item].title}
                                        src={items[item].img[0]["data_url"]}
                                        className="w-full object-cover rounded aspect-square"
                                    />

                                    <h3 className="mt-4 text-xl text-black/90">{items[item].title}</h3>

                                    <p className="mt-2 font-bold text-xl text-gray-700">
                                        ₹{items[item].price.toFixed(2)}
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