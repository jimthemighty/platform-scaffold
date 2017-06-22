```js
// JS import
import Carousel from 'progressive-web-sdk/dist/components/carousel'
import CarouselItem from 'progressive-web-sdk/dist/components/carousel/carousel-item'

// SCSS import
@import 'node_modules/progressive-web-sdk/dist/components/carousel/base';
```


## Example Usage

    <Carousel previousIcon="chevron-left" nextIcon="chevron-right" iconSize="medium" buttonClass="c--secondary">
        <CarouselItem caption="Amy Santiago">
            <Image src="http://media2.popsugar-assets.com/files/thumbor/DBA3mv_owF0E2BoCrH_oaseQick/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2015/07/13/281/n/1922243/953ff51d_edit_img_image_16594958_1436816964_11378154_1591447017795211_1999564903_n/i/Homemade-Salmon-Popsicle-Cat-Treat.jpg" draggable="false"/>
        </CarouselItem>
        <CarouselItem caption="Charles Boyle">
            <Image src="https://s-media-cache-ak0.pinimg.com/564x/72/4b/6d/724b6dbf91c378a53d6890bb525c1aa9.jpg" draggable="false"/>
        </CarouselItem>
        <CarouselItem caption="Captain Ray Holt">
            <Image src="https://librestock.com/media/thumbs/cat-984367_640.jpg" draggable="false"/>
        </CarouselItem>
        <CarouselItem caption="Captain Ray Holt">
            <Image src="https://s-media-cache-ak0.pinimg.com/564x/af/f7/43/aff743479fc29789d2231329453b1abc.jpg" draggable="false"/>
        </CarouselItem>
        <CarouselItem caption="Captain Ray Holt">
            <Image src="http://res.cloudinary.com/monsterpetsupplies/image/upload/c_pad,w_500,h_500/v1456507382/Product/Boris_Side_On_Eating_Sealed_Pet_Bowl_2.jpg" draggable="false"/>
        </CarouselItem>
    </Carousel>

## One Slide

    <Carousel previousIcon="chevron-left" nextIcon="chevron-right" iconSize="medium" buttonClass="c--secondary">
        <CarouselItem caption="Captain Ray Holt">
            <Image src="http://media2.popsugar-assets.com/files/thumbor/DBA3mv_owF0E2BoCrH_oaseQick/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2015/07/13/281/n/1922243/953ff51d_edit_img_image_16594958_1436816964_11378154_1591447017795211_1999564903_n/i/Homemade-Salmon-Popsicle-Cat-Treat.jpg" draggable="false"/>
        </CarouselItem>
    </Carousel>

## Two Slide

    <Carousel previousIcon="chevron-left" nextIcon="chevron-right" iconSize="medium" buttonClass="c--secondary">
        <CarouselItem caption="Captain Ray Holt">
            <Image src="http://res.cloudinary.com/monsterpetsupplies/image/upload/c_pad,w_500,h_500/v1456507382/Product/Boris_Side_On_Eating_Sealed_Pet_Bowl_2.jpg" draggable="false"/>
        </CarouselItem>
        <CarouselItem caption="Captain Ray Holt">
            <Image src="http://media2.popsugar-assets.com/files/thumbor/DBA3mv_owF0E2BoCrH_oaseQick/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2015/07/13/281/n/1922243/953ff51d_edit_img_image_16594958_1436816964_11378154_1591447017795211_1999564903_n/i/Homemade-Salmon-Popsicle-Cat-Treat.jpg" draggable="false"/>
        </CarouselItem>
    </Carousel>

