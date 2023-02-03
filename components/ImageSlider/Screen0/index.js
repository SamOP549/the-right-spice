import { Carousel } from '@mantine/carousel';
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((_theme, _params, getRef) => ({
    controls: {
        ref: getRef('controls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    root: {
        '&:hover': {
            [`& .${getRef('controls')}`]: {
                opacity: 1,
            },
        },
    },
}));


function Demo({ promotions }) {
    const autoplay = useRef(Autoplay({ delay: 2000 }));
    const { classes } = useStyles();
    return (
        <Carousel
            orientation="horizontal"
            controlsOffset="xs"
            loop
            height="100%"
            sx={{ flex: 1 }}
            draggable={false}
            withIndicators
            styles={{
                indicator: {
                    width: 12,
                    height: 4,
                    transition: 'width 250ms ease',
                    backgroundColor: "white",

                    '&[data-active]': {
                        width: 40,
                    },
                },
            }}
            plugins={[autoplay.current]}
            slidesToScroll={1}
            align="start"
            classNames={classes}
        >
            {promotions.map((item, index) => (
                <Carousel.Slide key={index}>
                    <div>
                        <img src={item.img[0]["data_url"]} alt={item.title} className="bg-cover bg-center bg-no-repeat" />
                    </div>
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}
export default Demo;