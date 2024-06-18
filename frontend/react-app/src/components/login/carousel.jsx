import { Image } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import GambarSatu from "/assets/Carousel/Gambar 1.png"
import GambarDua from "/assets/Carousel/Gambar 2.png"
import GambarTiga from "/assets/Carousel/Gambar 3.png"
import "../../styles/login.css"

const CarouselLogin = () => {
    return (    
        <Carousel className='carouselLogin' variant='dark'>
            <Carousel.Item>
                <div className='gambarPlaceholder'>
                    <Image src={GambarSatu} alt='Posting Review Buku' className='gambarCarousel'/>
                </div>
                <Carousel.Caption className='text-black carouselCaption'>
                    <h3>Posting Novelmu</h3>
                    <p>Bagikan novel buatanmu dan buatlah orang di sekitarmu termotivasi</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className='gambarPlaceholder'>
                    <Image src={GambarDua} alt='Hibahkan bukumu' className='gambarCarousel'/>
                </div>
                <Carousel.Caption className='text-black carouselCaption'>
                    <h3>Baca Novel</h3>
                    <p>Berbagai macam novel dengan beragam genre siap untuk masuk list bacaan kamu loh</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <div className='gambarPlaceholder'>
                    <Image src={GambarTiga} alt='Pinjam Buku' className='gambarCarousel'/>
                </div>
                <Carousel.Caption className='text-black carouselCaption'>
                    <h3>Join Komunitas</h3>
                    <p>Ayo ikut serta dalam meramaikan komunitas Isekai Desu</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselLogin