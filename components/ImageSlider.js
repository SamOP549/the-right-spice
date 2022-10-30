import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const ImageSlider = () => {
    const SliderData = [
        {
            image:
                'https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        },
        {
            image:
                'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
        },
        {
            image:
                'https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80'
        },
        {
            image:
                'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'
        }
    ];
    const [current, setCurrent] = useState(0);
    const length = SliderData.length;


    const nextSlide = (index) => {
        setCurrent(index == length - 1 ? 0 : index + 1);
    };

    const prevSlide = (index) => {
        setCurrent(index == 0 ? length - 1 : index - 1);
    };

    const gotoSlide = (index) => {
        setCurrent(index)
    }

    if (!Array.isArray(SliderData) || SliderData.length <= 0) {
        return null;
    }

    return (
        <section className='relative h-full flex justify-center items-center'>
            <FaArrowAltCircleLeft className='absolute top-1/2 left-8 text-5xl text-black z-10 cursor-pointer select-none' onClick={() => { prevSlide(current) }} />
            <FaArrowAltCircleRight className='absolute top-1/2 right-8 text-5xl text-black z-10 cursor-pointer select-none' onClick={() => { nextSlide(current) }} />
            {SliderData.map((slide, index) => {
                return (
                    <div
                        className='slide transition-all ease-in-out'
                        key={index}
                    >
                        {index === current && (
                            <img src={slide.image} alt='travel image' className='w-[100vw] h-auto rounded-none rounded-lg bg-cover bg-center' />
                        )}
                    </div>
                );
            })}
            <div className='absolute flex space-x-3 -translate-x-1/2 bottom-5 left-1/2'>
                {SliderData.map((slide, index) => {
                    return (
                        <div className='mx-1 cursor-pointer text-2xl' onClick={() => gotoSlide(index)} key={index}>&#9679;</div>
                    );
                })}
            </div>
        </section>
    );
};

export default ImageSlider;