## Looping

    <Carousel previousIcon="chevron-left" nextIcon="chevron-right" iconSize="medium" buttonClass="c--secondary" allowLooping>
        <CarouselItem caption="Amy Santiago">
            <Image src="http://media2.popsugar-assets.com/files/thumbor/DBA3mv_owF0E2BoCrH_oaseQick/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2015/07/13/281/n/1922243/953ff51d_edit_img_image_16594958_1436816964_11378154_1591447017795211_1999564903_n/i/Homemade-Salmon-Popsicle-Cat-Treat.jpg" draggable="false"/>
        </CarouselItem>
        <CarouselItem caption="Charles Boyle">
            <Image src="https://s-media-cache-ak0.pinimg.com/564x/72/4b/6d/724b6dbf91c378a53d6890bb525c1aa9.jpg" draggable="false"/>
        </CarouselItem>
        <CarouselItem caption="Captain Ray Holt">
            <Image src="https://librestock.com/media/thumbs/cat-984367_640.jpg" draggable="false"/>
        </CarouselItem>
        <CarouselItem caption="Captain Ray Holt">
            <Image src="https://s-media-cache-ak0.pinimg.com/564x/af/f7/43/aff743479fc29789d2231329453b1abc.jpg" draggable="false"/>
        </CarouselItem>
        <CarouselItem caption="Captain Ray Holt">
            <Image src="http://res.cloudinary.com/monsterpetsupplies/image/upload/c_pad,w_500,h_500/v1456507382/Product/Boris_Side_On_Eating_Sealed_Pet_Bowl_2.jpg" draggable="false"/>
        </CarouselItem>
    </Carousel>

## With Slides as Links

    <Carousel previousIcon="chevron-left" nextIcon="chevron-right" iconSize="medium" buttonClass="c--secondary">
        <CarouselItem href="http://res.cloudinary.com/monsterpetsupplies/image/upload/c_pad,w_500,h_500/v1456507382/Product/Boris_Side_On_Eating_Sealed_Pet_Bowl_2.jpg" caption="Captain Ray Holt">
            <Image src="http://res.cloudinary.com/monsterpetsupplies/image/upload/c_pad,w_500,h_500/v1456507382/Product/Boris_Side_On_Eating_Sealed_Pet_Bowl_2.jpg" draggable="false"/>
        </CarouselItem>

        <CarouselItem href="http://media2.popsugar-assets.com/files/thumbor/DBA3mv_owF0E2BoCrH_oaseQick/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2015/07/13/281/n/1922243/953ff51d_edit_img_image_16594958_1436816964_11378154_1591447017795211_1999564903_n/i/Homemade-Salmon-Popsicle-Cat-Treat.jpg" caption="Captain Ray Holt">
            <Image src="http://media2.popsugar-assets.com/files/thumbor/DBA3mv_owF0E2BoCrH_oaseQick/fit-in/500x500/filters:format_auto-!!-:strip_icc-!!-/2015/07/13/281/n/1922243/953ff51d_edit_img_image_16594958_1436816964_11378154_1591447017795211_1999564903_n/i/Homemade-Salmon-Popsicle-Cat-Treat.jpg" draggable="false"/>
        </CarouselItem>
    </Carousel>


## With Custom Internal Controls

    const initialState = { currentSlide: 0 };
    const updateState = (slideIndex) => {
        if (slideIndex === state.currentSlide) { return; }
        setState({currentSlide: slideIndex})
    };
    const next = () => { updateState(state.currentSlide + 1) };
    const previous = () => { updateState(state.currentSlide - 1) };
    const start = () => { updateState(0) };
    const end = () => { updateState(3) };

    <Carousel onSlideMove={updateState} currentSlide={state.currentSlide} previousIcon="chevron-left" nextIcon="chevron-right" iconSize="medium" buttonClass="c--secondary">
        <CarouselItem caption="Slide 1">
            <Button onClick={next} className="c--primary">
                Next <Icon name="caret-right" />
            </Button>
            <Button onClick={end} className="c--secondary">
                To the END
            </Button>
        </CarouselItem>

        <CarouselItem caption="Slide 2">
            <Button onClick={previous} className="c--primary">
                <Icon name="caret-left" /> Back
            </Button>
            <Button onClick={next} className="c--primary">
                Next <Icon name="caret-right" />
            </Button>
        </CarouselItem>

        <CarouselItem caption="Slide 3">
            <Button onClick={previous} className="c--primary">
                <Icon name="caret-left" /> Back
            </Button>
            <Button onClick={next} className="c--primary">
                Next <Icon name="caret-right" />
            </Button>
        </CarouselItem>

        <CarouselItem caption="Slide 3">
            <Button onClick={previous} className="c--primary">
                <Icon name="caret-left" /> Back
            </Button>
            <Button onClick={start} className="c--secondary">
                To the START
            </Button>
        </CarouselItem>
    </Carousel>
